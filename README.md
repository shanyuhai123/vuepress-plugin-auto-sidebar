# Vuepress Plugin Auto Sidebar

## 介绍（Introduction）

这是为 vuepress 自动生成侧边栏的插件，录了个简单的说明 :tv: [视频](https://www.bilibili.com/video/av80763432/)。



### 1. 注意事项（Danger）

若想要使用该插件，需要固定 docs 下路径。

1. 正确的示例：

   ```bash
   docs
   ├── exampleMenu1 # 两层目录（最大支持两层）
   │   ├── exampleSubMenu1-1
   │   │   └── file1.md
   │   ├── exampleSubMenu1-2
   │   │   └── file1.md
   │   └── exampleSubMenu1-2
   │       ├── file1.md
   │       ├── file2.md
   │       └── file3.md
   ├── exampleMenu2 # 单层目录
   │   ├── file1.md
   │   └── README.md
   ```

2. 错误的示例：

   ```bash
   docs
   ├── os # 两层目录下混合文件
   │   ├── exampleSubMenu1-1
   │   │   └── file1.md
   │   ├── exampleSubMenu1-2
   │   │   └── ignoreSubMenu1-2-1 # 超过两级的将会被忽略
   │   │       └── file1.md
   │   └── exampleSubMenu1-2
   │   │   ├── file1.md
   │   │   ├── file2.md
   │   │   └── file3.md
   │   └── ignoreFile.md # 它将会被忽略
   ```



> 虽然在计划适配更多的情况，也添加了 `mode` 参数用于后期扩展，但在近两个月暂无计划。 

### 2. 在线示例

+ [飞跃高山与大洋的鱼的笔记](https://docs.shanyuhai.top/)。





## 安装（Install）

```bash
npm i vuepress-plugin-auto-sidebar -D
```





## 使用（Usage）

```js
// 修改 docs/.vuepress/config.js

module.exports = {
  // 引入插件（import plugins）
  plugins: [
    // 更多方式可参考（more use methods can refer to the documentation）:
    // https://v1.vuepress.vuejs.org/zh/plugin/using-a-plugin.html
    "vuepress-plugin-auto-sidebar": {} // 可参考下方的 “可选项”
  ],
  themeConfig: {
  	// 无需配置 sidebar（no need to configure sidebar）
  }
}
```





## 可选项（Optional）

| 属性名称（key） | 类型（type） | 预设值（default） | 说明（description）                                          |
| :-------------- | :----------: | :---------------: | :----------------------------------------------------------- |
| mode            |    String    |      default      | 可选的模式，当前仅支持 default。                             |
| sort            |    String    |        asc        | 排序，`asc` 为升序，其他如 `desc` 为降序。                   |
| titleMode       |    String    |      default      | 标题（分组）模式，可选参数为 `default`、`lowercase`、`uppercase`、`capitalize`、`camelcase`、`kebabcase`、`titlecase`。 |
| titleMap        |    Object    |                   | 标题映射，可与 `titleMode` 参数同时使用，且其优先度更高。    |

### 1. titleMode 说明

示例目录（Demo directory）：

```bash
docs
├── exampleMenu1
│   ├── exampleSubMenu1-a
│   │   └── file1.md
│   ├── exampleSubMenu1-b
│   │   └── file1.md
│   └── exampleSubMenu1-c
│       ├── file1.md
│       ├── file2.md
│       └── file3.md
├── exampleMenu2
│   ├── file1.md
│   └── README.md
```

分别得到的分组标题结果：

1. `default` ：

   ```bash
   exampleSubMenu1-a # exampleSubMenu1-a
   exampleSubMenu1-b # exampleSubMenu1-b
   exampleSubMenu1-c # exampleSubMenu1-c
   exampleMenu2 # exampleMenu2
   ```

2. `uppercase`：

   ```bash
   exampleSubMenu1-a # EXAMPLESUBMENU1-A
   exampleSubMenu1-b # EXAMPLESUBMENU1-B
   exampleSubMenu1-c # EXAMPLESUBMENU1-C
   exampleMenu2 # EXAMPLEMENU2
   ```

3. `camelcase`：

   ```bash
   exampleSubMenu1-a # exampleSubMenu1A
   exampleSubMenu1-b # exampleSubMenu1B
   exampleSubMenu1-c # exampleSubMenu1C
   exampleMenu2 # exampleMenu2
   ```

4. `titlecase`：

   ```bash
   exampleSubMenu1-a # Example Sub Menu1 A
   exampleSubMenu1-b # Example Sub Menu1 B
   exampleSubMenu1-c # Example Sub Menu1 C
   exampleMenu2 # Example Menu2
   ```

### 2. titleMap 说明

同样使用上述示例，配置 plugins：

```js
module.exports = {
  plugins: [
    "vuepress-plugin-auto-sidebar": {
    	titleMap： {
    		"exampleSubMenu1-a": "🎉 Hello Vuepress 🎉",
    		"exampleSubMenu1-c": "🎉 Auto Sidebar 🎉"
    	}
    }
  ],
}
```

得到结果：

```bash
exampleSubMenu1-a # 🎉 Hello Vuepress 🎉
exampleSubMenu1-b # exampleSubMenu1-b
exampleSubMenu1-c # 🎉 Auto Sidebar 🎉
exampleMenu2 # exampleMenu2
```





## 提问（Questions）

### 1. 为什么只支持两级目录，后期考虑增加吗？

在写的时候认为两级目录已经完全够用于分类，后期考虑增加。

### 2. 为什么二级目录时，文件和目录不能在同一层级。

因为在设计上认为顶部导航栏是用于查看不同分类的，而侧边导航栏是查看该分类下具有哪些文件的。

而在使用上述的布局时，同一层级的文件尚无更好的展示方式。