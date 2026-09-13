const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  
  await page.goto('file://' + process.cwd() + '/damas-villa.html', {waitUntil: 'networkidle0'});
  
  const mainHTML = await page.$eval('main', el => el.innerHTML);
  console.log('MAIN HTML LENGTH:', mainHTML.length);
  
  await browser.close();
})();
