<script setup>
import AvatarImage from '../AvatarImage.vue'
import { useWebsocketStore } from '../../stores/websocket'
import { ref } from 'vue'

const animateIn = ref(false)
const animateOut = ref(false)
const state = reactive({
  payload: {}
})
const ws = useWebsocketStore()

ws.onMessage(({ event, payload }) => {
  if (event !== 'shoutout') return
  state.payload = { ...payload }
  animateIn.value = true
  animateOut.value = false
  //  ss.play(chimeMp3)
  setTimeout(() => {
    animateIn.value = false
    animateOut.value = true
  }, ONE_SECOND * 15)
})
</script>

<template>
  <div class="toast animate-in so-cmd">
    <div class="toast__title">
      <h4>Shoutout</h4>
    </div>
    <div class="toast__banner">
      <div id="shoutout-video-player">
        <video :src="videoSrc"></video>
      </div>
    </div>
    <div class="toast__content">
      <div class="twitch-card">
        <AvatarImage
          class="twitch-card__avatar"
          src="https://static-cdn.jtvnw.net/jtv_user_pictures/c45fd9f9-1539-49ba-9692-60d0f5199cc0-profile_image-300x300.png"
        />
        <div class="twitch-card__info">
          <div class="twitch-card__name">MnmMia</div>
        </div>
      </div>
    </div>
  </div>
</template>
