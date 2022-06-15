<template>
  <div class="input-box">
    <input v-model="value"
      :placeholder="$props.placeholder"
      :type="$props.type"
      :step="$props.step"
      :min="$props.min"
      :max="$props.max"

      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(['modelValue', 'placeholder', 'type', 'step', 'min', 'max'])
const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<style lang="scss" scoped>
.input-box {
  width: 250px;
  height: 44px;
  box-sizing: border-box;
  position: relative;
}

input {
  position: absolute;
  top: 0;
  left: 0;
  color: #e6e6e6;
  width: 100%;
  height: 100%;
  padding: 0 1em;
  box-sizing: border-box;
  background-color: $color-dark-1;
  border: 2px transparent solid;
  border-radius: 4px;
  outline: none;
  transition-property: background-color border;
  transition-duration: 0.2s;
}

input:focus {
  background-color: #202020;
  border-bottom-color: #64b5f6;
}

input[type=number]::-webkit-inner-spin-button {
  display: none;
}
</style>