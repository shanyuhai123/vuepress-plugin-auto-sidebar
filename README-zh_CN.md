# Vuepress Plugin Auto Sidebar

[![Vuepress Plugin Auto Sidebar](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar/actions/workflows/deploy-docs.yml) ![npm](https://img.shields.io/npm/dt/vuepress-plugin-auto-sidebar)


[English](./README.md) | 简体中文



## 介绍（Introduction）

这是为 vuepress 自动生成侧边栏的插件。



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

:book: **更详细的文档见 [vuepress-plugin-auto-sidebar](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar)。**



### 1. 简单的导航栏

我们扩展了 `vuepress cli` 来帮助你快速生成简单的导航栏，[如何使用它](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/features/plugin-options.html#nav-%E5%AF%BC%E8%88%AA%E6%A0%8F)：

```bash
vuepress nav docs
```