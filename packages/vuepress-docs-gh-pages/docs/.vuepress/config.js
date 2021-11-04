require('dotenv').config()

const genGoogleAnalytics = () => [
  [
    'script',
    {
      async: true,
      src: `https://www.googletagmanager.com/gtag/js?id=G-RRMRPZMB2Z`
    }
  ],
  [
    'script',
    {},
    `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-RRMRPZMB2Z');
    `
  ]
]

module.exports = {
  title: 'vuepress 自动生成侧边栏',
  description: '帮助 vuepress 快速生成侧边栏的插件',
  base: "/vuepress-plugin-auto-sidebar/",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: 'vuepress,vuepress bar,vuepress sidebar,vuepress auto sidebar,vuepress 侧边栏,vuepress 自动生成侧边栏' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ...genGoogleAnalytics()
  ],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Vuepress Plugin Auto Sidebar',
      description: 'This is a plugin that automatically generates a sidebar for vuepress.'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Vuepress Plugin Auto Sidebar',
      description: '这是一个为 Vuepress 自动生成侧边栏的插件'
    }
  },
  plugins: [
    ["vuepress-plugin-auto-sidebar", {
      title: {
        mode: "titlecase",
      },
      sidebarDepth: 2
    }],
    ["@vuepress/last-updated", {
      transformer: (timestamp, lang) => {
        const moment = require('moment');
        moment.locale(lang)
        return moment(timestamp).format('LLLL')
      }
    }]
  ],
  themeConfig: {
    lastUpdated: '上次更新',
    repo: 'shanyuhai123/vuepress-plugin-auto-sidebar',
    editLinks: true,
    editLinkText: '编辑文档！',
    docsDir: 'docs',
    docsBranch: 'docs',
    locales: {
      '/': {
        label: 'English',
        selectText: '选择语言',
        ariaLabel: '选择语言',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Features', link: '/features/plugin-options' },
          { text: 'Questions', link: '/questions' },
          { text: 'CHANGELOG🥳', link: '/CHANGELOG🥳/CHANGELOG' },
        ]
      },
      '/zh/': {
        label: '简体中文',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '功能', link: '/zh/features/plugin-options' },
          { text: '常见问题', link: '/zh/questions' },
          { text: '更新日志🥳', link: '/zh/更新日志🥳/更新日志' },
        ]
      },
    }
  },
}