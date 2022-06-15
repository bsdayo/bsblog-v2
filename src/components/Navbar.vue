<template>
  <div id="nav-bar">
    <ui-button class="sidebar-btn" icon="bars"
      @mousedown="$emit('sidebar-open', toggleSidebar(!sidebarOpen))"
      @blur="$emit('sidebar-open', toggleSidebar(false))" />
    <SearchBox />
  </div>
</template>

<script lang="ts" setup>
import SearchBox from '@/components/SearchBox.vue'
import UiButton from '@/components/ui/Button.vue'
import { ref } from 'vue'

const sidebarOpen = ref(false);

function toggleSidebar(value: boolean) {
  sidebarOpen.value = value
  return sidebarOpen.value
}
</script>

<style lang="scss" scoped>
#nav-bar {
  position: fixed;
  background-color: $color-dark-5;
  box-sizing: border-box;
  top: 0;
  left: 0;
  height: 52px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.sidebar-btn {
  position: absolute;
  top: 8px;
  left: 4px;
  height: 36px;
  width: 42px;
  padding-left: 15px;
}

@media screen and (min-width: 768px) {
  .sidebar-btn {
    display: none;
  }
}
</style>