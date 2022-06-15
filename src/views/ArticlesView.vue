<template>
  <ViewLayout>
    <transition name="slide-fade" mode="out-in">
      <div class="article-main" v-if="$route.params.id">
        <div class="article-meta">
          <h1>{{ articleMeta.title }}</h1>
          <div>
            <span>
              <fa-icon :icon="['fas', 'clock']" />
              {{ new Date(articleMeta.create).toLocaleString() }}
            </span>
            <span>
              <fa-icon :icon="['fas', 'archive']" />
              {{ articleMeta.categories.join(', ') }}
            </span>
            <span>
              <fa-icon :icon="['fas', 'tag']" />
              {{ articleMeta.tags.join(', ') }}
            </span>
          </div>
        </div>

        <hr>

        <div class="article-content markdown" v-html="articleContent" />

        <hr>

        <div class="license-info">
          版权声明：本博客所有文章均采用
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>
          许可协议发布。转载请注明来自 <a href="/home">bsBlog</a>。
          <br>
          文章链接：<a :href="$route.path">https://blacksoil.top{{ $route.path }}</a>
        </div>
      </div>

      <div class="article-list" v-else>
        <h1 class="page-title">文章列表</h1>
        <ArticleCard
          v-for="article in assetsIndex.articles"
          :id="article.id"
          :title="article.title"
          :create="new Date(article.create).toLocaleString()"
          :categories="article.categories"
          :tags="article.tags"
        />
      </div>
    </transition>
  </ViewLayout>
</template>

<script setup lang="ts">
import { ref, inject, watch, Ref } from 'vue'
import { useRoute } from 'vue-router'
import axios, { AxiosResponse } from 'axios'
import YAML from 'yaml'
import MarkdownIt from 'markdown-it'
import miFrontMatter from 'markdown-it-front-matter'
import hljs from 'highlight.js'
import ViewLayout from '@/layouts/ViewLayout.vue'
import ArticleCard from '@/components/ArticleCard.vue'

const articleContent = ref('Loading...')
const articleMeta = ref<Article>({
  title: 'Loading...',
  id: '',
  create: 0,
  categories: [],
  tags: [],
  description: ''
})

const route = useRoute()
const md = new MarkdownIt({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch {}
    }
    return ''
  }
}).use(miFrontMatter, (fm) => {
  const meta = YAML.parse(fm)
  document.title = meta.title + ' - bsBlog'
  articleMeta.value = meta
})

const assetsIndex = inject<AssetsIndex>('assetsIndex')!
const settings = inject<Ref<Settings>>('settings')!

watch(() => route.params.id, (val) => {
  if (val)
    axios({
      method: 'GET',
      baseURL: settings.value.assetsRoot,
      url: `/${val}/index.md`
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
          .replaceAll('src="./', `src="${settings.value.assetsRoot}/${val}/`)
        
        const imgAltArr = str.match(/(?<=<img .* alt=").*(?=")/gi)
        if (imgAltArr)
          for (let alt of imgAltArr) {
            str = str.replace(`alt="${alt}">`, `alt="${alt}"><p class="img-desc">${alt}</p>`)
          }

        articleContent.value = str
    })
  else
    articleContent.value = 'Loading...'
    articleMeta.value = {
      title: 'Loading...',
      id: '',
      create: 0,
      categories: [],
      tags: [],
      description: ''
    }
}, { deep: true, immediate: true })
</script>

<style lang="scss">
@import "@/assets/style/markdown.scss";
@import "@/assets/style/transitions.scss";
@import "highlight.js/scss/atom-one-dark.scss";

.article-main {
  hr {
    width: 90%;
    margin: 30px 0;
    border: 1px solid #444;
  }

  .article-meta {
    text-align: center;

    h1 {
      font-size: 1.5rem;
    }

    span {
      font-size: 0.9em;
      color: #ccc;
      margin: 10px;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .article-content {
    width: 76vw;
    max-width: 1200px;

    img {
      display: block;
      margin: 0 auto;
      max-width: 70vw;
      max-height: 600px;
    }
  }

  .license-info {
    padding: 10px;
    background-color: $color-dark-2;
    width: 76vw;
    border-radius: 4px;
    box-sizing: border-box;
    line-height: 1.7em;
  }
}

.article-list, .article-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.article-card {
  margin: 6px 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

@media screen and (max-width: 768px) {
  .article-content {
    width: 100% !important;
  }

  .license-info {
    width: 100% !important;
  }
}
</style>