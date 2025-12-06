#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Video optimization script
// Requires FFmpeg to be installed: https://ffmpeg.org/download.html

const VIDEOS_DIR = path.join(__dirname, '../public/assets/videos');
const PUBLIC_DIR = path.join(__dirname, '../public/assets');

const videos = [
  {
    input: path.join(PUBLIC_DIR, 'unlock.mp4'),
    output: path.join(PUBLIC_DIR, 'unlock-compressed.mp4'),
    targetSize: '10MB' // Target ~10MB for 43MB video
  },
  {
    input: path.join(VIDEOS_DIR, 'private/new.mp4'),
    output: path.join(VIDEOS_DIR, 'private/new-compressed.mp4'),
    targetSize: '12MB' // Target ~12MB for 55MB video
  },
  {
    input: path.join(VIDEOS_DIR, 'trigger/trigger (1).mov'),
    output: path.join(VIDEOS_DIR, 'trigger/trigger (1)-compressed.mp4'),
    targetSize: '500KB' // Target ~500KB for 1.27MB video
  },
  {
    input: path.join(VIDEOS_DIR, 'trigger/trigger (2).mov'),
    output: path.join(VIDEOS_DIR, 'trigger/trigger (2)-compressed.mp4'),
    targetSize: '200KB' // Target ~200KB for 180KB video
  },
  {
    input: path.join(VIDEOS_DIR, 'trigger/trigger (3).mov'),
    output: path.join(VIDEOS_DIR, 'trigger/trigger (3)-compressed.mp4'),
    targetSize: '300KB' // Target ~300KB for 420KB video
  }
];

function optimizeVideo(input, output, targetSize) {
  try {
    console.log(`Optimizing: ${path.basename(input)} -> ${path.basename(output)}`);
    
    // FFmpeg optimization command
    const command = `ffmpeg -i "${input}" -c:v libx264 -crf 28 -preset veryfast -c:a aac -b:a 128k -movflags +faststart "${output}"`;
    
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    
    // Check file size
    const stats = fs.statSync(output);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`✅ Compressed to: ${sizeMB}MB`);
    
    return sizeMB;
  } catch (error) {
    console.error(`❌ Error optimizing ${input}:`, error.message);
    return null;
  }
}

function createWebM(input, output) {
  try {
    console.log(`Creating WebM: ${path.basename(input)} -> ${path.basename(output)}`);
    
    const command = `ffmpeg -i "${input}" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -movflags +faststart "${output}"`;
    
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    
    const stats = fs.statSync(output);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`✅ WebM created: ${sizeMB}MB`);
    
    return sizeMB;
  } catch (error) {
    console.error(`❌ Error creating WebM ${input}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🎬 Starting video optimization...\n');
  
  // Check if FFmpeg is installed
  try {
    execSync('ffmpeg -version', { stdio: 'pipe' });
  } catch (error) {
    console.error('❌ FFmpeg is not installed. Please install FFmpeg first:');
    console.error('   Windows: https://ffmpeg.org/download.html#build-windows');
    console.error('   macOS: brew install ffmpeg');
    console.error('   Linux: sudo apt install ffmpeg');
    process.exit(1);
  }
  
  const results = [];
  
  for (const video of videos) {
    if (!fs.existsSync(video.input)) {
      console.log(`⚠️  Input file not found: ${video.input}`);
      continue;
    }
    
    // Optimize MP4
    const compressedSize = optimizeVideo(video.input, video.output, video.targetSize);
    
    // Create WebM version
    const webmOutput = video.output.replace('.mp4', '.webm');
    const webmSize = createWebM(video.input, webmOutput);
    
    results.push({
      original: path.basename(video.input),
      compressed: path.basename(video.output),
      webm: path.basename(webmOutput),
      compressedSize,
      webmSize
    });
    
    console.log('---');
  }
  
  // Summary
  console.log('\n📊 Optimization Summary:');
  console.log('Original -> Compressed MP4 -> WebM');
  console.log('='.repeat(50));
  
  results.forEach(result => {
    console.log(`${result.original.padEnd(25)} -> ${result.compressedSize?.padEnd(8)} -> ${result.webmSize?.padEnd(8)}`);
  });
  
  console.log('\n✅ Video optimization complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Update product data to use compressed versions');
  console.log('2. Test video playback');
  console.log('3. Deploy to Vercel');
  console.log('4. Monitor bandwidth usage');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { optimizeVideo, createWebM };
