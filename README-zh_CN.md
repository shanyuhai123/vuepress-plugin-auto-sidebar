# Vuepress Plugin Auto Sidebar

[![Vuepress Plugin Auto Sidebar](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar/actions/workflows/deploy-docs.yml) ![npm](https://img.shields.io/npm/dt/vuepress-plugin-auto-sidebar) ![npm](https://img.shields.io/npm/v/vuepress-plugin-auto-sidebar)


[🇬🇧 English](./README.md) | 🇨🇳 简体中文



## 介绍（Introduction）

这是为 vuepress 自动生成侧边栏的插件。



## 安装（Install）

```bash
npm i vuepress-plugin-auto-sidebar -D

# v2 alpha(测试版，适用于 v2)
npm i vuepress-plugin-auto-sidebar@alpha -D
```



## 使用（Usage）

```js
// 在 .vuepress/config.js 中配置插件
module.exports = {
  plugins: [
    ["vuepress-plugin-auto-sidebar", {}]
  ]
}
```

:book: **更详细的文档见 [vuepress-plugin-auto-sidebar](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar)。**

### 1. 引入

> 令人遗憾的事。

在 [VuePress v1](https://v1.vuepress.vuejs.org/zh/) 中以上就可以快速帮你启用该插件了，但由于 [VuePress v2](https://v2.vuepress.vuejs.org/zh/) 尚未提供对应的能力，所以你需要自行引入生成的 `sidebar.js` 文件。

```js
const sidebarConf = require('./sidebar')

module.exports = {
  plugins: [
    ["vuepress-plugin-auto-sidebar", {}]
  ],
  themeConfig: {
    sidebar: sidebarConf
  }
}
```

### 2. 简单的导航栏

我们扩展了 `vuepress cli` 来帮助你快速生成简单的导航栏，[如何使用它](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/features/plugin-options.html#nav-%E5%AF%BC%E8%88%AA%E6%A0%8F)：

```bash
# v2 不支持
vuepress nav docs
```