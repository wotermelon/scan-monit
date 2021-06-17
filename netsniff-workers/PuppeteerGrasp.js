const path = require('path')
const puppeteer = require('puppeteer') 
const PuppeteerHar = require('puppeteer-har')
const Grasp = require('./Grasp')
const config = require('../config')
const md5 = require('../utils/md5')
const dayjs = require('dayjs')

// # This installs Chrome on any RHEL / CentOS / Amazon Linux variant.
// curl https://intoli.com/install-google-chrome.sh | bash
class PuppeteerGrasp extends Grasp {
  constructor(checkConfig) {
    super(checkConfig)
    this.checkConfigHash = md5(checkConfig.url)
    this.harFilePath = this.genHarFileDir()
  }
  
  async check () {
    try {
      const { url, validateType } = this.checkConfig
      const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        defaultViewport: { width: 1080, height: 1080 }
      })
      const page = await browser.newPage()
      // 如果需要检测所有请求的状态，就需要记录 .har 文件
      // 通过 .har 分析所有的请求情况
      if (validateType.indexOf('allStatus') !== -1) {
        const har = new PuppeteerHar(page)
        await har.start({ 
          path: this.harFilePath
        })
        await page.goto(url, { 
          waitUntil: 'networkidle0' 
        })
        await har.stop()
      } else {
        await page.goto(url, {
          waitUntil: 'networkidle0'
        })
      }
      const pageContent = await page.content()
      // await page.waitForTimeout(1000)
      await browser.close()

      return {
        status: 200,
        data: pageContent,
        headers: null
      }
    } catch (error) {
      return {
        status: -1,
        data: error.message,
        headers: null
      }
    }
  }
  /**
   * .har文件目录：<md5 hash>_<2021-06-11>
   * @returns
   */
  genHarFileDir () {
    return path.join(config.harFilePath, `${dayjs().format('YYYY-MM-DD')}_${this.checkConfigHash}.har`)
  }
}

module.exports = PuppeteerGrasp