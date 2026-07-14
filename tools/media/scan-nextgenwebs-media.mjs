#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

export const AUDIO_ROOT = '/home/iedrees/Workspace/nextgenwebs-audio';
export const VIDEO_ROOT = '/home/iedrees/Workspace/nextgenwebs-video';
export const OUTPUT_DIR = 'portfolio-upgrade/media-automation';

export const PRODUCTS = [
  'construction',
  'tiling',
  'insightforge',
  'bank-desert',
  'wellness',
  'pest-control',
  'zen-skin',
  'solar',
  'precision-laser',
  'nextgenwebs',
];

export const PLATFORMS = [
  'etsy-listing-videos',
  'youtube-talking-heads',
  'youtube-shorts',
  'portfolio-walkthroughs',
  'social-reels',
  'cold-outreach',
  'homepage-brand',
];

const MEDIA_EXTENSIONS = new Set(['.mp3', '.mp4', '.webm']);
const KEBAB_WITH_VERSION = /^[a-z0-9]+(?:-[a-z0-9]+)*-v\d+\.(mp3|mp4|webm)$/;

export function ensureOutputDir() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

export function csvEscape(value) {
  const text = value === undefined || value === null ? '' : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function writeCsv(filePath, rows) {
  const text = rows.map((row) => row.map(csvEscape).join(',')).join('\n') + '\n';
  writeFileSync(filePath, text);
}

function hasCommand(command) {
  return spawnSync('sh', ['-lc', 'command -v ' + command], { encoding: 'utf8' }).status === 0;
}

function listFiles(root) {
  if (!existsSync(root)) return [];
  const found = [];
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(fullPath);
      if (entry.isFile()) found.push(fullPath);
    }
  }
  return found.sort();
}

function inferProduct(filename) {
  const base = filename.toLowerCase();
  if (base.includes('bank-desert')) return 'bank-desert';
  if (base.includes('pest-control')) return 'pest-control';
  if (base.includes('zen-skin')) return 'zen-skin';
  if (base.includes('precision-laser')) return 'precision-laser';
  return PRODUCTS.find((product) => base.includes(product)) || 'unknown';
}

function inferPlatform(fullPath, filename) {
  const normalized = fullPath.toLowerCase().replace(/\\/g, '/');
  const fromFolder = PLATFORMS.find((platform) => normalized.includes(`/${platform}/`));
  if (fromFolder) return fromFolder;
  const fromName = PLATFORMS.find((platform) => filename.toLowerCase().includes(platform));
  if (fromName) return fromName;
  if (filename.toLowerCase().includes('talking-head-youtube')) return 'youtube-talking-heads';
  if (filename.toLowerCase().includes('etsy')) return 'etsy-listing-videos';
  return 'unknown';
}

function inferFileType(extension) {
  if (extension === '.mp3') return 'audio';
  if (extension === '.mp4' || extension === '.webm') return 'video';
  return 'other';
}

function ffprobeJson(fullPath) {
  if (!hasCommand('ffprobe')) return null;
  const result = spawnSync('ffprobe', [
    '-v', 'error',
    '-show_entries', 'format=duration:stream=codec_type,codec_name,width,height',
    '-of', 'json',
    fullPath,
  ], { encoding: 'utf8' });
  if (result.status !== 0) return null;
  try {
    return JSON.parse(result.stdout);
  } catch {
    return null;
  }
}

function collectProbe(fullPath) {
  const probed = ffprobeJson(fullPath);
  if (!probed) {
    return {
      durationSeconds: '',
      resolution: '',
      audioCodec: '',
      videoCodec: '',
      ffprobeAvailable: hasCommand('ffprobe'),
    };
  }

  const video = probed.streams?.find((stream) => stream.codec_type === 'video');
  const audio = probed.streams?.find((stream) => stream.codec_type === 'audio');
  const duration = Number(probed.format?.duration);

  return {
    durationSeconds: Number.isFinite(duration) ? duration.toFixed(2) : '',
    resolution: video?.width && video?.height ? `${video.width}x${video.height}` : '',
    audioCodec: audio?.codec_name || '',
    videoCodec: video?.codec_name || '',
    ffprobeAvailable: true,
  };
}

function folderMatchesRules(fullPath, fileType) {
  if (fileType === 'audio') return fullPath.startsWith(AUDIO_ROOT + path.sep);
  if (fileType === 'video') return fullPath.startsWith(VIDEO_ROOT + path.sep);
  return false;
}

function platformExtensionValid(platform, extension, fileType) {
  if (fileType !== 'video') return true;
  if (platform === 'etsy-listing-videos' || platform === 'youtube-talking-heads' || platform === 'youtube-shorts') {
    return extension === '.mp4';
  }
  return true;
}

function collectNotes({ fullPath, filename, extension, fileType, product, platform, filenameMatchesRules, folderMatches, resolution, durationSeconds }) {
  const notes = [];
  if (product === 'unknown') notes.push('Product could not be inferred from filename.');
  if (platform === 'unknown') notes.push('Platform/use could not be inferred from folder or filename.');
  if (!filenameMatchesRules) notes.push('Filename should be lowercase kebab-case and include a version like v1.');
  if (!folderMatches) notes.push(fileType === 'audio' ? 'Audio file is outside nextgenwebs-audio.' : 'Video file is outside nextgenwebs-video.');
  if (!platformExtensionValid(platform, extension, fileType)) notes.push(`${platform} should use MP4 files.`);
  if (fileType === 'video' && !resolution) notes.push('Video resolution unavailable.');
  if (!durationSeconds) notes.push('Duration unavailable.');
  if (fullPath.startsWith(AUDIO_ROOT + path.sep) && fileType === 'video') notes.push('Video file is stored in the audio source folder.');
  if (fullPath.startsWith(VIDEO_ROOT + path.sep) && fileType === 'audio') notes.push('Audio file is stored in the video source folder.');
  return notes.join(' ');
}

export function scanMedia() {
  const roots = [AUDIO_ROOT, VIDEO_ROOT];
  const files = roots.flatMap(listFiles).filter((fullPath) => MEDIA_EXTENSIONS.has(path.extname(fullPath).toLowerCase()));

  return files.map((fullPath) => {
    const filename = path.basename(fullPath);
    const extension = path.extname(filename).toLowerCase();
    const fileType = inferFileType(extension);
    const stats = statSync(fullPath);
    const product = inferProduct(filename);
    const platform = inferPlatform(fullPath, filename);
    const filenameMatchesRules = KEBAB_WITH_VERSION.test(filename) && product !== 'unknown' && platform !== 'unknown';
    const folderMatches = folderMatchesRules(fullPath, fileType);
    const probe = collectProbe(fullPath);
    const likelyUploadReady = filenameMatchesRules && folderMatches && platformExtensionValid(platform, extension, fileType) && Boolean(probe.durationSeconds) && (fileType !== 'video' || Boolean(probe.resolution));

    const record = {
      filename,
      fullPath,
      fileType,
      folder: path.dirname(fullPath),
      product,
      platform,
      fileSizeBytes: stats.size,
      fileSizeMb: (stats.size / 1024 / 1024).toFixed(2),
      durationSeconds: probe.durationSeconds,
      resolution: probe.resolution,
      audioCodec: probe.audioCodec,
      videoCodec: probe.videoCodec,
      filenameMatchesRules,
      folderMatchesRules: folderMatches,
      likelyUploadReady,
      notes: '',
    };
    record.notes = collectNotes({ ...record, extension, folderMatches });
    return record;
  });
}

export function inventoryRows(records) {
  const header = [
    'filename',
    'full_path',
    'file_type',
    'folder',
    'product',
    'platform',
    'file_size_bytes',
    'file_size_mb',
    'duration_seconds',
    'resolution',
    'audio_codec',
    'video_codec',
    'filename_matches_rules',
    'folder_matches_rules',
    'likely_upload_ready',
    'notes',
  ];
  return [header, ...records.map((record) => [
    record.filename,
    record.fullPath,
    record.fileType,
    record.folder,
    record.product,
    record.platform,
    record.fileSizeBytes,
    record.fileSizeMb,
    record.durationSeconds,
    record.resolution,
    record.audioCodec,
    record.videoCodec,
    record.filenameMatchesRules ? 'yes' : 'no',
    record.folderMatchesRules ? 'yes' : 'no',
    record.likelyUploadReady ? 'yes' : 'no',
    record.notes,
  ])];
}

export function runScan() {
  ensureOutputDir();
  const records = scanMedia();
  writeCsv(path.join(OUTPUT_DIR, 'MEDIA-INVENTORY.csv'), inventoryRows(records));
  const audioCount = records.filter((record) => record.fileType === 'audio').length;
  const videoCount = records.filter((record) => record.fileType === 'video').length;
  console.log(`Scanned ${records.length} media files: ${audioCount} audio, ${videoCount} video.`);
  console.log(`Wrote ${path.join(OUTPUT_DIR, 'MEDIA-INVENTORY.csv')}`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isDirectRun) runScan();
