const puppeteer = require('puppeteer');
const path = require('path');

async function generateImage() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set viewport
  await page.setViewport({ width: 520, height: 800, deviceScaleFactor: 2 });

  // Load the HTML file
  const htmlPath = path.join(__dirname, 'generate-feature-image.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Get the card element dimensions
  const cardElement = await page.$('.card');
  const boundingBox = await cardElement.boundingBox();

  // Screenshot with padding
  await page.screenshot({
    path: path.join(__dirname, '../public/assets/feature-profile.png'),
    clip: {
      x: boundingBox.x - 24,
      y: boundingBox.y - 24,
      width: boundingBox.width + 48,
      height: boundingBox.height + 48
    }
  });

  console.log('Image generated: public/assets/feature-profile.png');

  await browser.close();
}

generateImage().catch(console.error);
