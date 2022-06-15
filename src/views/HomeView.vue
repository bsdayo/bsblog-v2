<template>
  <ViewLayout>
    <h1>bsBlog</h1>
    <p>Redefine the life.</p>

    <ui-button to="/articles" type="primary">文章列表</ui-button>
  </ViewLayout>
</template>

<script setup lang="ts">
import ViewLayout from '@/layouts/ViewLayout.vue'
import UiButton from '@/components/ui/Button.vue'
</script>

<style lang="scss" scoped>
.view-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin-bottom: 80px;
  }
}
</style>