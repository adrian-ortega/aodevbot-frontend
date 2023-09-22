<script setup>
import RewardRedemptions from './overlay/RewardRedemptions.vue'
import TimeCommand from './overlay/TimeCommand.vue'
import HugCommand from './overlay/HugCommand.vue'
import ShoutoutCommand from './overlay/ShoutoutCommand.vue'
import SpotifyPlayer from './overlay/SpotifyPlayer.vue'
import SpotifyUpNext from './overlay/SpotifyUpNext.vue'
import HeaderAndStats from './overlay/HeaderAndStats.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useBreakpointsStore } from '../stores/breakpoints'

const bp = useBreakpointsStore()
const overlay = ref(null)
const width = ref(window.innerWidth)

const onWidthChange = () => {
  if (!overlay.value) {
    width.value = window.innerWidth
    return
  }
  const styles = window.getComputedStyle(overlay.value)
  width.value = parseInt(styles.width, 10)
}

onMounted(() => {
  window.addEventListener('resize', onWidthChange)
  setTimeout(onWidthChange, 1)
})
onUnmounted(() => window.removeEventListener('resize', onWidthChange))

const fontSize = computed(() => {
  const w = width.value
  const value = w * 0.00625
  let offset
  switch (true) {
    case w < 1600:
      return `1em`
    case w > 1600:
      offset = 0.85
      break
    case w > 1900:
      offset = 0.65
      break
    default:
      offset = 0.25
      break
  }
  return `${Math.floor(value * offset + value)}px`
})
</script>

<template>
  <div
    ref="overlay"
    class="overlay"
    :style="{ fontSize }"
    :class="{
      'is-hd': bp.isFullHD,
      'is-2k': bp.is2K
    }"
  >
    <HeaderAndStats />
    <TimeCommand />
    <HugCommand />
    <ShoutoutCommand />
    <SpotifyUpNext />
    <SpotifyPlayer />
    <RewardRedemptions />
  </div>
</template>
