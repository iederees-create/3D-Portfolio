#!/usr/bin/env node
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { AUDIO_ROOT, VIDEO_ROOT, OUTPUT_DIR, ensureOutputDir, scanMedia } from './scan-nextgenwebs-media.mjs';

ensureOutputDir();
const records = scanMedia();
const manifest = {
  generatedAt: new Date().toISOString(),
  sourceFolders: {
    audio: AUDIO_ROOT,
    video: VIDEO_ROOT,
  },
  counts: {
    total: records.length,
    audio: records.filter((record) => record.fileType === 'audio').length,
    video: records.filter((record) => record.fileType === 'video').length,
    uploadReady: records.filter((record) => record.likelyUploadReady).length,
  },
  media: records,
};

const outPath = path.join(OUTPUT_DIR, 'MEDIA-MANIFEST.json');
writeFileSync(outPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Wrote ${outPath}`);
