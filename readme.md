# 监控

监控配置在 config/setting

## 启动

```bash
yarn

yarn start
```

### 问题：装了puppeteer之后跑不起来？

```bash
# This installs Chrome on any RHEL/CentOS/Amazon Linux variant.
curl https://intoli.com/install-google-chrome.sh | bash

# 测试：可以抓到网页内容即是成功
node ./test-puppeteer.js
```