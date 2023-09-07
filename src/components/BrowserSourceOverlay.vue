<script setup>
import ChannelRedemptionFirst from './ChannelRedemptionFirst.vue'
import TimeCommand from './overlay/TimeCommand.vue'
import HugCommand from './overlay/HugCommand.vue'
import SpotifyPlayer from './overlay/SpotifyPlayer.vue'
import SpotifyUpNext from './overlay/SpotifyUpNext.vue'
import HeaderAndStats from './overlay/HeaderAndStats.vue'
</script>

<template>
  <div class="overlay">
    <HeaderAndStats />
    <TimeCommand />
    <HugCommand />
    <SpotifyUpNext />
    <SpotifyPlayer />
    <ChannelRedemptionFirst />
  </div>
</template>
