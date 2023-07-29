<script setup>
import { watch, ref, getCurrentInstance } from "vue"
import { useWebsocketStore } from './stores/websocket';
import { useRoute } from "vue-router";

const route = useRoute();
watch(route, (to) => {
  const { name: routeName, meta } = to;
  const $root = document.getElementById('app');
  $root.className = `v-${routeName}`;
  if (meta.containerClasses) {
    $root.classList.add(...meta.containerClasses);
  }
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