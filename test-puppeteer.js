const puppeteer = require('puppeteer')

async function main () {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    defaultViewport: { width: 1080, height: 1080 }
  })
  const page = await browser.newPage()
  
  await page.goto('https://baidu.com', {
    waitUntil: 'networkidle0'
  })
  const pageContent = await page.content()
  // await page.waitForTimeout(1000)
  await browser.close()
  
  console.log(pageContent)
}

main()