import { PageFrontmatter } from 'vuepress-types'

export type ArraySortFn<T> = (pageA: T, pageB: T) => number
export type ArrayMapFn<T> = (value: T, index: number, array: T[]) => any[]

interface AutoSidebarPageFrontmatter {
  autoPrev?: string
  autoNext?: string
  autoGroup?: string
  autoIgnore?: boolean
}

export interface AutoSidebarPage {
  relativePath: string
  menuPath: string
  frontmatter: PageFrontmatter & AutoSidebarPageFrontmatter
  date: string
  filename: string
}

type SIDEBAR_OPTIONS_SORT =
  | 'asc' // 升序
  | 'desc' // 降序
  | 'custom' // 自定义
  // | 'date_asc' // 时间升序
  // | 'date_desc' // 时间降序

type SIDEBAR_OPTIONS_TITLE =
  | 'default'
  | 'lowercase'
  | 'uppercase'
  | 'capitalize'
  | 'camelcase'
  | 'kebabcase'
  | 'titlecase'

interface IgnoreOption {
  menu: string
  regex?: RegExp
}

export type IgnoreOptions = IgnoreOption[]

export interface SortOptions {
  mode?: SIDEBAR_OPTIONS_SORT
  fn?: ArraySortFn<AutoSidebarPage>
  readmeFirst: boolean
  // sortKey: keyof AutoSidebarPage
}

interface TitleMap {
  [key: string]: string
}

export interface TitleOptions {
  mode: SIDEBAR_OPTIONS_TITLE
  map: TitleMap
}

export interface CollapseOptions {
  open?: boolean
  collapseList?: string[]
  uncollapseList?: string[]
}

export interface AutoSidebarPluginOptions {
  sort: SortOptions
  title: TitleOptions
  sidebarDepth: number
  collapse: CollapseOptions
  ignore: IgnoreOptions
}

export interface GroupPagesResult {
  [key: string]: AutoSidebarPage[]
}

export interface SidebarGroupResult {
  [key: string]: { title: string, collapsable: boolean, sidebarDepth: number, children: string[] }[]
}

interface Navbar {
  text: string,
  link?: string
  items?: Navbar[]
}

export type NavbarResult = Navbar[]

export interface BuiltInSortRules {
  [key: string]: ArraySortFn<AutoSidebarPage>
}

export interface BuiltInTitleRules {
  [key: string]: (str: string) => string
}
