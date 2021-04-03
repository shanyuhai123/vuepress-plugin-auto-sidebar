---
title: Getting started
sidebar: auto
---

## Introduction

This is a plugin that automatically generates a sidebar for vuepress.

If you just write a simple page, just use the native [sidebar](https://vuepress.vuejs.org/theme/default-theme-config.html#sidebar) will be enough. But if you want to use vuepress to record a lot of things, such as: [飞跃高山与大洋的鱼的笔记](https://docs.shanyuhai.top/), then you can try the plugin.

> Due to my poor English, when you confused about the documentation, you can create an [issue](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar/issues).



## Install

```bash
npm i vuepress-plugin-auto-sidebar -D
```



## Usage

> **Attention, do not put `plugins` in the themeConfig**, [how to use plugins](https://vuepress.vuejs.org/plugin/using-a-plugin.html#using-a-plugin)。

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      // options
    }
  }
}
```

You can see more [plugin options](/features/plugin-options.html).



### 1. Simple Navbar

We have extended `vuepress cli` to help you quickly generate a simple navigation bar, [how to use it](/features/plugin-options.html#nav).

```bash
vuepress nav docs
```