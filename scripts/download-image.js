#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// URL of a sample AI woman image (replace with your preferred image URL)
const imageUrl = 'https://raw.githubusercontent.com/ITFIN-AI/ai-for-you/main/public/images/ai-woman-background.jpg';

// Path to save the image
const imagePath = path.join(process.cwd(), 'public', 'images', 'ai-woman-background.jpg');

console.log('Downloading AI woman background image...');

// Create the directory if it doesn't exist
const dir = path.dirname(imagePath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Check if the file already exists and is a valid image (not a placeholder)
if (fs.existsSync(imagePath)) {
  const fileSize = fs.statSync(imagePath).size;
  if (fileSize > 1000) { // If file is larger than 1KB, assume it's a valid image
    console.log('AI woman background image already exists.');
    process.exit(0);
  } else {
    console.log('Existing file is too small, likely a placeholder. Downloading new image...');
  }
}

// Download the image
const file = fs.createWriteStream(imagePath);
https.get(imageUrl, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to download image: ${response.statusCode} ${response.statusMessage}`);
    file.close();
    fs.unlinkSync(imagePath);
    
    // Use placeholder image as fallback
    console.log('Using placeholder image as fallback...');
    try {
      execSync('node scripts/create-placeholder-image.js');
    } catch (err) {
      console.error('Failed to create placeholder image:', err);
      process.exit(1);
    }
    return;
  }

  response.pipe(file);

  file.on('finish', () => {
    file.close();
    console.log(`Image downloaded successfully to ${imagePath}`);
  });
}).on('error', (err) => {
  console.error(`Error downloading image: ${err.message}`);
  file.close();
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
  
  // Use placeholder image as fallback
  console.log('Using placeholder image as fallback...');
  try {
    execSync('node scripts/create-placeholder-image.js');
  } catch (err) {
    console.error('Failed to create placeholder image:', err);
    process.exit(1);
  }
}); 