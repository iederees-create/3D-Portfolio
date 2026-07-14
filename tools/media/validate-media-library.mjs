#!/usr/bin/env node
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { OUTPUT_DIR, PRODUCTS, ensureOutputDir, scanMedia, writeCsv } from './scan-nextgenwebs-media.mjs';

const EXPECTED = PRODUCTS.filter((product) => product !== 'nextgenwebs').flatMap((product) => [
  { product, platform: 'youtube-talking-heads', fileType: 'video', extension: '.mp4', expectedUse: 'YouTube talking-head video' },
  { product, platform: 'etsy-listing-videos', fileType: 'video', extension: '.mp4', expectedUse: 'Etsy listing video' },
  { product, platform: 'etsy-listing-videos', fileType: 'audio', extension: '.mp3', expectedUse: 'Etsy listing voiceover' },
]).concat([
  { product: 'nextgenwebs', platform: 'homepage-brand', fileType: 'audio', extension: '.mp3', expectedUse: 'Homepage brand voiceover' },
]);

function hasExpected(records, expected) {
  return records.some((record) => record.product === expected.product
    && record.platform === expected.platform
    && record.fileType === expected.fileType
    && record.filename.endsWith(expected.extension));
}

function missingRows(records) {
  return [['product', 'platform', 'file_type', 'expected_extension', 'expected_use', 'status'], ...EXPECTED
    .filter((expected) => !hasExpected(records, expected))
    .map((expected) => [expected.product, expected.platform, expected.fileType, expected.extension, expected.expectedUse, 'missing'])];
}

function readinessReport(records, fileType) {
  const selected = records.filter((record) => record.fileType === fileType);
  const ready = selected.filter((record) => record.likelyUploadReady);
  const blocked = selected.filter((record) => !record.likelyUploadReady);
  const title = fileType === 'video' ? 'Video Readiness Report' : 'Audio Readiness Report';
  const lines = [
    `# ${title}`,
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    `- Files found: ${selected.length}`,
    `- Likely upload-ready: ${ready.length}`,
    `- Needs attention: ${blocked.length}`,
    '',
    '## Likely Upload-Ready',
    '',
  ];

  if (ready.length === 0) lines.push('- None.');
  for (const record of ready) lines.push(`- ${record.filename} (${record.product}, ${record.platform}, ${record.durationSeconds || 'unknown'}s${record.resolution ? `, ${record.resolution}` : ''})`);

  lines.push('', '## Needs Attention', '');
  if (blocked.length === 0) lines.push('- None.');
  for (const record of blocked) lines.push(`- ${record.filename}: ${record.notes || 'Review naming and metadata.'}`);

  return lines.join('\n') + '\n';
}

ensureOutputDir();
const records = scanMedia();
writeCsv(path.join(OUTPUT_DIR, 'MISSING-MEDIA.csv'), missingRows(records));
writeFileSync(path.join(OUTPUT_DIR, 'VIDEO-READINESS-REPORT.md'), readinessReport(records, 'video'));
writeFileSync(path.join(OUTPUT_DIR, 'AUDIO-READINESS-REPORT.md'), readinessReport(records, 'audio'));
console.log(`Wrote validation reports to ${OUTPUT_DIR}`);
