import puppeteer from 'puppeteer';

async function scrollPage(page, scrollsCount = 2, scrollDelay = 3000) {
  let scrolls = 0;
  try {
    let previousHeight;

    /* eslint-disable no-await-in-loop */
    while (scrolls < scrollsCount) {
      previousHeight = await page.evaluate('document.body.scrollHeight');

      // scrolling to the end of the page
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      // throws if unable to scroll
      await page.waitForFunction(
        `document.body.scrollHeight > ${previousHeight}`,
        { timeout: scrollDelay }
      );
      scrolls += 1;
    }
    /* eslint-disable no-empty */
  } catch (e) {}
}

const getPage = async (url, maxScrolls, scrollDelay) => {
  // temporary solution for running as root in a docker container
  // TODO create a user in a docker container
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  page.on('domcontentloaded', async () => {
    console.log('loaded');
  });

  await page.goto(url);

  // todo remove somehow connect to domcontentloaded
  await page.waitFor(1000);

  await scrollPage(page, maxScrolls, scrollDelay);

  // todo make cleaner
  const html = await page.$eval('html', (e) => e.outerHTML);

  await browser.close();
  return html;
};

/* eslint-disable import/prefer-default-export */
export { getPage };
