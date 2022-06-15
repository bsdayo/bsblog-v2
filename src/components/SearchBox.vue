<template>
  <div class="searchbox">
    <ui-input
      v-model="searchValue"
      @blur="listOpen = false"
      @input="suggest()"
      placeholder="搜索文章...&emsp;(#标签 搜索标签，$分类 搜索分类)"
    />

    <div
      class="searchbox-list"
      ref="searchbox"
      :class="{ 'searchbox-list-open': listOpen, 'searchbox-list-hasitem': searchSuggests.length > 0 }"
      :style="{
        height:
          listOpen
            ? searchSuggests.length > 0
              ? searchSuggests.length * 44 - 4 + 'px'
              : '48px'
            : 0,
      }"
    >
      <ui-button
        v-for="s in searchSuggests"
        @click="searchbox?.focus()"
        :to="`/articles/${s.id}`"
      >{{ s.title }}</ui-button>
      <p v-if="listOpen && searchSuggests.length === 0 && searchValue !== ''">
        搜索无结果。
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, Ref } from 'vue'
import UiInput from '@/components/ui/Input.vue'
import UiButton from '@/components/ui/Button.vue'

const searchValue = ref('')
const searchSuggests = ref<Article[]>([])

const searchbox = ref<HTMLElement | null>(null)
const listOpen = ref(false)

const assetsIndex: Ref<AssetsIndex> = inject('assetsIndex')!

// 搜索建议
function suggest() {
  const tempArr: Article[] = []
  if (searchValue.value !== '') {
    listOpen.value = true
    const keywords = searchValue.value.trim().split(' ')
    const tags: string[] = []
    const categories: string[] = []

    for (let kw of keywords) {
      if (kw === '') continue

      // 标签搜索
      if (kw.startsWith('#')) {
        const tag = kw.substring(1).toLowerCase()
        if (tag === '') continue
        tempArr.push(...assetsIndex.value.articles.filter((a) => a.tags.includes(tag)))
        tags.push(tag)
        continue
      }
      
      // 分类搜索
      if (kw.startsWith('$')) {
        const category = kw.substring(1).toLowerCase()
        if (category === '') continue
        tempArr.push(...assetsIndex.value.articles.filter((a) => a.categories.includes(category)))
        categories.push(category)
        continue
      }

      // 关键词搜索
      tempArr.push(
        ...assetsIndex.value.articles.filter(
          (a) => a.id.includes(kw.toLowerCase()) || a.title.toLowerCase().includes(kw.toLowerCase())
        ),
      )
    }
    
    // 去重 & 检查
    searchSuggests.value = [...new Set(tempArr)].filter((a) => {
      let kFlag = true
      for (let kw of keywords) {
        if (kw.startsWith('#') || kw.startsWith('$')) continue
        if (
          !a.id.includes(kw.toLowerCase()) &&
          !a.title.toLowerCase().includes(kw.toLowerCase())
        ) kFlag = false
      }
      return kFlag
    })
  } else listOpen.value = false
}
</script>

<style lang="scss">
.searchbox {
  height: 40px;
  width: 70%;
  max-width: 600px;
  position: relative;

  .input-box {
    height: 100%;
    width: 100%;

    input:focus {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .searchbox-list {
    color: #e6e6e6;
    width: calc(100% - 8px);
    position: absolute;
    top: 40px;
    left: -1px;
    background-color: $color-dark-4;
    z-index: 9999;
    overflow-y: hidden;
    padding: 0 4px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    transition-property: height padding;
    transition-duration: 0.2s;
    border: 1px solid $color-dark-5;

    &.searchbox-list-hasitem.searchbox-list-open {
      padding: 4px;
    }

    button {
      height: 40px;
      width: 100%;
      margin: 4px 0;
      background-color: $color-dark-3;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        background-color: $color-dark-2;
      }

      &:active {
        background-color: $color-dark-3;
      }
    }

    p {
      font-size: 0.9rem;
      margin-left: 1rem;
    }
  }
}

// .searchbox-list-item {
//   transition: transform 0.2s;
//   // display: block;
//   // margin-right: 10px;
// }

// // .searchbox-list-enter-from,
// // .searchbox-list-leave-to {
// //   opacity: 0;
// //   transform: translateY(30px);
// // }

// .searchbox-list-leave-active {
//   position: absolute;
// }
</style>