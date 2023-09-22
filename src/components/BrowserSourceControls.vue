<script setup>
import BrowserSourceControl from './BrowserSourceControl.vue'
import FormField from './FormField.vue'
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
      <RedemptionsControls />

      <BrowserSourceControl title="Control">
        <FormField label="Test"> test </FormField>
      </BrowserSourceControl>
      <BrowserSourceControl title="Control">
        <FormField label="Test"> test </FormField>
      </BrowserSourceControl>
      <BrowserSourceControl title="Control">
        <FormField label="Test"> test </FormField>
      </BrowserSourceControl>
    </div>
  </fieldset>
</template>
