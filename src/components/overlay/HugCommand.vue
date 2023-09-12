<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import chimeMp3 from '../../assets/audio/chime.mp3'
import hugsGif from '../../assets/gifs/hugs.gif'
import friendsGif from '../../assets/gifs/friends-hug.gif'
import goldenGirlsGif from '../../assets/gifs/golden-girls-hug.gif'
import { ONE_SECOND, randomFromArray, randomInt, randomFloat } from '../../util'
import { computed, reactive, ref } from 'vue'
import { useWebsocketStore } from '../../stores/websocket'
import { mdiHeart, mdiHeartCircle, mdiHeartCircleOutline, mdiHeartOutline } from '@mdi/js'
import { useSoundsStore } from '../../stores/sounds'

const animateIn = ref(false)
const animateOut = ref(false)
const state = reactive({
  payload: {}
})
const ws = useWebsocketStore()
const ss = useSoundsStore()

ws.onMessage(({ event, payload }) => {
  if (event !== 'hug-command') return
  state.payload = { ...payload }
  animateIn.value = true
  animateOut.value = false
  ss.play(chimeMp3)
  setTimeout(() => {
    animateIn.value = false
    animateOut.value = true
  }, ONE_SECOND * 15)
})
const display_name = computed(() =>
  state.payload.state ? state.payload.state['display-name'] : ''
)
const friend_name = computed(() => state.payload?.friend)

const message = computed(() => {
  return friend_name.value
    ? `<span class="from">${display_name.value}</span> hugged <span class="to">${friend_name.value}!</span>`
    : `<span class="from">${display_name.value}</span> was hugged!`
})
</script>
<template>
  <div
    ref="root"
    class="hug-cmd toast small"
    :class="{ 'animate-in': animateIn, 'animate-out': animateOut }"
  >
    <div class="toast__banner">
      <figure>
        <img :src="randomFromArray([hugsGif, friendsGif, goldenGirlsGif])" alt="" />
      </figure>
    </div>
    <div class="toast__content">
      <p v-html="message"></p>
    </div>
    <div class="hearts">
      <span
        class="icon"
        v-for="i in 10"
        :key="i"
        :style="{
          top: randomInt(10, 200) * -1 + '%',
          left: randomInt() + '%',
          fontSize: randomFloat(0.5, 3.5) + 'em',
          animationDuration: randomInt(5, 9) + 's',
          animationDelay: randomInt(30, 100) + 'ms',
          color: randomFromArray(['var(--o-primary)', 'var(--o-secondary)', 'var(--o-tertiary)'])
        }"
      >
        <SvgIcon
          type="mdi"
          :path="
            randomFromArray([mdiHeart, mdiHeartOutline, mdiHeartCircle, mdiHeartCircleOutline])
          "
        />
      </span>
    </div>
  </div>
</template>
