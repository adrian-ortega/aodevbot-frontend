<script setup>
import LayoutSidebar from '../layouts/LayoutSidebar.vue'
import BrowserSourceControls from '../components/browser-source/BrowserSourceControls.vue'
import BrowserSourceOverlay from '../components/browser-source/BrowserSourceOverlay.vue'
import BrowserSourceTerminal from '../components/browser-source/BrowserSourceTerminal.vue'
</script>

<template>
  <LayoutSidebar title="Debug">
    <fieldset class="overlay-debug">
      <legend>Browser Source</legend>
      <BrowserSourceOverlay />
    </fieldset>
    <BrowserSourceControls />
    <BrowserSourceTerminal />
  </LayoutSidebar>
</template>
