# README

项目构建的全过程：

1. 项目创建

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

2. 修改文档内容

```shell
$ echo -e "\n[list2table]\n\n- 1\n- 2\n  - 3\n  - 4\n" >> ./docs/README.md
```

3. 安装AnyBlock

```bash
$ pnpm install -D jsdom
$ pnpm install -D any-block-converter-markdown-it@3.1.3-beta11 # 不能低于这个版本，否则不可用
```

在 vuepress 项目中的 `.vuepress/config.ts` 文件中，添加：

```typescript
import ab_mdit from "any-block-converter-markdown-it" // +

// + 这里需要自 pnpm install jsdom，不知道为什么这部分不能在模块里依赖，会有bug......
import jsdom from "jsdom"
const { JSDOM } = jsdom
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
  url: 'http://localhost/', // @warn 若缺少该行，则在mdit+build环境下，编译报错
});
// @ts-ignore 不能将类型“DOMWindow”分配给类型“Window & typeof globalThis”
global.window = dom.window
global.history = dom.window.history // @warn 若缺少该行，则在mdit+build环境下，编译报错：ReferenceError: history is not defined
global.document = dom.window.document
global.NodeList = dom.window.NodeList
global.HTMLElement = dom.window.HTMLElement
global.HTMLDivElement = dom.window.HTMLDivElement
global.HTMLPreElement = dom.window.HTMLPreElement
global.HTMLQuoteElement = dom.window.HTMLQuoteElement
global.HTMLTableElement = dom.window.HTMLTableElement
global.HTMLUListElement = dom.window.HTMLUListElement
global.HTMLScriptElement = dom.window.HTMLScriptElement
dom.window.scrollTo = ()=>{} // @warn 若缺少该行，编译警告：Error: Not implemented: window.scrollTo*/

export default defineUserConfig({
  extendsMarkdown: (md: markdownit) => { // + 就像使用普通的mdit插件那样使用
    md.use(ab_mdit)                      // +
  }                                      // +
})
```

4. 检查

```typescript
$ pnpm dcos:dev
```

> [!warning]
> 
> 注意，构建出来的只有对应的dom结构，而没有样式。因为纯markdown-it插件是不含样式的（除非用内联样式），自己引用一下就好
> 
> 对应的样式位置：`./node_modules/any-block-converter-markdown-it/src/style/styles.scss`
