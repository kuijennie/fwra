/**
 * PWA Icon Generator Script
 *
 * This script generates PWA icons from the source SVG.
 *
 * Prerequisites:
 *   pnpm add -D sharp
 *
 * Usage:
 *   node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');

async function generateIcons() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.log('Sharp not installed. Run: pnpm add -D sharp');
    console.log('Then run this script again.');

    // Create placeholder files for development
    console.log('\nCreating placeholder icons for development...');
    createPlaceholders();
    return;
  }

  const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
  const svgPath = path.join(__dirname, '../public/icons/icon.svg');
  const outputDir = path.join(__dirname, '../public/icons');

  const svgBuffer = fs.readFileSync(svgPath);

  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);

    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);

    console.log(`Generated: icon-${size}x${size}.png`);
  }

  // Generate shortcut icons
  const shortcutIcons = ['shortcut-waste', 'shortcut-tutorials', 'shortcut-market'];
  for (const name of shortcutIcons) {
    const outputPath = path.join(outputDir, `${name}.png`);
    await sharp(svgBuffer)
      .resize(96, 96)
      .png()
      .toFile(outputPath);
    console.log(`Generated: ${name}.png`);
  }

  // Generate Apple touch icon
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(outputDir, 'apple-touch-icon.png'));
  console.log('Generated: apple-touch-icon.png');

  // Generate favicon
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, '../public/favicon.png'));
  console.log('Generated: favicon.png');

  console.log('\nAll icons generated successfully!');
}

function createPlaceholders() {
  const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
  const outputDir = path.join(__dirname, '../public/icons');

  // Create a simple 1x1 green PNG as placeholder
  // This is a minimal valid PNG file (green pixel)
  const greenPixelPng = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
    0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
    0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41, // IDAT chunk
    0x54, 0x08, 0xD7, 0x63, 0x28, 0xC9, 0x48, 0x01,
    0x00, 0x01, 0x69, 0x00, 0xD3, 0x00, 0x00, 0x00,
    0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, // IEND chunk
    0x82
  ]);

  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
    fs.writeFileSync(outputPath, greenPixelPng);
    console.log(`Created placeholder: icon-${size}x${size}.png`);
  }

  // Shortcut icons
  const shortcuts = ['shortcut-waste', 'shortcut-tutorials', 'shortcut-market'];
  for (const name of shortcuts) {
    fs.writeFileSync(path.join(outputDir, `${name}.png`), greenPixelPng);
    console.log(`Created placeholder: ${name}.png`);
  }

  // Apple touch icon
  fs.writeFileSync(path.join(outputDir, 'apple-touch-icon.png'), greenPixelPng);
  console.log('Created placeholder: apple-touch-icon.png');

  console.log('\nPlaceholder icons created. Install sharp and re-run for proper icons.');
}

generateIcons().catch(console.error);
