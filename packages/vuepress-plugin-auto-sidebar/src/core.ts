import { AutoSidebarPage, AutoSidebarPluginOptions } from './types'
import { distinguishSpecifiedSortPages, groupPagesByMenuPath, handleIgnorePages, handlePages } from './utils/pages'
import { genSidebar } from './utils/sidebar'
import { pagesGroupSort, pagesSort, specifiedPagesSort } from './utils/sort'

const readyOrPreparedPages = (pages: AutoSidebarPage[], options: AutoSidebarPluginOptions) => {
  // 核心是对 pages 进行整理
  const collatedPages = handlePages(pages)

  // 获取指定排序的 pages
  const { specifiedSortPages, defaultPages } = distinguishSpecifiedSortPages(collatedPages)

  // 对 defaultPages 进行分组
  const defaultPagesGroupByMenuPath = groupPagesByMenuPath(defaultPages)

  // 从侧边栏隐藏指定文件
  handleIgnorePages(defaultPagesGroupByMenuPath, options.ignore)

  // 排序优先级
  // 1. 首先会根据 sort 参数进行排序（内置或自定义）
  //    1.1 在内置规则下会判断 README 是否提前，默认为提前，而自定义规则时自行处理
  // 2. 将 specifiedSortPages 插入已排序的 defaultPagesGroupByMenuPath 中
  pagesSort(defaultPagesGroupByMenuPath, options.sort)
  specifiedPagesSort(defaultPagesGroupByMenuPath, specifiedSortPages)

  const sortedGroupPages = pagesGroupSort(defaultPagesGroupByMenuPath)

  return genSidebar(sortedGroupPages, options)
}

export default readyOrPreparedPages
