<script setup>
import ChannelRedemptionFirst from './ChannelRedemptionFirst.vue'
import TimeCommand from './overlay/TimeCommand.vue'
import HugCommand from './overlay/HugCommand.vue'
import SpotifyPlayer from './overlay/SpotifyPlayer.vue'
import SpotifyUpNext from './overlay/SpotifyUpNext.vue'
</script>

<template>
  <TimeCommand />
  <HugCommand />
  <SpotifyUpNext />
  <SpotifyPlayer />
  <ChannelRedemptionFirst />
</template>
