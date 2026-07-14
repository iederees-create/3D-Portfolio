# NextGenWebs Media Automation Tools

These scripts organise, validate and document local ElevenLabs voiceovers and talking-head videos. They do not upload, publish, move, delete or rename media files.

## Source Folders

- Audio: `/home/iedrees/Workspace/nextgenwebs-audio`
- Video: `/home/iedrees/Workspace/nextgenwebs-video`

## Output Folder

Reports are written to:

`portfolio-upgrade/media-automation/`

## Main Command

```bash
node tools/media/scan-nextgenwebs-media.mjs
```

## Full Report Generation

```bash
node tools/media/scan-nextgenwebs-media.mjs
node tools/media/generate-media-manifest.mjs
node tools/media/validate-media-library.mjs
node tools/media/suggest-media-renames.mjs
```

## Validation Rules

- MP3 files must live under `nextgenwebs-audio`.
- MP4/WEBM files must live under `nextgenwebs-video`.
- Etsy listing videos should be MP4.
- YouTube talking-head videos should be MP4.
- Filenames should use lowercase kebab-case.
- Filenames should include product.
- Filenames should include platform/use.
- Filenames should include version, like `v1`.

## Detected Products

- construction
- tiling
- insightforge
- bank-desert
- wellness
- pest-control
- zen-skin
- solar
- precision-laser
- nextgenwebs

## Detected Platforms

- etsy-listing-videos
- youtube-talking-heads
- youtube-shorts
- portfolio-walkthroughs
- social-reels
- cold-outreach
- homepage-brand

## Notes

`ffprobe` is used when available to collect duration, codecs and video resolution. If it is unavailable, the scripts still produce inventory and validation output with blank technical metadata fields.
