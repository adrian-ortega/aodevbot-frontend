<script setup>
import Chat from '../components/Chat.vue'
import BrowserSourceOverlay from '../components/BrowserSourceOverlay.vue'
import PageHeader from '../components/PageHeader.vue'
</script>

<template>
  <PageHeader title="Debug" />
  <div class="container">
    <div class="content">
      <BrowserSourceOverlay />
    </div>
    <div class="sidebar">
      <Chat />
    </div>
  </div>
</template>
