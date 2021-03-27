---
title: 常见问题
sidebar: auto
---

## 0. 更多的问题

如果一下的回答无法解决你的问题，可以给我提一个 [Issue](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar/issues/new)。



## 1. 它真的可以自动生成侧边栏吗？

很抱歉，我的初衷是这样的，但每个人的需求大不相同，只能尽可能的去平衡选择 :crying_cat_face:。



## 2. 为什么页面显示 404？

在 [vuepress](https://vuepress.vuejs.org/zh/guide/directory-structure.html#%E9%BB%98%E8%AE%A4%E7%9A%84%E9%A1%B5%E9%9D%A2%E8%B7%AF%E7%94%B1) 说明了文件路径与页面路由之间的映射关系：

| 文件的相对路径     | 页面路由地址   |
| ------------------ | -------------- |
| `/README.md`       | `/`            |
| `/guide/README.md` | `/guide/`      |
| `/config.md`       | `/config.html` |

所以当你访问 `/guide/` 而 404 时是由于缺乏了它对应的 `README.md` 文件。



## 3. 为什么侧边栏显示的是文件路径，而非文件名？

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

