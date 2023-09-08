<script setup>
import Chat from '../components/Chat.vue'
import BrowserSourceControls from '../components/BrowserSourceControls.vue'
import BrowserSourceOverlay from '../components/BrowserSourceOverlay.vue'
import BrowserSourceTerminal from '../components/BrowserSourceTerminal.vue'
import PageHeader from '../components/PageHeader.vue'
</script>

<template>
  <PageHeader title="Debug" />
  <div class="container">
    <div class="content">
      <div class="content__scroller">
        <fieldset class="overlay-debug">
          <legend>Browser Source</legend>
          <BrowserSourceOverlay />
        </fieldset>
        <BrowserSourceControls />
        <BrowserSourceTerminal />
      </div>
    </div>
    <div class="sidebar">
      <Chat />
    </div>
  </div>
</template>
