---
title: 插件的可选项
---

## Overview

该插件提供了以下可选项，更详细的解释看下方：

```js
module.exports = {
  plugins: {
    // 插件
    "vuepress-plugin-auto-sidebar": {
      // 排序
      sort: {
        // 排序模式，默认为 `asc`
        // 'asc' // 升序
        // 'desc' // 降序
        // 'custom' // 自定义
        mode: "asc",
        // 当排序模式为 custom 时需指定 fn
        fn: () => {},
        // 将 README.md 文件提到前面，默认为 true
        readmeFirst: true,
      },
      // 标题
      title: {
        // 标题模式，默认为 default
        // 可选 `default`、`lowercase`、`uppercase`、`capitalize`、`camelcase`、`kebabcase`、`titlecase`
        mode: "titlecase",
        // 指定文件夹映射，例如
        map: {
          "/menu1/menu1-2/": "我是标题",
          "/menu2/menu2-2/": "我是分组标题"
        }
      },
      // 标题深度
      sidebarDepth: 1,
      // 折叠
      collapse: {
        // 折叠还是打开，默认为打开
        open: true,
        // 选择要折叠的目录，例如
        collapseList: ["/menu1/menu1-2/"],
        // 选择要打开的目录，例如
        uncollapseList: ["/menu1/menu1-3/"]
      },
      // 忽略，例如
      ignore: [
        {
          // 指定路径
          menu: "/menu3/menu3-3/",
          // 对该路径下使用的正则，默认为 `.*`
          // 例如你想忽略以 `ignore-` 开头的文件
          regex: "ignore-*"
        }
      ]
    }
  }
}
```



## sort

很多时候一些博客或笔记阅读起来是有先后顺序的，而利用在文件名前追加 `01-`、`10-` 来排序方式总会让人难以接受。

### 1. 内置的规则

内置了针对 ASCII 的 `asc` 和 `desc` 规则。

### 2. 自定义规则

当内置的规则不满足你的需求时你可以自定义根据文件名的排序规则，在 [AutoSidebarPage](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar/blob/master/packages/vuepress-plugin-auto-sidebar/src/types/index.ts#L15) 可找到更多字段：

```js
// 示例：根据文件名的最后一个字符进行排序

const sortFn = (a, b) => a.filename.split("-")[1][length - 1] > b.filename.split("-")[1][length - 1] ? 1 : -1;

module.exports = {
	plugins: {
    "vuepress-plugin-auto-sidebar": {
      sort: {
				mode: 'custom',
        fn: sortFn
      },
    }
  },
}
```

### 3. 更精准的排序

更精准的排序需要在文件中添加 [autoPrev 或 autoNext](/features/markdown-file-config.html#精准排序)。



## title

默认的标题是对应文件夹的名称，过去习惯命名文件夹一般是小驼峰，而作为标题它就显得有些糟糕了。

### 1. 七种英文映射模式

使用方式：

```js
module.exports = {
	plugins: {
    "vuepress-plugin-auto-sidebar": {
      title: {
				mode: "titlecase" // 可选 `default`、`lowercase`、`uppercase`、`capitalize`、`camelcase`、`kebabcase`、`titlecase`
			},
    }
  },
}
```

示例目录：

```bash
docs
├── exampleMenu1
│   ├── exampleSubMenu1-a
│   │   └── file1.md
│   ├── exampleSubMenu1-b
│   │   └── file1.md
│   └── exampleSubMenu1-c
│       ├── file1.md
│       ├── file2.md
│       └── file3.md
├── exampleMenu2
│   ├── file1.md
│   └── README.md
```

不同的映射结果：

1. `default` ：

   ```
   exampleSubMenu1-a # exampleSubMenu1-a
   exampleSubMenu1-b # exampleSubMenu1-b
   exampleSubMenu1-c # exampleSubMenu1-c
   exampleMenu2 # exampleMenu2
   ```

2. `uppercase`：

   ```
   exampleSubMenu1-a # EXAMPLESUBMENU1-A
   exampleSubMenu1-b # EXAMPLESUBMENU1-B
   exampleSubMenu1-c # EXAMPLESUBMENU1-C
   exampleMenu2 # EXAMPLEMENU2
   ```

3. `camelcase`：

   ```
   exampleSubMenu1-a # exampleSubMenu1A
   exampleSubMenu1-b # exampleSubMenu1B
   exampleSubMenu1-c # exampleSubMenu1C
   exampleMenu2 # exampleMenu2
   ```

4. `titlecase`：

   ```
   exampleSubMenu1-a # Example Sub Menu1 A
   exampleSubMenu1-b # Example Sub Menu1 B
   exampleSubMenu1-c # Example Sub Menu1 C
   exampleMenu2 # Example Menu2
   ```

### 2. 指定文件夹映射

指定文件夹映射优先级更高，即会覆盖 `titleMode`。

```js
// 配置 config
module.exports = {
  plugins: [
    "vuepress-plugin-auto-sidebar": {
    	title: {
    		mode: "titlecase",
        map: {
    			"/exampleMenu1/exampleSubMenu1-a/": "🎉 Hello Vuepress 🎉",
    			"/exampleMenu1/exampleSubMenu1-c/": "🎉 Auto Sidebar 🎉"
    		}
    	}
    }
  ],
}
```

结果：

```bash
exampleSubMenu1-a # 🎉 Hello Vuepress 🎉
exampleSubMenu1-b # Example Sub Menu1 B
exampleSubMenu1-c # 🎉 Auto Sidebar 🎉
exampleMenu2 # Example Menu2
```



## nav

为了简化你第一次搬迁博客、笔记的成本，它仅仅提供了一个简单的生成导航栏的方式。

它的操作需要分为两步：

1. 生成导航栏文件

   通过命令行来生成配置文件
   
   ```bash
   # vuepress nav [targetDir]
   vuepress nav docs
   ```
   
2. 引入导航栏文件

   ```js
   const nav = require("./nav.js"); // 引入刚刚生成的文件
   
   module.exports = {
     plugins: {
       "vuepress-plugin-auto-sidebar": {}
     },
     themeConfig: {
       nav // ES6 简写
     },
   }
   ```

如前言所说，只是帮助你第一次迁移大量内容时使用，所以当已存在 `.vuepress/nav.js` 时将不会重复生成覆盖之前的，一般推荐你自己配置更[个性化](https://v1.vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%AF%BC%E8%88%AA%E6%A0%8F)的导航栏及外链。



## sidebarDepth

该可选项可配置全局的 `depth`，如果你希望配置某个文件的 `depth` 修改文件内的 [sidebarDepth](https://v1.vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%B5%8C%E5%A5%97%E7%9A%84%E6%A0%87%E9%A2%98%E9%93%BE%E6%8E%A5) 即可。



## collapsable

作为一个博客、笔记虽然希望能够快速找到对应的内容（即默认 `collapsable` 为 false ），但也支持开启它：

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      collapse: {
        open: false
      }
    }
  },
}
```

但更多的场景是仅仅某一个分类下笔记众多，不折叠起来反而带来更糟糕的体验，可针对几个路由进行设置：

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      collapse: {
        collapseList: [
          "/demo/more/"
        ]
      }
    }
  },
}
```

`uncollapseList` 的使用类似。