# README

详见: https://github.com/any-block/any-block

这里是上述仓库的markdown-it版本在vuepress上部署的项目demo

## 构建该demo项目

```typescript
$ pnpm install
$ pnpm docs:dev
```

## 从零创建该项目

1. 先搭建vuepress项目

```shell
# vuepress2
# https://vuepress.github.io/zh/guide/getting-started.html
$ pnpm create vuepress vuepress-starter # 后面引导大部分选择默认值就是了，除了blog/docs一项
english
pnpm
vite
docs # 非默认
my-vuepress-site
0.0.1
A VuePress project
MIT
n # 非默认
n
$ cd vuepress-starter
$ pnpm i
$ pnpm docs:dev
# $ pnpm add -D sass (中途报错让我手动安了个sass)
```

2. 添加示例内容 (方便查看是否成功)

```shell
$ echo -e "\n[list2table]\n\n- 1\n- 2\n  - 3\n  - 4\n" >> ./docs/README.md
```

3. 安装使用AnyBlock

就像使用普通的mdit插件那样使用

3.1. 安装依赖

```bash
$ pnpm install -D markdown-it-any-block@latest
```

3.2. 使用插件

在 vuepress 项目中的 `.vuepress/config.ts` 文件中，添加：

```typescript
import { ab_mdit, jsdom_init } from "markdown-it-any-block"
jsdom_init()

...

const userConfig: UserConfig = {
  extendsMarkdown: (md: markdownit) => {
    md.use(ab_mdit)
  }
}
```

3.3. 使用样式文件

> [!WARNING]
> 
> 注意，构建出来的只有对应的dom结构，而没有样式。因为纯markdown-it插件是不含样式的（除非用内联样式），自己引用一下就好
> 
> 例如vuepress中可以创建/修改 `src/.vuepress/styles/index.scss`
> 并添加: `@import '../../../node_modules/markdown-it-any-block/styles';`
> 
> 例如vitepress可以添加 [theme](https://github.com/any-block/VitePressDemo/blob/main/.vitepress/theme) 文件夹及里面的内容

4. 检查

```typescript
$ pnpm docs:dev
```
