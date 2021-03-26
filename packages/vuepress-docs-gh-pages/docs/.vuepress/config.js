

module.exports = {
  title: 'vuepress 自动生成侧边栏',
  description: '帮助 vuepress 快速生成侧边栏的插件',
  base: "/vuepress-plugin-auto-sidebar/",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
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
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      title: {
        mode: "titlecase"
      },
      sort: {
        mode: "asc"
      }
    },
    "@vuepress/last-updated": {
      transformer: (timestamp, lang) => {
        const moment = require('moment');
        moment.locale(lang)
        return moment(timestamp).format('LLLL')
      }
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
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Features', link: '/features/' },
          { text: 'Questions', link: '/questions' },
        ]
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        ariaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '功能', link: '/zh/features/' },
          { text: '常见问题', link: '/zh/questions' },
        ]
      },
    }
  },
}