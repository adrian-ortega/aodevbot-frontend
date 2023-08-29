<script setup>
import { onMounted, watch } from 'vue'
import { useWebsocketStore } from './stores/websocket'
import { useRoute } from 'vue-router'
import { useAccountsStore } from './stores/accounts'

const accounts = useAccountsStore()
const route = useRoute()
const addCssClassToRoute = (to) => {
  const { name: routeName, meta } = to
  const $root = document.getElementById('app')
  let routeClassName = (routeName ?? '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(new RegExp('^-|-$', 'g'), '')

  $root.className = `v-${routeClassName}`
  if (meta.containerClasses) {
    $root.classList.add(...meta.containerClasses)
  }
}

watch(route, addCssClassToRoute, {
  flush: 'pre',
  immediate: true,
  deep: true
})

useWebsocketStore()

onMounted(() => accounts.fetchAccounts())
</script>

<template>
  <router-view />
</template>
