<template>
  <ViewLayout>
    <h1 class="page-title">关于</h1>

    <div class="about-main">
      <div class="about-content markdown" v-html="content" />
    </div>
  </ViewLayout>
</template>

<script setup lang="ts">
import ViewLayout from '@/layouts/ViewLayout.vue'
import { inject, Ref, ref } from 'vue'
import axios, { AxiosResponse } from 'axios'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import miFrontMatter from 'markdown-it-front-matter'

const content = ref('Loading...')
const settings = inject<Ref<Settings>>('settings')!

const md = new MarkdownIt({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch {
      }
    }
    return ''
  },
}).use(miFrontMatter, (fm) => {
})

axios({
  method: 'GET',
  baseURL: settings.value.assetsRoot,
  url: `/about.md`,
}).then((resp: AxiosResponse<string>) => {
  let str =
    md.render(resp.data)
      // SEO 优化
      .replaceAll('<h4>', '<h5>')
      .replaceAll('<h3>', '<h4>')
      .replaceAll('<h2>', '<h3>')
      .replaceAll('<h1>', '<h2>')
      .replaceAll('</h4>', '</h5>')
      .replaceAll('</h3>', '</h4>')
      .replaceAll('</h2>', '</h3>')
      .replaceAll('</h1>', '</h2>')

      // 新窗口打开链接
      .replaceAll('<a href', '<a target="_blank" href')

      // 图片源替换
      .replaceAll('src="./', `src="${settings.value.assetsRoot}/`)

  content.value = str
})
</script>

<style lang="scss">
@import "@/assets/style/markdown.scss";

.about-main {
  display: flex;
  flex-direction: column;
  align-items: center;

  .about-content {
    width: 76vw;
    max-width: 1200px;

    img {
      max-width: 70vw;
      max-height: 600px;
    }
  }
}

@media screen and (max-width: 768px) {
  .about-content {
    width: 100% !important;
  }
}
</style>