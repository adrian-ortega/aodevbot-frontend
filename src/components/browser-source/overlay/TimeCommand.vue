<script setup>
import AvatarImage from '../../AvatarImage.vue'
import { useWebsocketStore } from '../../../stores/websocket'
import { computed, reactive, ref } from 'vue'
import { useAccountsStore } from '../../../stores/accounts'
import { ONE_SECOND } from '../../../util'
const animateIn = ref(false)
const animateOut = ref(false)
const as = useAccountsStore()
const ws = useWebsocketStore()
const state = reactive({
  payload: {}
})
ws.onMessage(({ event, payload }) => {
  if (event !== 'time-command') return
  state.payload = { ...payload }

  animateIn.value = true
  animateOut.value = false
  setTimeout(() => {
    animateIn.value = false
    animateOut.value = true
  }, ONE_SECOND * 15)
})
const h = computed(() => state.payload?.h || '00')
const m = computed(() => state.payload?.m || '00')
const ampm = computed(() => state.payload?.ampm || 'AM')
const day = computed(() => state.payload?.day || 'Monday')
</script>

<template>
  <div
    class="time-cmd toast"
    :class="{
      'animate-in': animateIn,
      'animate-out': animateOut
    }"
  >
    <div class="toast__image">
      <AvatarImage :src="as.broadcaster.profile_image_url" v-if="as.broadcaster" />
    </div>
    <div class="toast__content">
      <h2 class="toast__title">Local Time</h2>
      <div class="time-cmd__value">
        <span class="day">{{ day }}</span>
        <span class="time">{{ h }}<span class="blink colon">:</span>{{ m }} {{ ampm }} </span>
      </div>
    </div>
  </div>
</template>
