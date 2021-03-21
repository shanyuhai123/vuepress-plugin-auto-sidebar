import { Context } from 'vuepress-types'
import { AutoSidebarPage, GroupPagesResult } from '../types'
import { filterRootMarkdowns, getMenuPath } from './path'

// 从 pages 中提取部分参数
// 并过滤掉异常 page（非 markdown 生成的）
export const handlePages = (ctx: Context): AutoSidebarPage[] => ctx.pages
  .filter(page => page.relativePath)
  .map(page => ({
    xxx: page.path,
    relativePath: page.relativePath,
    menuPath: getMenuPath(page.relativePath),
    frontmatter: page.frontmatter,
    date: page.date,
    filename: page.filename
  }))
  .filter(filterRootMarkdowns)

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
