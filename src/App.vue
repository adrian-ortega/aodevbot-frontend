<script setup>
import { useWebsocketStore } from './stores/websocket';
useWebsocketStore();
</script>
<template>
  <router-view/>
</template>