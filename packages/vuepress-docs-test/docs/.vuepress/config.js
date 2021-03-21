const navConf = require('./nav')

module.exports = {
  title: '测试',
  description: '测试文档',
  plugins: {
    "vuepress-plugin-auto-sidebar": {
    }
  },
  themeConfig: {
    nav: navConf
  },
}