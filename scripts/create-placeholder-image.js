#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Path to save the image
const imagePath = path.join(process.cwd(), 'public', 'images', 'ai-woman-background.jpg');

console.log('Creating placeholder AI woman background image...');

// Create the directory if it doesn't exist
const dir = path.dirname(imagePath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Simple SVG image as a data URL
const svgImage = `
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#6366f1"/>
  <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle">AI Woman Background</text>
</svg>
`;

// Convert SVG to data URL
const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svgImage).toString('base64')}`;

// Extract the base64 data
const base64Data = dataUrl.replace(/^data:image\/svg\+xml;base64,/, '');

// Write the image file
fs.writeFileSync(imagePath, Buffer.from(base64Data, 'base64'));

console.log(`Placeholder image created at ${imagePath}`); 