import Vue from 'vue'

// const env = process.env.NODE_ENV

const cdn = {
  image: 'https://image.calibur.tv/',
  video: 'https://video.calibur.tv/',
  static: 'https://static.calibur.tv/'
}

// const script = {
//   baiduStat: `var _hmt=_hmt||[];(function(){var hm=document.createElement("script");hm.src="https://hm.baidu.com/hm.js?c10304a2f70ee2ddf8d2818551d37a4b";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s)})();`,
//   baiduPush: `(function(){var bp=document.createElement('script');var curProtocol=window.location.protocol.split(':')[0];if(curProtocol==='https'){bp.src='https://zz.bdstatic.com/linksubmit/push.js'}else{bp.src='http://push.zhanzhang.baidu.com/push.js'}var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(bp,s)})();`
// }

// const sentry = {
//   token: '5b02ddc4b7894347952d08e1f5563b9c2a845347bb234acf9fedd73210cbbd8b',
//   url: 'https://c89b4ce2cfbf44e3bab148e0b7fa31df@sentry.io/1243412'
// }

Vue.use({
  install(Vue) {
    Vue.prototype.$cdn = cdn
  }
})
