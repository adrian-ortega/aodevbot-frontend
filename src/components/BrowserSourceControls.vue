<script setup>
import HeaderAndStatsControls from './overlay-controls/HeaderAndStatsControls.vue'
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
      <fieldset>
        <legend>Redemptions</legend>
      </fieldset>
    </div>
  </fieldset>
</template>
