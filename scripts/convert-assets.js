const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ASSETS_DIR = path.join(PUBLIC_DIR, 'assets');

async function convertSvgToPng(svgPath, pngPath, width, height, scale = 2) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to desired size with high DPI
  await page.setViewport({
    width: width,
    height: height,
    deviceScaleFactor: scale,
  });

  // Read SVG content
  const svgContent = fs.readFileSync(svgPath, 'utf-8');
  
  // Create HTML with Inter font loaded
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; }
        body { 
          width: ${width}px; 
          height: ${height}px; 
          overflow: hidden;
        }
        svg {
          width: ${width}px;
          height: ${height}px;
        }
      </style>
    </head>
    <body>
      ${svgContent}
    </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');
  
  // Take screenshot
  await page.screenshot({
    path: pngPath,
    type: 'png',
    omitBackground: true,
  });

  await browser.close();
  console.log(`✓ Created: ${path.basename(pngPath)} (${width * scale}x${height * scale})`);
}

async function main() {
  // Ensure assets directory exists
  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
  }

  console.log('Converting SVGs to high-resolution PNGs with Inter font...\n');

  // OG Image - 1200x630 at 2x = 2400x1260
  await convertSvgToPng(
    path.join(PUBLIC_DIR, 'og-image.svg'),
    path.join(ASSETS_DIR, 'og-image.png'),
    1200, 630, 2
  );

  // Logo mark - various sizes
  await convertSvgToPng(
    path.join(PUBLIC_DIR, 'logo-mark.svg'),
    path.join(ASSETS_DIR, 'logo-mark-512.png'),
    512, 512, 1
  );

  await convertSvgToPng(
    path.join(PUBLIC_DIR, 'logo-mark.svg'),
    path.join(ASSETS_DIR, 'logo-mark-192.png'),
    192, 192, 1
  );

  // Full logo
  await convertSvgToPng(
    path.join(PUBLIC_DIR, 'logo-full.svg'),
    path.join(ASSETS_DIR, 'logo-full.png'),
    400, 80, 2
  );

  await convertSvgToPng(
    path.join(PUBLIC_DIR, 'logo-full-white.svg'),
    path.join(ASSETS_DIR, 'logo-full-white.png'),
    400, 80, 2
  );

  // Favicon
  await convertSvgToPng(
    path.join(PUBLIC_DIR, 'favicon.svg'),
    path.join(ASSETS_DIR, 'favicon-32.png'),
    32, 32, 2
  );

  // Apple touch icon
  await convertSvgToPng(
    path.join(PUBLIC_DIR, 'apple-touch-icon.svg'),
    path.join(ASSETS_DIR, 'apple-touch-icon-180.png'),
    180, 180, 1
  );

  console.log('\n✓ All assets converted successfully!');
}

main().catch(console.error);
