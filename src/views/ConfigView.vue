<script setup>
import ConfigTabs from '../components/config/ConfigTabs.vue'
import LayoutSidebar from '../layouts/LayoutSidebar.vue'
</script>

<template>
  <LayoutSidebar  title="Settings">
    <ConfigTabs />
    <router-view class="tabs__content" />
  </LayoutSidebar>
</template>
