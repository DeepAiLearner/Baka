const qiniu = require('./qiniu')
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const CompressionPlugin = require('compression-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')

module.exports = {
  mode: 'universal',
  env: {
    baseUrl: process.env.BASE_URL,
    cdnHost: qiniu.host
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '天下漫友是一家',
    titleTemplate: titleChunk => {
      return titleChunk ? `${titleChunk} - calibur` : '天下漫友是一家 - calibur'
    },
    htmlAttrs: {
      lang: 'zh-CN'
    },
    bodyAttrs: {
      id: 'calibur-tv'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,maximum-scale=1'
      },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { name: 'force-rendering', content: 'webkit' },
      {
        hid: 'description',
        name: 'description',
        content: '一个兴趣使然的二次元综合网站'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'calibur，咖喱棒, 动漫，ACG，二次元，视频，番剧，动画，新番，神作, 排行榜, 贴吧, 盖楼, 应援, 帖子, 在线'
      }
    ],
    link: [
      {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: `https://image.calibur.tv/favicon.ico`
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#00a1d6' },

  /*
  ** Global CSS
  */
  css: ['~/assets/css/global.scss', 'normalize.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/element-ui',
    '~/plugins/prototype-global',
    '~/plugins/global-components',
    { src: '~/plugins/prototype-client', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    sass: ['./assets/css/variables.scss', './assets/css/mixins.scss']
  },

  /**
   * Global middleware
   */
  router: {
    middleware: ['session']
  },

  /*
  ** Build configuration
  */
  build: {
    extend(config, { isDev, isClient }) {
      // Run ESLint on save
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.resolve.alias['create-api'] = isClient
        ? resolve('./api/_create-api-client.js')
        : resolve('./api/_create-api-server.js')
      config.resolve.alias['create-http'] = isClient
        ? resolve('./api2/_create-api-client.js')
        : resolve('./api2/_create-api-server.js')
      config.resolve.alias.env = resolve('./.env.js')
    },
    extractCSS: true,
    plugins: (() => {
      const result = []
      return isDev
        ? result.concat([])
        : result.concat([
            new CompressionPlugin({
              test: /\.(js|css|html)$/
            }),
            new BrotliPlugin({
              test: /\.(js|css|html)$/
            })
          ])
    })(),
    loaders: {
      cssModules: {
        localIdentName: '[local]-[hash:base64:2]',
        camelCase: true
      }
    },
    publicPath: isDev ? '/_nuxt/' : `${qiniu.host.static}${qiniu.key_prefix}`
  }
}
