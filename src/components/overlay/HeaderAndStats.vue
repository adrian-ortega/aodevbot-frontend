<script setup>
import logoPng from '../../assets/png/logo.png'
import HeaderStat from './HeaderStat.vue'
import Fireflies from './Fireflies.vue'
import { useWebsocketStore } from '../../stores/websocket'
import { useFlagsStore } from '../../stores/flags'
import { reactive, ref } from 'vue'
import { ONE_MINUTE, ONE_SECOND, isString, makeId, randomInt } from '../../util'

const DURATION = ONE_MINUTE * 3
const DURATION_FPS = 24
const animateIn = ref(false)
const animateOut = ref(false)
const ws = useWebsocketStore()
const flags = useFlagsStore()

const timeoutId = ref(0)
const itemsType = ref(null)
const progressTimeoutRef = ref(0)
const progressStartedMs = ref(null)
const progressElapsedPercentage = ref(0)
const progressElapsedMs = ref(0)
const firefliesMax = ref(10)
const state = reactive({ items: [] })

ws.onMessage(({ event, payload }) => {
  if (!event || (isString(event) && !event.includes('stats'))) return

  switch (event) {
    case 'stats.stop':
      clearTimeout(timeoutId.value)
      killUpdateTimer()
      animateIn.value = false
      animateOut.value = true
      break
    case 'stats':
      itemsType.value = payload.type
      state.items = [...payload.data.map((item) => ({ id: makeId(), ...item }))]
      play()
      break
  }
})

const killUpdateTimer = () => {
  progressStartedMs.value = null
  progressElapsedMs.value = null
  progressElapsedPercentage.value = 0
  clearTimeout(progressTimeoutRef.value)
}

const updateTimer = () => {
  clearTimeout(progressTimeoutRef.value)
  progressTimeoutRef.value = setTimeout(
    async () => await updateTimerProgress(performance.now()),
    ONE_SECOND / DURATION_FPS
  )
}

const updateTimerProgress = async (timestamp) => {
  try {
    if (progressStartedMs.value === null) {
      progressStartedMs.value = timestamp
      progressElapsedMs.value = 0
    }

    if (
      progressElapsedMs.value !== null &&
      progressStartedMs.value !== null &&
      timestamp - progressStartedMs.value < DURATION
    ) {
      progressElapsedMs.value = timestamp - progressStartedMs.value
      progressElapsedPercentage.value = ((progressElapsedMs.value / DURATION) * 100).toFixed(6)
      updateTimer()

      return progressTimeoutRef
    }
  } catch (err) {
    console.log('updateTimer', err)
  }

  killUpdateTimer()
}
const play = async () => {
  clearTimeout(timeoutId.value)
  killUpdateTimer()
  updateTimer()
  animateIn.value = true
  animateOut.value = false
  firefliesMax.value = randomInt(3, 10)
  await flags.setStatsShown(true)

  timeoutId.value = setTimeout(() => {
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
          :data-count="state.items ? state.items.length : 0"
        >
          <HeaderStat v-for="item in state.items" :key="item.id" :item="item" :type="itemsType" />
        </div>
      </div>
      <Fireflies v-if="animateIn" :max="firefliesMax" />
      <div
        class="header-and-stats__progress"
        :style="{ width: 100 - progressElapsedPercentage + '%' }"
      ></div>
    </div>
  </div>
</template>
