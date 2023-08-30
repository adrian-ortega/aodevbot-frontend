<script setup>
import { computed, reactive } from 'vue'
import { useWebsocketStore } from '../stores/websocket'
const ws = useWebsocketStore()
const state = reactive({ items: [] })

ws.onMessage(({ event, payload }) => {
  if (event !== 'log') return
  state.items.push({ ...payload })
})

const items = computed(() =>
  state.items.map((item) => ({
    ...item,
    message: item.message.replace(
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      ''
    )
  }))
)
</script>

<template>
  <div class="overlay-terminal">
    <div
      v-for="item in items"
      class="overlay-terminal__line"
      :class="{
        'is-error': [item.levels.error, item.levels.fatal].includes(item.type),
        'is-warning': item.levels.warn === item.type,
        'is-success': item.levels.success === item.type,
        'is-info': [item.levels.info, item.levels.debug].includes(item.type)
      }"
    >
      <span class="ts">{{ item.timestamp }}</span>
      <span class="pre">[{{ item.prefix }}]</span>
      <span class="msg">{{ item.message }}</span>
      <span v-if="item.context && item.context.message" class="ctx">{{
        item.context.message
      }}</span>
    </div>
  </div>
</template>
