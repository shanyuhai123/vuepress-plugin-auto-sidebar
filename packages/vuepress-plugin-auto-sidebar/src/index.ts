import { Context } from 'vuepress-types'
import { existsSync, writeFileSync } from 'fs'
import { join } from 'path'
import { AutoSidebarOptionsDefault } from './config/options'
import { AutoSidebarPluginOptions } from './types'
import { genNav } from './utils/nav'
import { distinguishSpecifiedSortPages, groupPagesByMenuPath, handlePages } from './utils/pages'
import { genSidebar } from './utils/sidebar'
import { pagesSort, pagesGroupSort, specifiedPagesSort } from './utils/sort'

// TODO
// 1. 扩展 cli 支持生成 nav [已完成，还需要判断是否覆盖之前内容]
// 2. 考虑支持单页功能
// 3. 支持将 README 设置为 first
// 4. 隐藏 pages 功能

const AutoSidebarPlugin = (
  options: AutoSidebarPluginOptions,
  ctx: Context
) => {
  const MERGE_OPTIONS = Object.assign({}, AutoSidebarOptionsDefault, options)
  let AUTO_SIDEBAR_DATA = Object.create(null)

  return {
    name: 'vuepress-plugin-auto-sidebar',
    ready () {
      // 核心是对 pages 进行整理
      const pages = handlePages(ctx)

      // 获取指定排序的 pages
      const { specifiedSortPages, defaultPages } = distinguishSpecifiedSortPages(pages)

      // 对 defaultPages 进行分组
      const defaultPagesGroupByMenuPath = groupPagesByMenuPath(defaultPages)

      // 排序优先级
      // 1. 首先会根据 sort 参数进行排序（内置或自定义）
      // 2. 再会根据 README first 确认是否提前，默认为提前
      // 3. 将 specifiedSortPages 插入已排序的 defaultPagesGroupByMenuPath 中
      pagesSort(defaultPagesGroupByMenuPath, { mode: 'asc' })
      specifiedPagesSort(defaultPagesGroupByMenuPath, specifiedSortPages)

      const sortedGroupPages = pagesGroupSort(defaultPagesGroupByMenuPath)

      AUTO_SIDEBAR_DATA = genSidebar(sortedGroupPages, MERGE_OPTIONS)
    },
    enhanceAppFiles () {
      return {
        name: 'auto-sidebar-enhance',
        content: `export default ({ siteData, options }) => { siteData.themeConfig.sidebar = ${JSON.stringify(AUTO_SIDEBAR_DATA)} }`
      }
    },
    extendCli (cli: any) {
      cli
        .command('nav [targetDir]', '生成导航栏（generate navbar）')
        .action(() => {
          const nav = genNav(AUTO_SIDEBAR_DATA)
          const dest = join(ctx.sourceDir, '.vuepress/nav.js')

          if (!existsSync(dest)) {
            writeFileSync(dest, `module.exports = ${JSON.stringify(nav, null, 2)};`)
          }
        })
    }
  }
}

module.exports = AutoSidebarPlugin
