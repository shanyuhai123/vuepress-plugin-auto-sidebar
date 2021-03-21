import { NavbarResult, SidebarGroupResult } from '../types'
import { padWithSlash } from './path'

// 对 nav 进行简单排序
const handleNavSort = (nav: NavbarResult) =>
  nav.forEach(n => {
    if (n.items) {
      handleNavSort(n.items)
    }

    nav.sort((n1, n2) => n1.text > n2.text ? 1 : -1)
  })

// 生成导航栏
export const genNav = (sidebarData: SidebarGroupResult) =>
  Object.keys(sidebarData)
    .reduce((acc: NavbarResult, group, index, arr) => {
      const [, menu] = group.split('/')
      const [{ title }] = sidebarData[group]

      const re = acc.find(a => a.text === menu)

      const link = padWithSlash(group)

      if (re) {
        re.items?.push({ text: title, link })
      } else {
        acc.push({ text: menu, items: [{ text: title, link }] })
      }

      // 排序
      if (index === arr.length - 1) {
        handleNavSort(acc)
      }

      return acc
    }, [])
