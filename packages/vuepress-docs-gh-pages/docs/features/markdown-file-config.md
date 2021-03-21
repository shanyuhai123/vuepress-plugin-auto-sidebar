---
title: 文件内配置
autoPrev: plugin-options
---

## 说明

在设计时，希望能够更专心于写好你的博客或笔记，无论之后增删改文件都不再需要关心插件的配置问题，所以将一些配置置于文件内。

进一步了解 [Front Matter](https://v1.vuepress.vuejs.org/zh/guide/frontmatter.html#front-matter)。



## 精准排序

更精准的排序需要在文件中添加 `autoPrev` 或 `autoNext` 并指定同目录下的文件名。

::: tip 提示

`autoPrev`：将指定文件排在当前文件前面。

`autoNext`：将指定文件排在当前文件后面。

需要注意的是，错误的文件名会导致侧边栏不显示该文件，并会在命令行提示 “指向了不存在的文件”。

:::


```
---
autoPrev: plugin-options
---
```

上面例子 :chestnut: 表示将 `plugin-options（插件的可选项）` 放到当前页面 `markdown-file-config（文件内配置）` 的前面，你可在当前页的 **sidebar** 看到效果。

除了精准排序，还有[内置的排序规则](/features/plugin-options.html#sort（排序）)。



## 多个分组

希望像 vuepress 官网那样支持多个分组，需要在文件内添加分组标识 `autoGroup`：

```yaml
---
autoGroup-1: 分组名称
# autoGroup+10: 分组名称
---
```

其中 `autoGroup` 为固定格式，不可更改。`-` 和 `+` 二者选其一，`-` 代表在默认分组的下方，数字越大越往下；`+` 代表在默认分组的上方，数字越大越往上。

[配置示例](https://github.com/shanyuhai123/documents/tree/master/docs/frontend/javascript)：

<img :src="$withBase('/assets/group-config-demo1.png')" alt="配置1">

<img :src="$withBase('/assets/group-config-demo2.png')" alt="配置2">

效果展示：

<img :src="$withBase('/assets/group-config-effect.png')" alt="分组效果">