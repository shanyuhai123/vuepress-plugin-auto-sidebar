const fs = require('fs');
const path = require('path');

const colors = require("colors/safe");
const { getMenuPath, getFilename, filterRootMarkdowns, groupBy, genSidebar, titleSort, sidebarSort, findGroupIndex, genNav } = require("./lib/utils");
const sidebarOptions = require("./lib/options");

let SIDEBAR = Object.create(null);

module.exports = (options, ctx) => ({
  name: "vuepress-plugin-auto-sidebar",
  async ready() {
    try {
      const mergeOptions = Object.assign({}, sidebarOptions, options);
      const { pages } = ctx;

      // 整理 pages 数据
      const mapPages = pages.filter(page => page.relativePath).map(page => ({
        frontmatter: page.frontmatter,
        menuPath: getMenuPath(page.relativePath),
        filename: getFilename(page.relativePath)
      })).filter(filterRootMarkdowns);

      // 过滤出待排序的
      const sortQueue = mapPages.filter(page => page.frontmatter.autoPrev || page.frontmatter.autoNext);
      const defaultPages = mapPages.filter(page => !page.frontmatter.autoPrev && !page.frontmatter.autoNext);

      const groupByDepth = groupBy(defaultPages, "menuPath");

      titleSort(groupByDepth, mergeOptions.sort);
      let sortQueueCache = [];
      while (sortQueue.length) {
        const current = sortQueue.pop();
        const index = findGroupIndex(current, groupByDepth);

        if (index !== -1) {
          current.frontmatter.autoPrev ?
            groupByDepth[current.menuPath].splice(index + 1, 0, current) :
            groupByDepth[current.menuPath].splice(index, 0, current)

          sortQueue.push(...sortQueueCache);
          sortQueueCache = [];
        } else {
          sortQueueCache.push(current);
        }
      }

      if (sortQueueCache.length) {
        console.log(colors.red("\nvuepress plugin auto sidebar(精准排序): "), `\n  [${colors.green(sortQueueCache.map(q => `${q.filename}(${q.frontmatter.title})`).join("、"))}] \t共 ${sortQueueCache.length} 个文件指向了不存在的 prev 或 next`);
      }

      SIDEBAR = genSidebar(sidebarSort(groupByDepth), mergeOptions);

      const nav = genNav(SIDEBAR);
      const dest = path.join(ctx.sourceDir, ".vuepress/nav.js");

      if (mergeOptions.nav && !fs.existsSync(dest)) {
        await fs.writeFileSync(dest, `module.exports = ${JSON.stringify(nav)};`);
      }
    } catch (ex) {
      console.error(ex);
    }
  },
  async enhanceAppFiles() {
    return {
      name: "auto-sidebar-enhance",
      content: `export default ({ siteData, options }) => { siteData.themeConfig.sidebar = ${JSON.stringify(SIDEBAR)} }`
    }
  }
});