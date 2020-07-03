const puppeteer = require('puppeteer');

(async () => {

  let movieUrl = "https://www.imdb.com/title/tt0454921/?ref_=nv_sr_srsg_0"
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto(movieUrl, {
    waitUntil: 'networkidle2'
  });

  let data = await page.evaluate(() => {

    let title = document.querySelector('div[class=title_wrapper] > h1').innerText;
    let rating = document.querySelector('span[itemprop="ratingValue"]').innerText;
    let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerText;

    return {
      title,
      rating,
      ratingCount
    }
  });
  // await page.screenshot({
  //   path: 'example.png'
  // });
  console.log('il titolo è: ' + data.title);
  console.log('il voto è: ' + data.rating);
  console.log('il rating-count è: ' + data.ratingCount);
  await browser.close();
})();