const { filterRootMarkdowns, filterDepthOneMarkdowns, filterDepthTwoMarkdowns, addDepthOne, addDepthTwo, genSidebar, genRoute, formatTitle, titleSortBy } = require("./lib/utils");
const sidebarOptions = require("./lib/options");

let SIDEBAR = Object.create(null);

module.exports = (options, ctx) => ({
  name: "vuepress-plugin-auto-sidebar",
  async ready() {
    try {
      const mergeOptions = Object.assign({}, sidebarOptions, options);
      const { pages } = ctx;

      // 简化 pages 数据
      const mapPages = pages.map(page => ({
        path: page.path,
        split: page.path.split("/").slice(1)  // 移除多余的空格
      })).filter(filterRootMarkdowns);

      const depthOnePages = addDepthOne(mapPages.filter(filterDepthOneMarkdowns));
      const depthTwoPages = addDepthTwo(mapPages.filter(filterDepthTwoMarkdowns));

      let depthTwoPagesSidebar = Object.create(null);
      const depthOnePagesSidebar = depthOnePages.reduce((acc, cur) => (acc[genRoute(cur.name)] = genSidebar(formatTitle(cur.name, mergeOptions.titleMode, mergeOptions.titleMap), cur.children), acc), {});
      depthTwoPages.forEach(group => group.children.reduce((acc, cur) => (acc[genRoute(group.name, cur.name)] = genSidebar(formatTitle(cur.name, mergeOptions.titleMode, mergeOptions.titleMap), cur.children), acc), depthTwoPagesSidebar));

      SIDEBAR = Object.assign({}, depthOnePagesSidebar, depthTwoPagesSidebar);
      // 丑陋的实现排序
      titleSortBy(SIDEBAR, attr => attr[0].children, mergeOptions.sort);
    } catch (ex) {
      console.log(ex);
    }
  },
  async enhanceAppFiles() {
    return {
      name: "auto-sidebar-enhance",
      content: `export default ({ siteData, options }) => { siteData.themeConfig.sidebar = ${JSON.stringify(SIDEBAR)} }`
    }
  }
});