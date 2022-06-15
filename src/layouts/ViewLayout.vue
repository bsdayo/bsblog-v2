<template>
  <div class="view-content">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.view-content {
  height: 100%;
  box-sizing: border-box;
  padding: 34px 50px;
  color: #e6e6e6;
  overflow-y: scroll;
  word-wrap: break-word;

  .page-title {
    // margin: 0;
    text-align: center;
  }

  .page-subtitle {
    text-align: center;
  }
}

@media screen and (max-width: 768px) {
  .view-content {
    padding: 10px 20px 30px 20px;
  }
}
</style>