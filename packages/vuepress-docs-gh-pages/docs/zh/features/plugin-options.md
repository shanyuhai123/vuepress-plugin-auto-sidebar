---
title: 插件的可选项
---

## 概览

该插件提供了以下可选项，并列出了默认值：

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      sort: {
        mode: "asc",
        readmeFirst: true,
      },
      title: {
        mode: "titlecase",
        map: {}
      },
      sidebarDepth: 1,
      collapse: {
        open: false,
        collapseList: [],
        uncollapseList: []
      },
      ignore: []
    }
  }
}
```



## sort（排序）

### 1. 内置的规则

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      sort: {
        // 更多选项: 
        // `asc`、`desc`、`created_time_asc`、`created_time_desc`
        mode: "asc"
      }
    }
  }
}
```

在使用 `created_time_asc` 和 `created_time_desc` 必须使用 [git](https://git-scm.com/) 跟踪文件。

### 2. 自定义规则

当内置的规则不满足你的需求时，你可以自定义排序规则：

```js
// 示例：根据文件名的最后一个字符进行排序
// 假设文件有 `filez-1`、`filed-3` 和 `filea-1`

const sortFn = (a, b) => {
  const lastA = a.filename.split("-")[1]
  const lastB = b.filename.split("-")[1]
  
  return lastA > lastB ? 1 : -1
}

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

如果想要根据文件的更多属性进行排序，你可以查看 [vuepress-types](https://github.com/vuepress/vuepress-community/blob/main/packages/vuepress-types/types/page.d.ts#L14)。

### 3. 更精准的排序

在以上的规则下，你还想指定其他文件在当前文件之前可以在 markdown 文件中添加 [autoPrev 或 autoNext](/zh/features/markdown-file-config.html#autoprev-autonext)。



## title（标题）

我们经常会使用短横线命名文件，而作为标题它就显得有些糟糕了。

### 1. 模式

使用方式：

```js
module.exports = {
	plugins: {
    "vuepress-plugin-auto-sidebar": {
      title: {
        // 更多选项: 
        // `default`、`lowercase`、`uppercase`、`capitalize`、`camelcase`、`kebabcase`、`titlecase`
        mode: "titlecase"
      }
    }
  }
}
```

假设 docs 目录如下：

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

And you choose the `titlecase`,you will get:

```
exampleSubMenu1-a => Example Sub Menu1 A
exampleSubMenu1-b => Example Sub Menu1 B
exampleSubMenu1-c => Example Sub Menu1 C
exampleMenu2 => Example Menu2
```

### 2. 映射

指定文件夹映射优先级更高，即会覆盖 `mode`。

```js
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

```
exampleSubMenu1-a => 🎉 Hello Vuepress 🎉
exampleSubMenu1-b => Example Sub Menu1 B
exampleSubMenu1-c => 🎉 Auto Sidebar 🎉
exampleMenu2 => Example Menu2
```



## sidebarDepth（标题深度）

默认情况下，侧边栏会自动地显示由当前页面的标题（headers）组成的链接，并按照页面本身的结构进行嵌套，你可以通过 `sidebarDepth` 来修改它的行为。默认的深度是 `1`，它将提取到 `h2` 的标题，设置成 `0` 将会禁用标题（headers）链接，同时，最大的深度为 `2`，它将同时提取 `h2` 和 `h3` 标题。

```js
module.exports = {
  plugins: [
    "vuepress-plugin-auto-sidebar": {
      sidebarDepth: 1,
    }
  ]
}
```

如果你想要修改指定文件的标题显示，可以修改文件内 [sidebarDepth](/zh/features/markdown-file-config.html#sidebardepth)。



## collapse（折叠）

当有大量的 markdown 文件时，侧边栏也会随之臃肿，将它们折叠起来不失为一个好的选择：

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      collapse: {
        open: true
      }
    }
  },
}
```

但更多的场景是仅仅某一个分类下笔记众多，可针对这一部分进行折叠：

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      collapse: {
        collapseList: [
          "/demo/large-files/"
        ]
      }
    }
  }
}
```

而 `uncollapseList` 的使用场景则与之相反：

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      collapse: {
        open: true,
        uncollapseList: [
          "/demo/few-files/"
        ]
      }
    }
  },
}
```



## ignore（忽略）

如果你有部分文件想要从侧边栏中隐藏，删掉文件又不肯能：

```js
module.exports = {
  plugins: [
    "vuepress-plugin-auto-sidebar": {
      ignore: [
        // 例子：
        // 忽略 `/menu3/menu3-3/` 目录下以 `ignore-` 开头的文件
        {
          menu: "/menu3/menu3-3/",
          regex: "ignore-*"
        }
      ]
    }
  ]
}
```

如果你想隐藏单个文件，那么可在文件中添加 [autoIgnore](/zh/features/markdown-file-config.html#autoignore)。



## nav（导航栏）

为了简化你第一次搬迁博客、笔记的成本，它仅仅提供了一个简单的生成导航栏的方式。

1. 添加脚本到 `package.json` 中

   ```json
   {
     "scripts": {
       "docs:nav": "vuepress nav docs"
     }
   }
   ```
   
2. 执行命令

   ```bash
   npm run docs:nav
   ```
   
   它将会在 `.vuepress` 文件夹下生成 `nav.js` 文件。
   
3. 引入生成的 nav 文件

   ```js
   const nav = require("./nav.js");
   
   module.exports = {
     plugins: {
       "vuepress-plugin-auto-sidebar": {}
     },
     themeConfig: {
       nav
     }
   }
   ```



