<script setup>
import Chat from '../components/Chat.vue';
import BrowserSourceOverlay from '../components/BrowserSourceOverlay.vue';
</script>

<template>
  <div class="container">
    <div class="content">
      <BrowserSourceOverlay/>
    </div>
    <div class="sidebar">
      <Chat/>
    </div>
  </div>
</template>