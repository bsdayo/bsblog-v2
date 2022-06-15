<template>
  <div id="sidebar" :class="{ 'sidebar-open': open }">
    <div class="sidebar-buttons-top">
      <ui-button
        v-for="item in sidebarMenu.top"
        :name="item.name"
        :to="item.to"
        :icon="item.icon"
        @click="open = false"
        nav />
    </div>
    <div class="sidebar-buttons-bottom">
      <ui-button
        v-for="item in sidebarMenu.bottom"
        :name="item.name"
        :to="item.to"
        :icon="item.icon"
        @click="open = false"
        nav />
    </div>
  </div>
</template>

<script setup lang="ts">
import UiButton from '@/components/ui/Button.vue'
import { ref, watch } from 'vue'

const open = ref(false)

const props = defineProps<{
  open: boolean
}>()

watch(props, (val) => open.value = val.open)

const sidebarMenu = {
  top: [
    { name: '主页', to: '/home', icon: 'home' },
    { name: '文章', to: '/articles', icon: 'book' },
    { name: '关于', to: '/about', icon: 'heart' },
  ],
  bottom: [
    { name: '设置', to: '/settings', icon: 'gear' },
  ]
}
</script>

<style lang="scss">
#sidebar {
  position: fixed;
  top: 52px;
  left: 0;
  width: 50px;
  height: calc(100vh - 52px);
  background-color: $color-dark-5;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  box-sizing: border-box;
  padding: 4px;
  z-index: 2000;

  transition: width 200ms, padding 200ms;

  .nav-button {
    margin: 4px 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }

    svg {
      min-width: 16px;
    }
  }
}

@media screen and (min-width: 768px) {
  #sidebar:hover {
    width: 256px;
  }
}

@media screen and (max-width: 768px) {
  #sidebar {
    width: 0;
    padding: 4px 0;

    &.sidebar-open {
      width: 256px;
      padding: 4px;
    }
  }
}
</style>