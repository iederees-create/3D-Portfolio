#!/usr/bin/env node
import path from 'node:path';
import { OUTPUT_DIR, ensureOutputDir, scanMedia, writeCsv } from './scan-nextgenwebs-media.mjs';

function cleanToken(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function versionFromName(filename) {
  return filename.match(/(?:^|-)v(\d+)(?=\.)/)?.[1] || '1';
}

function suggestedPlatform(record) {
  if (record.platform !== 'unknown') return record.platform;
  if (record.fileType === 'video') return 'youtube-talking-heads';
  return 'homepage-brand';
}

function suggestedFolder(record) {
  if (record.fileType === 'audio') return '/home/iedrees/Workspace/nextgenwebs-audio';
  if (record.fileType === 'video') return '/home/iedrees/Workspace/nextgenwebs-video';
  return path.dirname(record.fullPath);
}

function suggestedFilename(record) {
  if (record.filenameMatchesRules) return record.filename;
  const product = record.product === 'unknown' ? 'unknown-product' : record.product;
  const platform = suggestedPlatform(record);
  const current = record.filename.toLowerCase();
  let use = 'media';
  if (current.includes('voiceover')) use = 'voiceover';
  else if (current.includes('listing-video')) use = 'listing-video';
  else if (current.includes('talking-head')) use = 'talking-head';
  else if (current.includes('intro')) use = 'intro';
  return `${cleanToken(product)}-${cleanToken(platform)}-${use}-v${versionFromName(record.filename)}${path.extname(record.filename).toLowerCase()}`;
}

ensureOutputDir();
const rows = [[
  'filename',
  'full_path',
  'suggested_filename',
  'suggested_folder',
  'suggested_full_path',
  'reason',
]];

for (const record of scanMedia()) {
  const reasons = [];
  const nextFilename = suggestedFilename(record);
  const nextFolder = suggestedFolder(record);
  if (!record.filenameMatchesRules) reasons.push('filename does not match naming rules');
  if (!record.folderMatchesRules) reasons.push('folder does not match file type rules');
  if (record.platform === 'unknown') reasons.push('platform/use not inferred');
  if (record.product === 'unknown') reasons.push('product not inferred');
  if (reasons.length === 0) continue;
  rows.push([
    record.filename,
    record.fullPath,
    nextFilename,
    nextFolder,
    path.join(nextFolder, nextFilename),
    reasons.join('; '),
  ]);
}

const outPath = path.join(OUTPUT_DIR, 'RENAME-SUGGESTIONS.csv');
writeCsv(outPath, rows);
console.log(`Wrote ${outPath}`);
