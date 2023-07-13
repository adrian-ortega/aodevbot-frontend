<script setup>
import ChannelRedemptionFirst from './components/ChannelRedemptionFirst.vue'
import { useWebsocketStore } from './stores/websocket';
useWebsocketStore();
</script>
<template>
  <ChannelRedemptionFirst/>
</template>