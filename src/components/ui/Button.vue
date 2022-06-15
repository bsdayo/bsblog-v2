<template>
  <router-link
    v-if="$props.to"
    :to="$props.to"
    custom
    v-slot="{ navigate, href }"
  >
    <button
      :btn-type="$props.type"
      :class="{ 'router-active': $route.path.includes(href), 'nav-button': $props.nav }"
      :name="$props.name"
      @mousedown="navigate()"
      @click="navigate() && $emit('click')"
      tabindex="-1"
    >
      <fa-icon v-if="$props.icon" :icon="$props.icon" />
      <span v-if="$props.name">{{ $props.name }}</span>
      <span v-else><slot></slot></span>
    </button>
  </router-link>

  <button :btn-type="$props.type" tabindex="-1" v-else>
    <fa-icon v-if="$props.icon" :icon="$props.icon" />
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
type ButtonType = 'normal' | 'primary'

defineEmits(['click'])

withDefaults(defineProps<{
  name?: string
  type?: ButtonType
  icon?: string
  to?: string
  small?: boolean
  nav?: boolean
}>(), {
  type: 'normal'
})
</script>

<style lang="scss" scoped>
button {
  position: relative;
  box-sizing: border-box;
  padding: 0 13px;
  height: 44px;
  display: flex;
  align-items: center;
  outline: none;

  border: 0;
  border-radius: 4px;
  color: #fff;
  background-color: $color-dark-2;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;

  &[small] {
    height: 33px;
  }

  &:hover {
    background-color: $color-dark-3;
  }

  &:active {
    background-color: $color-dark-2;
  }

  &.nav-button {
    background-color: $color-dark-5;
    width: 100%;
    height: 36px;

    span {
      margin-left: 20px;
      word-break: keep-all;
    }

    &:hover {
      background-color: $color-dark-2;
    }

    &:active {
      background-color: $color-dark-3;
    }

    &::before {
      content: '';
      position: absolute;
      left: -1px;
      top: 18px;
      height: 0;
      width: 3px;
      background-color: #64b5f6;
      border-radius: 2px;
      transition-property: top, height;
      transition-duration: 0.4s;
    }

    &.router-active {
      background-color: $color-dark-2;

      &:hover {
        background-color: $color-dark-3;
      }

      &:active {
        background-color: $color-dark-2;
        color: #cfcfcf;
      }

      &::before {
        top: 10px;
        height: 16px;
      }
    }
  }


  &[btn-type=primary] {
    color: #000;
    background-color: #4cc2ff;

    &:hover {
      background-color: #48b2e9;
    }

    &:active {
      background-color: #45a4d5;
    }
  }
}
</style>