# Vuepress Plugin Auto Sidebar

[![Vuepress Plugin Auto Sidebar](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar/actions/workflows/deploy-docs.yml) ![npm](https://img.shields.io/npm/dt/vuepress-plugin-auto-sidebar) ![npm](https://img.shields.io/npm/v/vuepress-plugin-auto-sidebar)


🇬🇧 English | [🇨🇳 简体中文](./README-zh_CN.md)



> 现在，它已经支持 VuePress V2 了。
>
> Now, it is support VuePress V2.

## 介绍（Introduction）

This is a plugin that automatically generates a sidebar for vuepress.



## 安装（Install）

```bash
npm i vuepress-plugin-auto-sidebar -D

# v2 alpha(测试版)
npm i vuepress-plugin-auto-sidebar@alpha -D
```



## 使用（Usage）

> **Attention, do not put plugins in the themeConfig**, [how to use plugins](https://vuepress.vuejs.org/plugin/using-a-plugin.html#using-a-plugin)。

```js
module.exports = {
  plugins: [
    ["vuepress-plugin-auto-sidebar", {}]
  ]
}
```

:book: **For more detailed documentation, you can visit [vuepress-plugin-auto-sidebar](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar)。**

### 1. Require

> 令人遗憾的事。

In [VuePress v1](https://v1.vuepress.vuejs.org/) the above can quickly help you enable the plugin, but since [VuePress v2](https://v2.vuepress.vuejs.org/) does not yet provide the corresponding capabilities, you need to introduce the generated `sidebar.js` file yourself.

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

### 2. Simple Navbar

We have extended `vuepress cli` to help you quickly generate a simple navigation bar, [how to use it](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/features/plugin-options.html#nav):

```bash
# v2 not support
vuepress nav docs
```

