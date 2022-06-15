<template>
  <div id="main-layout">
    <navbar @sidebar-open="(open: boolean) => { sidebarOpen = open }" />
    <sidebar :open="sidebarOpen" />

    <div id="page-content">
      <router-view v-slot="{ Component, route }">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import { ref } from 'vue'

const sidebarOpen = ref(false)
</script>

<style lang="scss" scoped>
@import "@/assets/style/transitions.scss";

#main-layout {
  position: relative;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: #202020;
  max-height: 100vh;
  overflow: hidden;

  #page-main {
    display: flex;
  }
}

#page-content {
  position: absolute;
  left: 50px;
  top: 52px;
  width: calc(100vw - 50px);
  height: calc(100vh - 52px);
  box-sizing: border-box;
  background-color: $color-dark-4;
  border-top-left-radius: 10px;
  // border-top-right-radius: 10px;
}

@media screen and (max-width: 768px) {
  #page-content {
    left: 4px;
    width: calc(100vw - 8px);
    border-top-right-radius: 10px;
  }
}
</style>
