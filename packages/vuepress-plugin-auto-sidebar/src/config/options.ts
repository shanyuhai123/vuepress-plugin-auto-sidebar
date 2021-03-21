import { AutoSidebarPluginOptions } from '../types'

export const AutoSidebarOptionsDefault: AutoSidebarPluginOptions = {
  // 排序
  sort: {
    mode: 'asc', // 排序模式
    readmeFirst: true // README 是否提到最前面
  },
  // 标题
  title: {
    mode: 'default', // 标题模式
    map: {} // 标题映射
  },
  // 标题深度
  sidebarDepth: 1,
  // 折叠
  collapse: {
    open: false, // 默认是否折叠
    collapseList: [], // 折叠列表
    uncollapseList: [] // 不折叠列表
  }
}
