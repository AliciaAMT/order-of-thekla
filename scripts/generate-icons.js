#!/usr/bin/env node

/**
 * Icon Generator Script
 * Generates all required icon sizes from a source image for the Order of Thekla website
 * 
 * Usage: node scripts/generate-icons.js <source-image-path>
 * Example: node scripts/generate-icons.js src/assets/saint-thekla-source.png
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.error('Error: sharp package is not installed.');
  console.error('Please run: npm install --save-dev sharp');
  process.exit(1);
}

// Icon sizes to generate
const iconSizes = [
  { size: 16, path: 'src/assets/icons/icon-16x16.png' },
  { size: 32, path: 'src/assets/icons/icon-32x32.png' },
  { size: 48, path: 'src/assets/icons/icon-48x48.png' },
  { size: 72, path: 'src/assets/icons/icon-72x72.png' },
  { size: 96, path: 'src/assets/icons/icon-96x96.png' },
  { size: 128, path: 'src/assets/icons/icon-128x128.png' },
  { size: 144, path: 'src/assets/icons/icon-144x144.png' },
  { size: 152, path: 'src/assets/icons/icon-152x152.png' },
  { size: 192, path: 'src/assets/icons/icon-192x192.png' },
  { size: 384, path: 'src/assets/icons/icon-384x384.png' },
  { size: 512, path: 'src/assets/icons/icon-512x512.png' },
];

// Additional icons
const additionalIcons = [
  { size: 180, path: 'src/assets/apple-touch-icon.png' }, // Apple touch icon
  { size: 32, path: 'src/assets/icon/favicon.png' }, // Favicon
];

async function generateIcons(sourceImagePath) {
  // Check if source image exists
  if (!fs.existsSync(sourceImagePath)) {
    console.error(`Error: Source image not found at ${sourceImagePath}`);
    console.error('Please provide a valid path to your Saint Thekla icon image.');
    process.exit(1);
  }

  console.log(`Generating icons from: ${sourceImagePath}\n`);

  // Generate all icon sizes
  const allIcons = [...iconSizes, ...additionalIcons];
  
  for (const icon of allIcons) {
    try {
      // Ensure directory exists
      const dir = path.dirname(icon.path);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Resize and save
      await sharp(sourceImagePath)
        .resize(icon.size, icon.size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
        })
        .png()
        .toFile(icon.path);

      console.log(`✓ Generated ${icon.path} (${icon.size}x${icon.size})`);
    } catch (error) {
      console.error(`✗ Failed to generate ${icon.path}:`, error.message);
    }
  }

  // Generate favicon.ico (requires special handling)
  try {
    // Create a 32x32 version for favicon.ico
    const faviconBuffer = await sharp(sourceImagePath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toBuffer();

    // For .ico, we'll use the PNG as a fallback, but ideally you'd use a library like to-ico
    // For now, we'll just copy the 32x32 PNG
    fs.writeFileSync('src/assets/favicon.ico', faviconBuffer);
    console.log('✓ Generated src/assets/favicon.ico (32x32)');
  } catch (error) {
    console.error('✗ Failed to generate favicon.ico:', error.message);
  }

  console.log('\n✓ All icons generated successfully!');
  console.log('\nNext steps:');
  console.log('1. Verify the icons look good in src/assets/icons/');
  console.log('2. The icons are already referenced in src/index.html');
  console.log('3. If you need to update the favicon.ico format, consider using an online converter');
}

// Get source image path from command line arguments
const sourceImagePath = process.argv[2];

if (!sourceImagePath) {
  console.error('Usage: node scripts/generate-icons.js <source-image-path>');
  console.error('Example: node scripts/generate-icons.js src/assets/saint-thekla-source.png');
  process.exit(1);
}

generateIcons(sourceImagePath).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

