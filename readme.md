# 监控

> 监控配置在 config/setting


通过设置 cron 计划任务定时抓取配置的 url 链接来检测链接是否正常运行

目前支持：

- `api` - axios 抓取接口来检测，对响应内容进行匹配
- `file` - 通过抓取请求文件 header 来匹配是否有相同的后缀名
- `puppeteer` - 通过 puppeteer 模拟浏览器来抓取页面内容，对相应内容进行校验匹配

可添加自定义检测抓取和自定义校验，[看这里](./netsniff-workers/readme.md)

## 启动

```bash
# npm install
yarn
# npm start 启动 cron 计划任务
yarn start
```

### TODO:

- [ ] 通过 puppeteer 来抓取页面的所有请求加载来判断页面请求是否异常
- [ ] 校验文件 hash md5


#### 问题：

- 装了puppeteer之后跑不起来？

```bash
# This installs Chrome on any RHEL/CentOS/Amazon Linux variant.
curl https://intoli.com/install-google-chrome.sh | bash

# 测试：可以抓到网页内容即是成功
node ./test-puppeteer.js
```