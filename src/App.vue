<template>
  <router-view />
</template>

<script lang="ts" setup>
import { provide, ref, watch } from 'vue'
import axios, { AxiosResponse } from 'axios'

const defaultSettings: Settings = {
  assetsRoot: 'https://fastly.jsdelivr.net/gh/b1acksoil/bsblog-assets'
}

// 合并本地设置与默认设置，并保存至 Local Storage
const settings = ref<Settings>(Object.assign(
  defaultSettings,
  JSON.parse(localStorage.getItem('settings')!)
))
localStorage.setItem('settings', JSON.stringify(settings.value))

// 监听设置更改，改变时保存至 Local Storage
watch(settings, (val) => {
  localStorage.setItem('settings', JSON.stringify(val))
}, {
  deep: true
})

// 获取资源索引文件
const assetsIndex = ref<AssetsIndex>({
  articles: []
})
axios({
  method: 'GET',
  baseURL: settings.value.assetsRoot,
  url: '/index.json',
  headers: {
    'Accept': 'application/json',
  }
}).then((resp: AxiosResponse<AssetsIndex>) => {
  resp.data.articles.sort((a, b) => b.create - a.create)
  assetsIndex.value = resp.data
})

// 向子组件传值
provide('settings', settings)
provide('assetsIndex', assetsIndex)
provide('curArticle', null)
</script>

<style lang="scss">
@import "@/assets/style/global.scss";
</style>
