<script setup>
import Chat from '../components/Chat.vue'
import BrowserSourceOverlay from '../components/BrowserSourceOverlay.vue'
import Pageheader from '../components/pageheader.vue'
</script>

<template>
  <Pageheader title="Debug" />
  <div class="container">
    <div class="content">
      <BrowserSourceOverlay />
    </div>
    <div class="sidebar">
      <Chat />
    </div>
  </div>
</template>
