# Vuepress Plugin Auto Sidebar

[![Build Status](https://travis-ci.com/shanyuhai123/vuepress-plugin-auto-sidebar.svg?branch=docs)](https://travis-ci.com/shanyuhai123/vuepress-plugin-auto-sidebar)

## 介绍（Introduction）

这是为 vuepress 自动~~生成侧边栏~~**分组**的插件。



## 安装（Install）

```bash
npm i vuepress-plugin-auto-sidebar -D
```



## 使用（Usage）

> **注意请勿将 plugins 放在 themeConfig 中**，如何[使用插件](https://vuepress.vuejs.org/zh/plugin/using-a-plugin.html)。

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {}
  }
}
```

:book: **更详细的文档见 [vuepress 自动生成侧边栏](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar)。**