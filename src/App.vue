<script setup>
import { watch, ref, getCurrentInstance } from "vue"
import { useWebsocketStore } from './stores/websocket';
import { useRoute } from "vue-router";

const route = useRoute();
watch(route, (to) => {
  const { name: routeName } = to;
  const $root = document.getElementById('app');
  $root.className = `v-${routeName}`;
}, {
  flush: 'pre',
  immediate: true,
  deep: true
})

useWebsocketStore();
</script>

<template>
  <router-view/>
</template>