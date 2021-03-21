const moment = require('moment');

moment.locale("zh-cn");

module.exports = {
  title: 'vuepress 自动生成侧边栏',
  description: '帮助 vuepress 快速生成侧边栏的插件',
  base: "/vuepress-plugin-auto-sidebar/",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      title: {
        mode: "titlecase"
      }
    },
    "@vuepress/last-updated": {
      transformer: (timestamp) => moment(timestamp).format('LLLL')
    },
    "@vuepress/google-analytics": {
      ga: "UA-134613928-2"
    }
  },
  themeConfig: {
    lastUpdated: '上次更新',
    repo: 'shanyuhai123/vuepress-plugin-auto-sidebar',
    editLinks: true,
    editLinkText: '编辑文档！',
    docsDir: 'docs',
    docsBranch: 'docs',
    nav: [
      { text: '首页', link: '/' },
      { text: '功能', link: '/features/' },
      { text: '常见问题', link: '/questions' },
    ]
  },
}