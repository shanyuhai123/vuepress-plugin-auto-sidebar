---
title: Frontmatter
autoPrev: plugin-options
---

## Overview

In order to avoid confict with other [Front Matter](https://vuepress.vuejs.org/guide/frontmatter.html#alternative-frontmatter-formats), some of the following Front Matter will start with `auto`.



## autoPrev/autoNext

If you want more precise sorting, such as `other-filename` before `current-filename`, you could add `autoPrev` in the current markdown file:

```md
---
autoPrev: other-filename
---
```

If you want `other-filename` behind current markdown file:

```md
---
autoNext: other-filename
---
```

If it points to a file that does not exist, it will not be displayed in the sidebar, and throws "your filename 指向了不存在的文件".



## sidebarDepth

A page can also override this value via `YAML front matter`:

```md
---
sidebarDepth: 2
---
```



## autoIgnore

If you want some markdown  file do not display in the sidebar:

```md
---
autoIgnore: true
---
```



## more groups

If you want to divide the files in a folder into more groups:

```md
---
autoGroup-2: 数组方法
# autoGroup+10: group10
---
```

Among them, `-` and `+` choose one. `-` means below the default group, `+` means above the default group, and the number behind the symbol determines the order. 

Here is a example:

<img :src="$withBase('/assets/group-config-demo1.png')" alt="配置1">

<img :src="$withBase('/assets/group-config-demo2.png')" alt="配置2">

效果展示：

<img :src="$withBase('/assets/group-config-effect.png')" alt="分组效果">

