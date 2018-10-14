const fs = require('fs');
const puppeteer = require('puppeteer');
const { sample } = require('lodash');

function getLines(filename) {
  return fs.readFileSync(filename, {encoding: 'utf8'}).split('\n');
}

function construction1() {
  return `is ${sample(nouns)} `;
}

function construction2() {
  return `are ${sample(nouns)}s `;
}

function construction3() {
  return `${sample(nouns)} is `;
}

function construction4() {
  return `${sample(nouns)}s are `;
}

function question() {
  return sample([
    construction1,
    construction2,
    construction3,
    construction4
  ])();
}

const nouns = getLines('./nouns.txt');

(async () => {
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

  const browser = await puppeteer.launch({
    defaultViewport: {
      deviceScaleFactor: 2,
      width: 1600,
      height: 1600
    }
  });
  const page = await browser.newPage();
  await page.goto('https://google.com');

  await page.type('input[name="q"]', question());
  await wait(1000);

  await page.$eval('div[aria-label="Search by voice"]', e => e.parentElement.remove())
  await page.$eval('center', e => e.parentElement.remove())

  await page.$$eval('a[href="#"]', links => links.forEach(link => {
    link.innerHTML = '&nbsp;';
    link.style.marginTop = '15px';
  }))

  const form = await page.$('#searchform');
  await form.screenshot({path: 'google.png'});

  await browser.close();
})();
