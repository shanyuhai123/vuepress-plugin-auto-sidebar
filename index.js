const { filterRootMarkdowns, filterDepthOneMarkdowns, filterDepthTwoMarkdowns, addDepthOne, addDepthTwo, genSidebar, genRoute } = require("./lib/utils");
const sidebarOptions = require("./lib/options");

const OPTIONAL_MODE = ["default"]; // 待扩展
let SIDEBAR = Object.create(null);

module.exports = (options, ctx) => ({
  name: "vuepress-plugin-auto-sidebar",
  async ready() {
    try {
      const mergeOptions = Object.assign({}, sidebarOptions, options); // 待扩展
      const {  pages } = ctx;

      // 映射 pages
      const mapPages = pages.map(page => ({
        path: page.path,
        split: page.path.split("/").slice(1)  // 移除多余的空格
      })).filter(filterRootMarkdowns);

      const depthOnePages = addDepthOne(mapPages.filter(filterDepthOneMarkdowns));
      const depthTwoPages = addDepthTwo(mapPages.filter(filterDepthTwoMarkdowns));

      let depthTwoPagesSidebar = Object.create(null);
      const depthOnePagesSidebar = depthOnePages.reduce((acc, cur) => (acc[genRoute(cur.name)] = genSidebar(cur.name, cur.children), acc), {});
      depthTwoPages.forEach(group => group.children.reduce((acc, cur) => (acc[genRoute(group.name, cur.name)] = genSidebar(cur.name, cur.children), acc), depthTwoPagesSidebar));
      
      SIDEBAR = Object.assign({}, depthOnePagesSidebar, depthTwoPagesSidebar);
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