const navConf = require('./nav')

module.exports = {
  title: '测试',
  description: '测试文档',
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      sort: {
        mode: "asc",
      },
      title: {
        mode: "titlecase",
        map: {
          "/menu1/menu1-2/": "修改个标题",
          "/menu2/menu2-2/": "中间分组"
        }
      },
      sidebarDepth: 1,
      collapse: {
        open: true,
        collapseList: ["/menu1/menu1-2/"],
        uncollapseList: ["/menu1/menu1-3/"]
      }
    }
  },
  themeConfig: {
    nav: navConf
  },
}