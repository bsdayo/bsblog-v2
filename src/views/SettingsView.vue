<template>
  <ViewLayout>
    <div class="settings-block">
      <p>基本设置</p>
      <ui-menu text="文章源">
        <ui-dropdown
          class="dropdown-assets-root"
          v-model="settings.assetsRoot"
          :options="assetsRootOptions"
        />
      </ui-menu>
    </div>

    <div class="settings-block">
      <p>关于</p>
      <ui-menu text="版本号">
        {{ version }}
      </ui-menu>
    </div>
  </ViewLayout>
</template>

<script setup lang="ts">
import { inject, Ref } from 'vue'
import ViewLayout from '@/layouts/ViewLayout.vue'
import UiMenu from '@/components/ui/Menu.vue'
import UiButton from '@/components/ui/Button.vue'
import UiDropdown, { DropdownOptions } from '@/components/ui/Dropdown.vue'

const settings = inject<Ref<Settings>>('settings')!
const version = inject<string>('version')!

const assetsRootOptions: DropdownOptions[] = [
  {
    name: 'jsDelivr Fastly (推荐)',
    value: 'https://fastly.jsdelivr.net/gh/b1acksoil/bsblog-assets',
  },
  {
    name: 'jsDelivr',
    value: 'https://cdn.jsdelivr.net/gh/b1acksoil/bsblog-assets',
  },
]
</script>

<style lang="scss" scoped>
.settings-block {
  p {
    font-size: 0.9rem;
    margin-left: 4px;
    user-select: none;
  }

  .menu {
    margin: 6px 0;
    
    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.dropdown-assets-root {
  width: 175px;
}
</style>