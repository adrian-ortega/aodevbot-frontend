<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiTuneVerticalVariant, mdiBug, mdiChat } from '@mdi/js'
import { RouterLink } from 'vue-router'

const dd_links = [
  { label: 'Chat', to: { name: 'chat' }, icon: mdiChat },
  { label: 'Debug', to: { name: 'debug' }, icon: mdiBug },
  { label: 'Config', to: { name: 'config' }, icon: mdiTuneVerticalVariant }
]
</script>

<template>
  <div class="form-buttons form-buttons--inline">
    <template v-for="link in dd_links" :key="link.label">
      <router-link class="button button--transparent" active-class="is-active" :to="link.to">
        <span class="icon">
          <SvgIcon type="mdi" :path="link.icon" />
        </span>
        <span class="text">{{ link.label }}</span>
      </router-link>
    </template>
  </div>
</template>
s
