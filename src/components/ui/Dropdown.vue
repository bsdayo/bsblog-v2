<template>
  <div class="dropdown-box">
    <div
      class="dropdown-main"
      tabindex="0"
      @click="listOpen = !listOpen"
      @blur="listOpen = false"
    >
      {{ $props.options.find((o) => o.value === value)?.name }}
      <fa-icon icon="angle-down" />
    </div>

    <div
      class="dropdown-list"
      ref="dropdown"
      :class="{ 'dropdown-list-open': listOpen }"
      :style="{ maxHeight: listOpen ? dropdown?.scrollHeight + 'px' : 0 }"
    >
      <div
        class="dropdown-item"
        :class="{ 'dropdown-item-selected': o.value === value }"
        v-for="o in $props.options"
        @mousedown="select(o.value)"
      >
        {{ o.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

export interface DropdownOptions {
  name: string
  value: any
  // default?: boolean
}

const props = defineProps<{ modelValue: any, options: DropdownOptions[] }>()
const emit = defineEmits(['update:modelValue'])

// const val = props.options.find((o) => o.default)?.value
// val && emit('update:modelValue', val)

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const dropdown = ref<HTMLElement | null>(null)
const listOpen = ref(false)

function select(val: any) {
  value.value = val
  listOpen.value = false
}
</script>

<style lang="scss" scoped>
.dropdown-box {
  display: inline-block;
  text-align: left;
  height: 36px;
  position: relative;
  cursor: pointer;
  user-select: none;
  font-size: 0.8rem;
}

.dropdown-main {
  width: 100%;
  height: 100%;
  line-height: 100%;
  background-color: #333;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 0 1em;
  display: flex;
  align-items: center;
}

.dropdown-main:hover {
  background-color: #3c3c3c;
}

.dropdown-main:active {
  background-color: #323232;
}

.dropdown-main svg {
  position: absolute;
  right: 1em;
  top: 50%;
  transform: translateY(-50%);
}

.dropdown-list {
  width: 100%;
  // box-sizing: border-box;
  overflow-y: hidden;
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #2d2d2d;
  padding: 1px 5px;
  border: 0;
  border-radius: 6px;
  transition: max-height 0.2s;
  z-index: 999;

  &.dropdown-list-open {
    // padding: 0;
    border: 1px solid $color-dark-4;
  }
}

.dropdown-item {
  box-sizing: border-box;
  height: 36px;
  margin: 4px 0;
  padding: 6px 1em;
  border-radius: 4px;
  position: relative;
  display: flex;
  align-items: center;
}

.dropdown-item:hover {
  background-color: #383838;
}

.dropdown-item.dropdown-item-selected {
  background-color: #383838;
}

.dropdown-item.dropdown-item-selected:hover {
  background-color: #343434;
}

.dropdown-item.dropdown-item-selected::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 48%;
  background-color: #4cc2ff;
  border-radius: 2px;
}
</style>