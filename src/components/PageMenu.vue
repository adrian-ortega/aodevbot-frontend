<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import MenuDropdown from './MenuDropdown.vue'
import { mdiTuneVerticalVariant, mdiBug, mdiChat } from '@mdi/js'
import { RouterLink } from 'vue-router'

const dd_links = [
  { label: 'Chat', to: { name: 'chat' }, icon: mdiChat },
  { label: 'Debug', to: { name: 'debug' }, icon: mdiBug },
  { label: 'Config', to: { name: 'config' }, icon: mdiTuneVerticalVariant }
]
</script>

<template>
  <MenuDropdown>
    <h4>Menu</h4>
    <div v-for="(link, linkId) in dd_links" :key="linkId">
      <router-link
        class="button button--fw button--transparent"
        active-class="is-active"
        :to="link.to"
      >
        <span class="icon">
          <SvgIcon type="mdi" :path="link.icon" />
        </span>
        <span class="text">{{ link.label }}</span>
      </router-link>
    </div>
  </MenuDropdown>
</template>
s
