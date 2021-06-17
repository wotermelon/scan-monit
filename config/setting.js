module.exports = [
// {
//   title: 'baidu.com',
//   url: 'https://baidu.com',
//   // 监控类型。api|file|puppeteer
//   graspType: 'api',
//   graspConfig: {
//     api: {
//       // 抓取响应类型
//       responseType: 'text',
//       // 请求头。默认为 application/json
//       headers: {
//         'content-type': 'text/html',
//       },
//       method: 'get',
//       // 请求数据
//       body: {},
//       // url参数
//       params: {}
//     }
//   },
//   // 校验类型。
//   // status http状态码
//   // allStatus (暂不支持)页面的所有请求状态码
//   // text 文本包含校验
//   // file 文件后缀类型校验，如 apk
//   validateType: 'text',
//   validateConfig: {
//     status: [200], // graspType为status|allStatus时要配置，表示校验http状态码
//     text: 'VideoBuddy', // graspType为text时要配置，表示校验包含文本
//     // fileExtension: 'apk' // graspType为file时要配置，表示校验文件后缀名
//   },
//   isAtAll: false, // 钉钉通知是否要at所有人
// },
  {
  title: 'baidu.com',
  url: 'https://baidu.com',
  graspType: 'puppeteer',
  validateType: 'text',
  validateConfig: {
    text: '关于百度'
  },
  isAtAll: true
}]