---
title: Questions
sidebar: auto
---

## 0. more questions

If the following answers cannot solve your confusion, you can [create an issue](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar/issues/new).



## 1. Can it really generate the sidebar automatically？

Sorry, my original intention is this, but everyone's needs are not consistent, and I can only find a balance among them :crying_cat_face:.



## 2. Why page 404?。

The VuePress illustrates the relationship between file path and page routing.

| Relative Path      | Page Routing   |
| ------------------ | -------------- |
| `/README.md`       | `/`            |
| `/guide/README.md` | `/guide/`      |
| `/config.md`       | `/config.html` |

So when visit the `/guide/` page 404 is due to lack of `README.md` file.



## 3. Why does the sidebar show the file path instead of the file title?

This is because there is no `title` in your markdown file, there are two ways to generate the title.

1. add [Front Matter](https://vuepress.vuejs.org/zh/guide/frontmatter.html#front-matter) title <Badge text="Recommended" type="warning"/>

   ```md
   ---
   title: Your Title
   ---
   ```

2. markdown syntax

   ```md
   # Level 1 heading
   ## Level 2 heading
   ```

