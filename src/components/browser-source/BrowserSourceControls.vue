<script setup>
import HeaderAndStatsControls from './controls/HeaderAndStatsControls.vue'
import RedemptionsControls from './controls/RedemptionsControls.vue'
import SpotifyControls from './controls/SpotifyControls.vue'
import { computed, reactive, shallowRef } from 'vue'

const state = reactive({
  data: [
    {
      id: 'header-and-stats',
      collapsed: false,
      component: shallowRef(HeaderAndStatsControls)
    },
    {
      id: 'spotify-controls',
      collapsed: false,
      component: shallowRef(SpotifyControls)
    },
    {
      id: 'redemptions',
      collapsed: false,
      component: shallowRef(RedemptionsControls)
    }
  ]
})
const updateControls = ({ id, value }) => {
  const i = state.data.findIndex((c) => c.id === id)
  state.data[i].collapsed = value
  state.data = [...state.data.sort((a, b) => b.collapsed - a.collapsed)]
}
const controls = computed(() => state.data)
</script>

<template>
  <fieldset class="overlay-controls">
    <legend>Controls</legend>
    <div class="overlay-controls__container">
      <component
        v-for="control in controls"
        :key="control.id"
        :is="control.component"
        :id="control.id"
        @collapsed="updateControls"
      />
    </div>
  </fieldset>
</template>
