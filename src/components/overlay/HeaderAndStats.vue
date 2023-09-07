<script setup>
import logoPng from '../../assets/png/logo.png'
import HeaderStat from './HeaderStat.vue'
import Fireflies from './Fireflies.vue'
import { useWebsocketStore } from '../../stores/websocket'
import { useFlagsStore } from '../../stores/flags'

import { reactive, ref } from 'vue'
import { ONE_MINUTE, makeId, randomInt } from '../../util'

const DURATION = ONE_MINUTE * 3
const animateIn = ref(false)
const animateOut = ref(false)
const ws = useWebsocketStore()
const state = reactive({
  type: null,
  items: [],
  started: null,
  progress: 0,
  timer: 0,
  flies: 10
})

let timeoutId, updateTimerId

ws.onMessage(({ event, payload }) => {
  if (event !== 'stats') return
  state.type = payload.type
  state.items = [...payload.data.map((item) => ({ id: makeId(), ...item }))]
  play()
})

const updateTimer = (timestamp) => {
  if (state.started === null) {
    state.started = timestamp
    state.timer = 0
  }

  if (state.timer !== null && timestamp - state.started < DURATION) {
    state.timer = timestamp - state.started
    state.progress = ((state.timer / DURATION) * 100).toFixed(6)
    updateTimerId = window.requestAnimationFrame(updateTimer)
  } else {
    state.started = null
    state.timer = null
    state.progress = 0
  }
}
const play = () => {
  const flags = useFlagsStore()
  clearTimeout(timeoutId)
  cancelAnimationFrame(updateTimerId)

  updateTimerId = window.requestAnimationFrame(updateTimer)
  animateIn.value = true
  animateOut.value = false
  state.flies = randomInt(3, 10)
  flags.setStatsShown(true)

  timeoutId = setTimeout(() => {
    animateIn.value = false
    animateOut.value = true
    flags.setStatsShown(true)
  }, DURATION)
}
</script>

<template>
  <div class="header-and-stats" :class="{ 'animate-in': animateIn, 'animate-out': animateOut }">
    <div class="header-and-stats__container">
      <div class="header-and-stats__items">
        <div
          class="header-and-stats__item header-and-stats__item--logo"
          :data-count="state.items.length"
        >
          <div class="logo">
            <figure>
              <img :src="logoPng" alt="" />
            </figure>
          </div>
        </div>
        <div
          class="header-and-stats__item header-and-stats__item--stats"
          :data-count="state.items.length"
        >
          <HeaderStat v-for="item in state.items" :key="item.id" :item="item" :type="state.type" />
        </div>
      </div>
      <Fireflies v-if="animateIn" :max="state.flies" />
      <div class="header-and-stats__progress" :style="{ width: 100 - state.progress + '%' }"></div>
    </div>
  </div>
</template>
