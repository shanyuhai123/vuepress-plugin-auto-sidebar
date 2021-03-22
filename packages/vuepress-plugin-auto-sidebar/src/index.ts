import { Context } from 'vuepress-types'
import merge from 'merge'
import * as colors from 'colors/safe'
import { existsSync, writeFileSync } from 'fs'
import { join } from 'path'
import { AutoSidebarOptionsDefault } from './config/options'
import { AutoSidebarPluginOptions } from './types'
import { genNav } from './utils/nav'
import { distinguishSpecifiedSortPages, groupPagesByMenuPath, handleIgnorePages, handlePages } from './utils/pages'
import { genSidebar } from './utils/sidebar'
import { pagesSort, pagesGroupSort, specifiedPagesSort } from './utils/sort'

const AutoSidebarPlugin = (
  options: AutoSidebarPluginOptions,
  ctx: Context
) => {
  const MERGE_OPTIONS: AutoSidebarPluginOptions = merge.recursive(AutoSidebarOptionsDefault, options)
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

      // 从侧边栏隐藏指定文件
      handleIgnorePages(defaultPagesGroupByMenuPath, MERGE_OPTIONS.ignore)

      // 排序优先级
      // 1. 首先会根据 sort 参数进行排序（内置或自定义）
      //    1.1 在内置规则下会判断 README 是否提前，默认为提前，而自定义规则时自行处理
      // 2. 将 specifiedSortPages 插入已排序的 defaultPagesGroupByMenuPath 中
      pagesSort(defaultPagesGroupByMenuPath, MERGE_OPTIONS.sort)
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
        .command('nav [targetDir]', '生成导航栏（generate nav file）')
        .option('-f, --force', '强制覆盖已存在的 nav 文件（Forcibly overwrite the existing nav file）')
        .action((dir: string, options: any) => {
          const nav = genNav(AUTO_SIDEBAR_DATA)
          const dest = join(ctx.sourceDir, '.vuepress/nav.js')

          if (options.force || !existsSync(dest)) {
            writeFileSync(dest, `module.exports = ${JSON.stringify(nav, null, 2)};`)

            console.log(colors.green(`已在 ${dest} 生成 nav 配置文件`))
          } else {
            console.log(colors.red(`${dest} 已存在文件，可使用 vuepress nav ${dir} -f 覆盖配置文件`))
          }
        })
    }
  }
}

module.exports = AutoSidebarPlugin
