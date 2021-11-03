import { Context } from 'vuepress-types'
import merge from 'merge'
import * as colors from 'colors/safe'
import { existsSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'
import readyOrPreparedPages from './core'
import { AutoSidebarOptionsDefault } from './config/options'
import { AutoSidebarPage, AutoSidebarPluginOptions, VuePressVersion } from './types'
import { genNav } from './utils/nav'
import { checkGit, getGitCreatedTime } from './utils/git'

const AutoSidebarPlugin = (
  options: AutoSidebarPluginOptions,
  ctx: Context
) => {
  const MERGE_OPTIONS: AutoSidebarPluginOptions = merge.recursive(AutoSidebarOptionsDefault, options)
  let AUTO_SIDEBAR_DATA = Object.create(null)

  const isGitValid = checkGit(ctx.sourceDir)

  return {
    name: 'vuepress-plugin-auto-sidebar',
    // v1 生命周期
    ready () {
      // 置为 v1，避免用户误操作
      MERGE_OPTIONS.version = VuePressVersion.V1

      const sidebarData = readyOrPreparedPages(ctx.pages as AutoSidebarPage[], MERGE_OPTIONS)

      AUTO_SIDEBAR_DATA = sidebarData
    },
    // v2 生命周期
    onPrepared (App: any) {
      // 置为 v2，避免用户误操作
      MERGE_OPTIONS.version = VuePressVersion.V2

      // v2 缺乏部分参数，补齐
      const pages = App.pages.map((page: any) => ({
        ...page,
        relativePath: page.filePathRelative,
        filename: page.slug // TODO: 使用 slug 有些奇怪，但 v2 版本未提供更好的选择
      }))
      const sidebarData = readyOrPreparedPages(pages as AutoSidebarPage[], MERGE_OPTIONS)

      const destSidebar = resolve(App.options.source, '.vuepress', `${MERGE_OPTIONS.output.filename}.js`)
      writeFileSync(destSidebar, `module.exports = ${JSON.stringify(sidebarData, null, 2)};`)
    },
    enhanceAppFiles () {
      return {
        name: 'auto-sidebar-enhance',
        content: `export default ({ siteData, options }) => { siteData.themeConfig.sidebar = ${JSON.stringify(AUTO_SIDEBAR_DATA)} }`
      }
    },
    // v1
    async extendPageData (page: AutoSidebarPage) {
      if (page.relativePath) {
        const filepath = join(ctx.sourceDir, page.relativePath)

        if (isGitValid) {
          const createdTime = await getGitCreatedTime(filepath)

          if (!isNaN(createdTime)) {
            page.createdTime = createdTime
          }
        }
      }
    },
    // v2
    async extendsPageData (page: AutoSidebarPage) {
      if (page.filePath) {
        if (isGitValid) {
          const createdTime = await getGitCreatedTime(page.filePath)

          if (!isNaN(createdTime)) {
            page.createdTime = createdTime
          }
        }
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
