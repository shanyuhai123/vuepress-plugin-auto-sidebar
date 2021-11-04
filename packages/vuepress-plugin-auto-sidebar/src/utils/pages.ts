import * as colors from 'colors'
import { AutoSidebarPage, AutoSidebarPluginOptions, GroupPagesResult, IgnoreOptions } from '../types'
import { filterRootMarkdowns, getMenuPath } from './path'

// 从 pages 中提取部分参数
// 并过滤掉异常 page（非 markdown 生成的）
export const handlePages = (pages: AutoSidebarPage[], options: AutoSidebarPluginOptions): AutoSidebarPage[] =>
  pages
    .filter(page => page.relativePath)
    .map((page) => ({
      relativePath: page.relativePath,
      menuPath: getMenuPath(page.relativePath),
      frontmatter: page.frontmatter,
      date: page.date,
      createdTime: page.createdTime,
      gitStatus: page.gitStatus,
      filename: page.filename
    }))
    .filter(filterRootMarkdowns)
    .filter((page) => !page.frontmatter.autoIgnore)
    .filter((page) => {
      if (options.git.trackStatus === 'add') {
        return page.gitStatus === 'add' || page.gitStatus === 'commit'
      } else if (options.git.trackStatus === 'commit') {
        return page.gitStatus === 'commit'
      } else {
        return true
      }
    })

export const handleIgnorePages = (groupPages: GroupPagesResult, ignoreOptions: IgnoreOptions) => {
  ignoreOptions.forEach(({ menu, regex }) => {
    const pages = groupPages[menu]

    if (!pages) {
      console.log(colors.red(`未匹配到路径 ${menu}`))
    } else {
      const re = regex ? RegExp(regex) : /.*/

      const filterPages = pages.filter(page => !page.filename.match(re))

      groupPages[menu] = filterPages
    }
  })
}

// 从所有 pages 中分类为待指定排序的和无需排序的
export const distinguishSpecifiedSortPages = (pages: AutoSidebarPage[]) => pages
  .reduce((acc, page) => {
    if (page.frontmatter.autoPrev || page.frontmatter.autoNext) {
      acc.specifiedSortPages.push(page)
    } else {
      acc.defaultPages.push(page)
    }

    return acc
  }, {
    specifiedSortPages: [] as AutoSidebarPage[],
    defaultPages: [] as AutoSidebarPage[]
  })

// 通用分组函数
const groupPages = (pages: AutoSidebarPage[], key: keyof AutoSidebarPage) =>
  pages
    .map(page => page[key])
    .reduce((acc: GroupPagesResult, cur: any, i) => {
      acc[cur] = (acc[cur] || []).concat(pages[i])

      return acc
    }, {})

// 通过 menuPath 对 pages 进行分组
export const groupPagesByMenuPath = (pages: AutoSidebarPage[]) => groupPages(pages, 'menuPath')
