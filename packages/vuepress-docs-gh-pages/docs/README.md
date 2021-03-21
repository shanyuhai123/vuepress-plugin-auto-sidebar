---
title: 快速了解
sidebar: auto
---

## 介绍（Introduction）

**vuepress-plugin-auto-sidebar** 是用于为 vuepress 自动~~生成侧边栏~~[分组](/questions.html#_1-它的作用是生成侧边栏吗？)的插件。

如果你只是写一个简单介绍页，那没必要使用它，但如果你希望用 vuepress 记录很多的东西，例如：[飞跃高山与大洋的鱼的笔记](https://docs.shanyuhai.top/)，那你可以试一试这个插件。



## 安装（Installation）

```bash
npm i vuepress-plugin-auto-sidebar -D
```



## 使用（Usage）

最简单的使用，无需配置 `themeConfig`：

```js
// **/.vuepress/config.js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {}
  }
}
```

::: danger 注意
**注意请勿将 `plugins` 放在 `themeConfig` 中**，关于[如何使用插件](https://vuepress.vuejs.org/zh/plugin/using-a-plugin.html)。
:::