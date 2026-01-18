import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

import { ab_mdit, jsdom_init } from "markdown-it-any-block"
jsdom_init()

export default defineUserConfig({
  base: '/VuepressDemo/',
  lang: 'en-US',

  title: 'VuePress',
  description: 'My first VuePress Site',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: ['/', '/get-started'],
  }),

  bundler: viteBundler(),

  extendsMarkdown: (md) => {
    md.use(ab_mdit)
  },
})
