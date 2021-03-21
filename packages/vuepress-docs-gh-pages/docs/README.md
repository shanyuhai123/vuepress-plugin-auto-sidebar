---
title: 快速了解
sidebar: auto
---

## 介绍（Introduction）

这是为 vuepress 自动生成侧边栏的插件。

如果你只是写一个简单介绍页，那没必要使用它，但如果你希望用 vuepress 记录很多的东西，例如：[飞跃高山与大洋的鱼的笔记](https://docs.shanyuhai.top/)，那你可以试一试这个插件。



## 安装（Install）

```bash
npm i vuepress-plugin-auto-sidebar -D
```



## 使用（Usage）

> **注意，请勿将 plugins 放在 themeConfig 中**，如何[使用插件](https://vuepress.vuejs.org/zh/plugin/using-a-plugin.html)。

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {}
  }
}
```

:book: **更详细的文档见 [vuepress 自动生成侧边栏](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar)。**



### 1. 简单的导航栏

在新的版本中我们扩展了 `vuepress cli` 来帮助你快速生成简单的导航栏：

```bash
vuepress nav docs
```