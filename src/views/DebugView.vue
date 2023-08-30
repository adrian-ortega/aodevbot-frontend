<script setup>
import Chat from '../components/Chat.vue'
import BrowserSourceOverlay from '../components/BrowserSourceOverlay.vue'
import PageHeader from '../components/PageHeader.vue'
import DebugTerminal from '../components/DebugTerminal.vue'
</script>

<template>
  <PageHeader title="Debug" />
  <div class="container">
    <div class="content">
      <div class="overlay-debug">
        <BrowserSourceOverlay />
      </div>
      <DebugTerminal />
    </div>
    <div class="sidebar">
      <Chat />
    </div>
  </div>
</template>
