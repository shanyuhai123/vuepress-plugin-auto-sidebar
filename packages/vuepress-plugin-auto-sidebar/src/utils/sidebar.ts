import { AutoSidebarPage, AutoSidebarPluginOptions, BuiltInTitleRules, GroupPagesResult, SidebarGroupResult, TitleOptions } from '../types'

const DivideReg = /autoGroup([+-])(\d*)/

const toDefaultCase = (str: string) => str
const toLowerCase = (str: string) => str.toLowerCase()
const toUpperCase = (str: string) => str.toUpperCase()
const toCapitalize = (first: string, ...rest: string[]) =>
  first.toUpperCase() + rest.join('')
const toCamelCase = (str: any) => {
  const s =
      str &&
      str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map((x: string) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
        .join('')
  return s.slice(0, 1).toLowerCase() + s.slice(1)
}
const toKebabCase = (str: any) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x: string) => x.toLowerCase())
    .join('-')
const toTitleCase = (str: any) =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x: string) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ')

// 内置标题映射规则
const builtInTitleRules: BuiltInTitleRules = {
  default: toDefaultCase,
  lowercase: toLowerCase,
  uppercase: toUpperCase,
  capitalize: toCapitalize,
  camelcase: toCamelCase,
  kebabcase: toKebabCase,
  titlecase: toTitleCase
}

// 将 menuPath 转为 title
const formatTitle = (title: string = '', titleOptions: TitleOptions): string => {
  const { mode, map } = titleOptions

  // 映射时为完整路径
  if (map[title]) {
    return map[title]
  }

  // 默认规则时取最后一项
  const endTitle = title.split('/').slice(-2, -1).toString()
  if (!mode) {
    return builtInTitleRules.default(endTitle)
  }
  return builtInTitleRules[mode.toLowerCase()](endTitle)
}

interface DivideMoreGroupsResult {
  above: {groupName: string, sort: number, children: string[]}[]
  default: string[]
  below: {groupName: string, sort: number, children: string[]}[]
}

// 根据 markdown 内的 autoGroup 字段进行分组
const divideMoreGroups = (pagesGroup: AutoSidebarPage[]) =>
  pagesGroup.reduce((acc: DivideMoreGroupsResult, page, index) => {
    const autoGroup = Object.keys(page.frontmatter).find(f => DivideReg.test(f))
    const filename = page.filename === 'README' ? '' : page.filename

    if (!autoGroup) {
      // 不存在时推送到 default 中
      acc.default.push(filename)
    } else {
      // 存在时需进一步判断内部规则，利用正则捕获对应参数
      const autoGroupName = page.frontmatter[autoGroup]

      const match = autoGroup.match(DivideReg)

      if (match) {
        const [, symbol, sort] = match

        if (symbol === '+') {
          const findGroup = acc.above.find(a => a.groupName === autoGroupName)

          if (findGroup) {
            findGroup.children.push(filename)
          } else {
            acc.above.push({
              groupName: autoGroupName,
              sort: Number(sort),
              children: [filename]
            })
          }
        }
        if (symbol === '-') {
          const findGroup = acc.below.find(a => a.groupName === autoGroupName)
          if (findGroup) {
            findGroup.children.push(filename)
          } else {
            acc.below.push({
              groupName: autoGroupName,
              sort: Number(sort),
              children: [filename]
            })
          }
        }
      }
    }

    // 最后一次进行排序
    if (index === pagesGroup.length - 1) {
      acc.above.sort((a, b) => a.sort - b.sort >= 0 ? -1 : 1)
      acc.below.sort((a, b) => a.sort - b.sort >= 0 ? 1 : -1)
    }

    return acc
  }, {
    above: [],
    default: [],
    below: []
  })

const genGroup = (title: string, children = [''], collapsable = false, sidebarDepth = 1) => ({
  title,
  collapsable,
  sidebarDepth,
  children
})

// 生成 sidebar
export const genSidebar = (sortedGroupPages: GroupPagesResult, options: AutoSidebarPluginOptions) =>
  Object.keys(sortedGroupPages)
    .reduce((acc: SidebarGroupResult, group: string) => {
      // 获取当前分组 title
      const title = formatTitle(group, options.title)

      // 查看当前分组内部是否进行二次划分
      const { above, default: defaultGroup, below } = divideMoreGroups(sortedGroupPages[group])

      // 判断当前分组能否折叠
      const collapsable = options.collapse.collapseList?.find(co => co === group)
        ? true
        : options.collapse.uncollapseList?.find(co => co === group)
          ? false
          : options.collapse.open

      acc[group] = [
        ...above.map(a => genGroup(a.groupName, a.children, collapsable, options.sidebarDepth)),
        genGroup(title, defaultGroup, collapsable, options.sidebarDepth),
        ...below.map(b => genGroup(b.groupName, b.children, collapsable, options.sidebarDepth))
      ]

      return acc
    }, {})
