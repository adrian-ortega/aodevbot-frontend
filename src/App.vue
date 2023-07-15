<script setup>
import ChannelRedemptionFirst from './components/ChannelRedemptionFirst.vue'
import { useWebsocketStore } from './stores/websocket';
useWebsocketStore();
</script>
<template>
  <ChannelRedemptionFirst />
  <canvas id="confetti-canvas" style="width: 100%;height: 100%;position: fixed; top: 0; left: 0;"></canvas>
</template>