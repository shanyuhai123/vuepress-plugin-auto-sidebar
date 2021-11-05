---
title: Plugin Options
---

## Overview

The plugin provides the following options and lists the default values:

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

## sort

### 1. built-in rules

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      sort: {
        // more options: 
        // `asc`、`desc`、`created_time_asc`、`created_time_desc`
        mode: "asc"
      }
    }
  }
}
```

Before using the `created_time_asc`、`created_time_desc` options，you should use [git](https://git-scm.com/) to track your file.

### 2. custom rules

When the built-in rules do not meet your needs, you can use the `custom` mode:

```js
// example: sort according to the last character of the filename
// the filename are `filez-1`、`filed-3` and `filea-1`

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

If you want to sort according to other attributes of the file,you can visit [vuepress-types](https://github.com/vuepress/vuepress-community/blob/main/packages/vuepress-types/types/page.d.ts#L14).

### 3. precise sort

Above the sort rules, you also want `some-filename` sort before or after `other-filename`，you can use the [autoPrev/autoNext](/features/markdown-file-config.html#autoprev-autonext) in the markdown file.

### 4. value sort（v2.3.0）

More friendly than [built-in rules](/features/plugin-options.html#_1-built-in-rules) and simpler than [precise sort](/features/plugin-options.html#_3-precise-sort), you can use [autoSort](/features/markdown-file-config.html#autosort) in the markdown file.

## title

We always use `kebabcase` for the filename, but `titlecase` is more friendly to display on the page.

### 1. built-in mode

```js
module.exports = {
 plugins: {
    "vuepress-plugin-auto-sidebar": {
      title: {
        // more options: 
        // `default`、`lowercase`、`uppercase`、`capitalize`、`camelcase`、`kebabcase`、`titlecase`
        mode: "titlecase"
      }
    }
  }
}
```

If your docs folder as follows:

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

```text
exampleSubMenu1-a => Example Sub Menu1 A
exampleSubMenu1-b => Example Sub Menu1 B
exampleSubMenu1-c => Example Sub Menu1 C
exampleMenu2 => Example Menu2
```

### 2. path map

On the basis of `titlecase` mode, use the map:

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

And you will get:

```text
exampleSubMenu1-a => 🎉 Hello Vuepress 🎉
exampleSubMenu1-b => Example Sub Menu1 B
exampleSubMenu1-c => 🎉 Auto Sidebar 🎉
exampleMenu2 => Example Menu2
```

## sidebarDepth

The default depth is `1`, which extracts the `h2` headers. Setting it to `0` disables the header links, and the max value is `2` which extracts both `h2` and `h3` headers.

```js
module.exports = {
  plugins: [
    "vuepress-plugin-auto-sidebar": {
      sidebarDepth: 1,
    }
  ]
}
```

If you want override for the specified markdown file, you can also use the [sidebarDepth](/features/markdown-file-config.html#sidebardepth).

## collapse

When you have a lot of markdown files, the sidebar will also become bloated, `collapse` may help you to solve the problem.

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

But more often, only some folders will have many files, so you can just fold this part.

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

 The usage scenario of `uncollapseList` is the opposite.

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

## ignore

If you do not want part of markdown files display on the sidebar:

```js
module.exports = {
  plugins: [
    "vuepress-plugin-auto-sidebar": {
      ignore: [
        // example:
        // ignore files starting with `ignore-` in the `/menu3/menu 3-3/` directory
        {
          menu: "/menu3/menu3-3/",
          regex: "ignore-*"
        }
      ]
    }
  ]
}
```

If you just ignore some file, you can use the [autoIgnore](/features/markdown-file-config.html#autoignore) in the markdown file.

## nav

This plugin also provides a way to generate nav.

1. add the script to the `package.json`

   ```json
   {
     "scripts": {
       "docs:nav": "vuepress nav docs"
     }
   }
   ```

2. execute command

   ```bash
   npm run docs:nav
   ```

   It will create a `nav.js` in your `.vuepress` folder.

3. require nav file

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
