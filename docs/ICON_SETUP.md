# Icon Setup Guide

This guide explains how to set up the Saint Thekla icon as the main icon for the website.

## Quick Start

1. **Place your source image** in the `src/assets/` directory
   - Recommended name: `saint-thekla-source.png` or `saint-thekla-source.jpg`
   - Recommended size: At least 512x512 pixels (larger is better for quality)
   - Format: PNG, JPG, or JPEG

2. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

3. **Generate all icon sizes**:
   ```bash
   npm run generate-icons src/assets/saint-thekla-source.png
   ```
   Replace `saint-thekla-source.png` with your actual image filename.

## What the Script Does

The icon generator script (`scripts/generate-icons.js`) automatically creates all required icon sizes:

- **PWA Icons**: 16x16, 32x32, 48x48, 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512
- **Apple Touch Icon**: 180x180 (for iOS home screen)
- **Favicon**: 32x32 PNG and ICO formats

All icons are saved to the appropriate locations:
- `src/assets/icons/` - PWA icons
- `src/assets/apple-touch-icon.png` - Apple touch icon
- `src/assets/icon/favicon.png` - Favicon PNG
- `src/assets/favicon.ico` - Favicon ICO

## Icon References

The icons are already configured in `src/index.html`:
- Favicon: `<link rel="icon" type="image/png" href="assets/icon/favicon.png" />`
- Apple Touch Icon: `<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">`

## Tips

- **Source Image Quality**: Use a high-resolution source image (at least 512x512, preferably 1024x1024 or larger) for best results
- **Square Images**: The script will automatically resize and maintain aspect ratio, but square source images work best
- **Transparent Background**: PNG images with transparent backgrounds are recommended
- **Testing**: After generating icons, test them by:
  1. Running `npm start`
  2. Checking the browser tab favicon
  3. Testing on mobile devices for PWA icons

## Troubleshooting

**Error: sharp package is not installed**
- Run `npm install` to install all dependencies including `sharp`

**Icons look blurry**
- Use a higher resolution source image (1024x1024 or larger)

**Icons are cropped incorrectly**
- Ensure your source image is square or close to square
- The script uses "contain" fit mode, which preserves the entire image

## Manual Icon Generation

If you prefer to generate icons manually or use an online tool:
- [Favicon Generator](https://realfavicongenerator.net/)
- [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)

Place the generated icons in the appropriate directories as listed above.







