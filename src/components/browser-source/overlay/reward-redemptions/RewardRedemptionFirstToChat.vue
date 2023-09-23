<script setup>
import Fireflies from '../Fireflies.vue'
import JumpingText from '../JumpingText.vue'
import soundFxConfetti from '../../../../assets/audio/confetti-poppers.mp3'

import { useRedeemablesStore } from '../../../../stores/redeemables'
import { useEffectsStore } from '../../../../stores/effects'
import { useSoundsStore } from '../../../../stores/sounds'
import { watch, ref, reactive } from 'vue'
import { ONE_SECOND, randomFromArray, randomInt, shuffleArray } from '../../../../util'

const rs = useRedeemablesStore()
const es = useEffectsStore()

const redemption = reactive({})
const hiddenCheer = ref(false)
const animateIn = ref(false)
const animateOut = ref(false)

const showMessage = async (payload) => {
  const ss = useSoundsStore()

  hiddenCheer.value = false
  animateIn.value = true
  animateOut.value = false

  es.confettiFromSides()
  ss.play(soundFxConfetti)

  redemption.name = payload.name
  redemption.message = randomFromArray(
    shuffleArray([
      'is First! you all saw it! They were here FIRST!',
      "There's no denying it, you're first!",
      'I think you get points for being first right? Maybe. Anyway you did it!',
      "Fwah Fwah Fwah Fwaaahh YOU'RE FIRST!"
    ])
  )

  setTimeout(() => {
    animateOut.value = true
    animateIn.value = false
    es.clearConffetiCanvas()
  }, ONE_SECOND * 15)
}

watch(
  () => rs.firstToChat,
  (value) => {
    if (value !== null) showMessage({ ...value })
  }
)
</script>
<template>
  <div
    v-if="rs.firstToChat"
    class="redemption first-to-chat"
    :class="{
      'animate-in': animateIn,
      'animate-out': animateOut
    }"
  >
    <div class="channel-notification from-center">
      <div class="channel-notification__title">
        <h4 data-content="First!"><span>First!</span></h4>
      </div>
      <div class="channel-notification__content">
        <h4><JumpingText :text="redemption.name" /></h4>
        <div v-html="redemption.message"></div>
      </div>
    </div>
    <Fireflies :max="randomInt(10, 100)" />
  </div>
</template>
