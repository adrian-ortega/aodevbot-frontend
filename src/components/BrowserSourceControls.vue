<script setup>
import HeaderAndStatsControls from './overlay-controls/HeaderAndStatsControls.vue'
</script>

<template>
  <fieldset class="overlay-controls">
    <legend>Controls</legend>
    <div class="overlay-controls__container">
      <HeaderAndStatsControls />
      <fieldset>
        <legend>Spotify</legend>
      </fieldset>
      <fieldset>
        <legend>Drawer</legend>
      </fieldset>
      <fieldset>
        <legend>Redemptions</legend>
      </fieldset>
    </div>
  </fieldset>
</template>
