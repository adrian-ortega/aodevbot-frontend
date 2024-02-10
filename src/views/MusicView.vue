<script setup>
import LayoutSidebar from '../layouts/LayoutSidebar.vue'
import MusicTabs from '../components/music/MusicTabs.vue'
</script>

<template>
  <LayoutSidebar title="Music">
    <MusicTabs/>
    <router-view class="tabs__content" />
  </LayoutSidebar>
</template>