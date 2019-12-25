# Vuepress Plugin Auto Sidebar

## 介绍（Introduction）

这是为 vuepress 自动生成侧边栏的插件。



### 1. 注意事项

若想要使用该插件，需要固定 docs 下路径（虽然在计划适配更多的情况，也添加了 `mode` 参数用于后期扩展，但在近两个月暂无计划）。 



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
  // 配置 sidebar（）
  themeConfig: {
  	sidebar: require('./sidebar.js'), // 这是默认情况，当然你也可以自定义路径和文件名。（This is the default, of course you can also customize the path and filename.）
  }
}
```



## 可选项（Optional）

| 属性名称（key） | 类型（type） | 预设值（default） | 说明（description）              |
| :-------------- | :----------: | :---------------: | :------------------------------- |
| mode            |    String    |      default      | 可选的模式，当前仅支持 default。 |
| dest            |    String    |     .vuepress     | 输出 sidebar 的路径。            |
| filename        |    String    |      sidebar      | 输出 sidebar 的文件名。          |

