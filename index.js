const fs = require("fs");
const path = require("path");
const { filterRootMarkdowns, filterDepthOneMarkdowns, filterDepthTwoMarkdowns, addDepthOne, addDepthTwo, genSidebar, genRoute } = require("./lib/utils");
const sidebarOptions = require("./lib/options");

const OPTIONAL_MODE = ['default']; // 待补充

module.exports = (options, ctx) => ({
  name: "vuepress-plugin-auto-sidebar",
  async ready() {
    try {
      const mergeOptions = Object.assign({}, sidebarOptions, options);
      const { sourceDir, pages } = ctx;

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
      const SIDEBAR = Object.assign({}, depthOnePagesSidebar, depthTwoPagesSidebar);

      // 处理输出
      const filename = mergeOptions.filename.endsWith(".js") ? mergeOptions.filename : mergeOptions.filename + ".js";
      await fs.writeFileSync(path.resolve(sourceDir, mergeOptions.dest, filename), `module.exports = ${JSON.stringify(SIDEBAR)}`);

    } catch (ex) {
      console.log(ex);
    }
  }
});