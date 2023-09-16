<script setup>
import HeaderAndStatsControls from './overlay-controls/HeaderAndStatsControls.vue'
import RedemptionsControls from './overlay-controls/RedemptionsControls.vue'
import SpotifyControls from './overlay-controls/SpotifyControls.vue'
</script>

<template>
  <fieldset class="overlay-controls">
    <legend>Controls</legend>
    <div class="overlay-controls__container">
      <HeaderAndStatsControls />
      <SpotifyControls />
      <fieldset>
        <legend>Drawer</legend>
      </fieldset>
      <RedemptionsControls />
    </div>
  </fieldset>
</template>
