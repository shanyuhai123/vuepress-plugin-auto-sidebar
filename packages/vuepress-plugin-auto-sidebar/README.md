# Vuepress Plugin Auto Sidebar

[![Vuepress Plugin Auto Sidebar](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar/actions/workflows/deploy-docs.yml)


English | [简体中文](./README-zh_CN.md)



## 介绍（Introduction）

This is a plugin that automatically generates a sidebar for vuepress.



## 安装（Install）

```bash
npm i vuepress-plugin-auto-sidebar -D
```



## 使用（Usage）

> **Attention, do not put plugins in the themeConfig**, [how to use plugins](https://vuepress.vuejs.org/plugin/using-a-plugin.html#using-a-plugin)。

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {}
  }
}
```

:book: **For more detailed documentation, you can visit [vuepress-plugin-auto-sidebar](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar)。**



### 1. Simple Navbar

We have extended `vuepress cli` to help you quickly generate a simple navigation bar, [how to use it](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/features/plugin-options.html#nav):

```bash
vuepress nav docs
```

