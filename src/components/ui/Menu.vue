<template>
  <div class="menu">
    <div class="menu-text">{{ $props.text }}</div>
    <div class="menu-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  text: string
}>(), {
  text: ''
})
</script>

<style lang="scss" scoped>
.menu {
  border-radius: 4px;
  background-color: $color-dark-2;
  box-sizing: border-box;
  padding: 0 24px;
  height: 72px;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .menu-text {
    user-select: none;
  }
}
</style>