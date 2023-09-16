<script setup>
import soundFxConfetti from '../assets/audio/confetti-poppers.mp3'
import { storeToRefs } from 'pinia'
import { useRedeemablesStore } from '../stores/redeemables'
import { useEffectsStore } from '../stores/effects'
import { useSoundsStore } from '../stores/sounds'
import { watch, ref, reactive } from 'vue'
import { randomFromArray } from '../util'
const redeemablesStore = useRedeemablesStore()
const { firstToChat } = storeToRefs(redeemablesStore)

const effects = useEffectsStore()

const redemption = reactive({})
const hiddenCheer = ref(false)
const animateIn = ref(false)
const animateOut = ref(false)

const showMessage = async (payload) => {
  const soundsStore = useSoundsStore()
  hiddenCheer.value = false
  animateIn.value = true
  animateOut.value = false
  effects.confettiFromSides()
  soundsStore.play(soundFxConfetti)

  redemption.name = payload.name
  redemption.message = randomFromArray([
    'is First! you all saw it! They were here FIRST!',
    "There's no denying it, you're first!",
    'I think you get points for being first right? Maybe. Anyway you did it!',
    "Fwah Fwah Fwah Fwaaahh YOU'RE FIRST!"
  ])

  setTimeout(() => {
    animateOut.value = true
    animateIn.value = false
    effects.clearConffetiCanvas()
  })
}

watch(firstToChat, (value) => {
  if (value !== null) showMessage({ ...value })
})
</script>
<template>
  <div class="redemption first-to-chat">
    <div class="channel-notification from-center">
      <div>
        <h4>{{ redemption.name }}</h4>
        <div :vhtml="redemption.message"></div>
      </div>
    </div>
  </div>
</template>
