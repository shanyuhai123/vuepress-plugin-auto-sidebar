---
title: 文件内配置
autoPrev: plugin-options
---

## 说明

为了避免与其他 [Front Matter](https://vuepress.vuejs.org/zh/guide/frontmatter.html#front-matter) 存在命名冲突，所以在以下部分 Front Matter 以 `auto` 开头。



## autoPrev/autoNext

更精准的排序需要在文件中添加 `autoPrev` 或 `autoNext` 并指定同**目录下**的文件名。

将指定文件排在当前文件前：

```md
---
autoPrev: other-filename
---
```

将指定文件排在当前文件后：

```md
---
autoNext: other-filename
---
```

注意，指向不存在的文件名时会导致当前文件不显示在侧边栏，并会在命令行提示 “xxx 文件指向了不存在的文件”。



## sidebarDepth

markdown 文件内的 `sidebarDepth` 会覆盖全局设置：

```md
---
sidebarDepth: 2
---
```



## autoIgnore

当你有文件不想显示在侧边栏时：

```md
---
autoIgnore: true
---
```



## 多个分组

如果希望一个文件夹内的文件再进一步分组：

```md
---
autoGroup-2: 数组方法
# autoGroup+10: group10
---
```

其中 `-` 和 `+` 二者选其一，`-` 代表在默认分组的下方，`+` 代表在默认分组的上方，符号后面的数字会进一步决定分组的排序。

[配置示例](https://github.com/shanyuhai123/documents/tree/master/docs/frontend/javascript)：

<img :src="$withBase('/assets/group-config-demo1.png')" alt="配置1">

<img :src="$withBase('/assets/group-config-demo2.png')" alt="配置2">

效果展示：

<img :src="$withBase('/assets/group-config-effect.png')" alt="分组效果">