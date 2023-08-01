<script setup>
import MenuDropdown from './MenuDropdown.vue';
import { RouterLink } from 'vue-router';

const dd_links = [
  { label: 'Chat', to: 'home' },
  { label: 'Debug', to: 'debug' },
  { label: 'Config', to: 'config' },
];
</script>

<template>
  <MenuDropdown>
    <h4>Menu</h4>
    <div v-for="(link, linkId) in dd_links" :key="linkId">
      <router-link class="button button--fw button--transparent" active-class="is-active" :to="link.to" >
        <span class="text">{{ link.label }}</span>
      </router-link>
    </div>
  </MenuDropdown>
</template>s