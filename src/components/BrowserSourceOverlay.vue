<script setup>
import ChannelRedemptionFirst from './ChannelRedemptionFirst.vue'
import TimeCommand from './overlay/TimeCommand.vue'
import HugCommand from './overlay/HugCommand.vue'
import SpotifyPlayer from './overlay/SpotifyPlayer.vue'
import SpotifyUpNext from './overlay/SpotifyUpNext.vue'
import HeaderAndStats from './overlay/HeaderAndStats.vue'
import { computed } from 'vue'
// import ShoutoutCommand from './overlay/ShoutoutCommand.vue'
const windowWidth = computed(() => window.innerWidth)
</script>

<template>
  <div
    class="overlay"
    :class="{
      'is-tiny': windowWidth < 1649,
      'is-hd': windowWidth > 1650 && windowWidth < 2559,
      'is-2k': windowWidth > 2559
    }"
  >
    <HeaderAndStats />
    <TimeCommand />
    <HugCommand />
    <!-- <ShoutoutCommand /> -->
    <SpotifyUpNext />
    <SpotifyPlayer />
    <ChannelRedemptionFirst />
  </div>
</template>
