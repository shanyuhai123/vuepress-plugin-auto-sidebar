import { AutoSidebarPage } from '../types'

// 在 path 前后补全 `/`
export const padWithSlash = (path: string) => `${path.startsWith('/') ? '' : '/'}${path}${path.endsWith('/') ? '' : '/'}`

// 获取除文件名外的 path
export const getMenuPath = (path: string): string =>
  padWithSlash(path.split('/').slice(0, -1).join('/'))

// 过滤根节点的 path
export const filterRootMarkdowns = (page: AutoSidebarPage) => page.menuPath !== '//'
