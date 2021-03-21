# Vuepress Plugin Auto Sidebar

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

:book: **更详细的文档见 [vuepress 自动生成侧边栏](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar)。**



### 1. 简单的导航栏

在新的版本中我们扩展了 `vuepress cli` 来帮助你快速生成简单的导航栏：

```bash
vuepress nav docs
```