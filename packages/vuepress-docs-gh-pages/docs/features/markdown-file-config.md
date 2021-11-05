---
title: Frontmatter
autoPrev: plugin-options
---

## Overview

In order to avoid conflict with other [Front Matter](https://vuepress.vuejs.org/guide/frontmatter.html#alternative-frontmatter-formats), some of the following Front Matter will start with `auto`.

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

## autoSort

It is more friendly than [built-in rules](/features/plugin-options.html#_1-built-in-rules) and simpler than  `autoPrev/autoNext`.

All files will be sorted according to the value of `autoSort`, with larger values coming first and smaller values coming second. Note that negative values will be sorted after files that do not have the `autoSort` property.

```md
---
autoSort: 1
---
```

> If you want the `README` file to always be in the front, you can configure it in the plugin:
>
> ```js
> module.exports = {
>   plugins: {
>     "vuepress-plugin-auto-sidebar": {
>       sort: {
>         readmeFirstForce: true
>       }
>     }
>   }
> }
> ```

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
