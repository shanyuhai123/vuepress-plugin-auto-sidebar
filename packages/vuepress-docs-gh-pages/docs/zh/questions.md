---
title: 常见问题
sidebar: auto
---

## 0. 更多的问题

该部分的功能实现大部分基本来源于我个人记笔记时的需求，所以在广泛使用上可能不那么友好，如果你有一些其余的需求或者意见可以给我[提一个 Issue](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar/issues/new)。



## 1. 它的作用是生成侧边栏吗？

不，它**并不是**一个自动生成侧边栏的插件，**它仅仅可以帮助你对同一目录下的文件进行分组。**

> :slightly_smiling_face: 这是写这个插件的初始目标，谁知写完后完全不是那么一回事。



## 2. 页面显示 404。

在 [vuepress](https://v1.vuepress.vuejs.org/zh/guide/directory-structure.html#%E9%BB%98%E8%AE%A4%E7%9A%84%E9%A1%B5%E9%9D%A2%E8%B7%AF%E7%94%B1) 说明了文件路径与页面路由之间的映射关系：

| 文件的相对路径     | 页面路由地址   |
| ------------------ | -------------- |
| `/README.md`       | `/`            |
| `/guide/README.md` | `/guide/`      |
| `/config.md`       | `/config.html` |

所以当你访问 `/guide/` 而 404 时是由于缺乏了它对应的 `README.md` 文件。



## 3. 侧边栏显示的是文件路径，而非文件名。

这是由于你的 `md` 文件中缺乏标题导致的，标题的产生有两种方式:

1. 添加 [Front Matter](https://v1.vuepress.vuejs.org/zh/guide/frontmatter.html#front-matter) 的 title 属性 <Badge text="推荐" type="warning"/>

   ```yaml
   ---
   title: 标题
   ---
   ```

2. markdown 语法中的标题

   ```markdown
   # 一级标题
   ## 二级标题
   ```




## 4. 目录、文件同级会存在什么问题？

会导致多个同级的导航栏同时高亮（选中）：

<img :src="$withBase('/assets/router-link-hightlight.png')" alt="同级问题">

这是由于 vuepress 默认主题的 `@vuepress/theme-default/components/NavLink.vue` 的 `<RouterLink>` 缺乏 `exact`，可能之后它会解决这个问题？

