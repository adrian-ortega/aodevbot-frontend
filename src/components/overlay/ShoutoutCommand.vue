<script setup>
import AvatarImage from '../AvatarImage.vue'
import { useWebsocketStore } from '../../stores/websocket'
import { ref, reactive, computed, watch } from 'vue'
import { ONE_SECOND, objectHasKey, randomFromArray } from '../../util'

const animateIn = ref(false)
const animateOut = ref(false)
const video = ref(null)
const state = reactive({
  payload: {}
})
const ws = useWebsocketStore()

const videoClip = computed(() => {
  if (!objectHasKey(state.payload, 'clips') || state.payload.clips.length === 0) {
    return null
  }
  return randomFromArray(state.payload.clips)
})

const videoSrc = computed(() => (videoClip.value ? videoClip.value.src_url : null))

const displayName = computed(() => {
  if (!objectHasKey(state.payload, 'channel') || !objectHasKey(state.payload, 'user')) {
    return null
  }

  return objectHasKey(state.payload, 'channel') &&
    objectHasKey(state.payload.channel, 'broadcaster_name')
    ? state.payload.channel.broadcaster_name
    : state.payload?.user.display_name
})

const avatarUrl = computed(() =>
  !objectHasKey(state.payload, 'user') ? null : state.payload.user.profile_image_url
)

const lastGame = computed(() =>
  !objectHasKey(state.payload, 'channel') ? null : state.payload.channel.game_name
)

ws.onMessage(({ event, payload }) => {
  if (event !== 'shoutout') return
  state.payload = { ...payload }
  animateIn.value = true
  animateOut.value = false

  const duration = videoClip.value ? videoClip.value.duration : 15
  //  ss.play(chimeMp3)
  setTimeout(() => {
    animateOut.value = true
    animateIn.value = false
  }, duration * ONE_SECOND + 100)
})

watch(videoSrc, () => {
  if (video.value) {
    setTimeout(() => video.value.play(), 10)
  }
})
</script>

<template>
  <div class="toast so-cmd" :class="{ 'animate-in': animateIn, 'animate-out': animateOut }">
    <div class="toast__title">
      <h4 data-content="Shoutout"><span>Shoutout</span></h4>
    </div>
    <div class="toast__banner">
      <div id="shoutout-video-player" v-if="videoSrc">
        <video ref="video" :src="videoSrc" autoplay></video>
      </div>
      <div v-else>
        <figure class="square-img">
          <span>
            <img src="https://media.giphy.com/media/xUA7b2S7SxhM1cGdsQ/giphy.gif" alt="" />
          </span>
        </figure>
      </div>
    </div>
    <div class="toast__content">
      <div class="twitch-card">
        <AvatarImage class="twitch-card__avatar" :src="avatarUrl" />
        <div class="twitch-card__info">
          <div class="twitch-card__name">{{ displayName }}</div>
          <p v-if="lastGame">{{ lastGame }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
