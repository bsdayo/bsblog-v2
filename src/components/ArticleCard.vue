<template>
  <router-link
    :to="'/articles/' + $props.id"
    custom
    v-slot="{ navigate }"
  >
    <ui-card class="article-card" @click="navigate">
      <div class="article-card-title">{{ $props.title }}</div>
      <div class="article-card-meta">
        <span>
          <fa-icon :icon="['fas', 'clock']" />
          {{ $props.create }}
        </span>
        <span>
          <fa-icon :icon="['fas', 'archive']" />
          {{ $props.categories.join(', ') }}
        </span>
        <span>
          <fa-icon :icon="['fas', 'tag']" />
          {{ $props.tags.join(', ') }}
        </span>
      </div>
      <div class="article-card-desc"></div>
    </ui-card>
  </router-link>
</template>

<script lang="ts" setup>
import UiCard from '@/components/ui/Card.vue'

defineProps<{
  id: string
  title: string
  create: string
  categories: string[]
  tags: string[]
}>()
</script>

<style lang="scss" scoped>
.article-card {
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
  width: 80vw;
  max-width: 1200px;

  &:hover {
    background-color: $color-dark-1;
  }

  &:active {
    background-color: $color-dark-2;
  }

  .article-card-title {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .article-card-meta {
    color: #ccc;
    font-size: 0.9em;

    span {
      margin: 0 10px;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

</style>