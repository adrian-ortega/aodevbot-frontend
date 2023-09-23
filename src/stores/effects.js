import { defineStore } from 'pinia'
import JSConfetti from 'js-confetti'

export const useEffectsStore = defineStore('effects', () => {
  let confetti
  const createConffetiCanvas = () => {
    if (!document.getElementById('confetti-canvas')) {
      confetti = new JSConfetti({
        canvas: document.getElementById('confetti-canvas')
      })
    }
  }

  const confettiFromSides = () => {
    console.log({ confetti })
    confetti.addConfetti()
  }

  const clearConffetiCanvas = () => {
    confetti.clearCanvas()
  }

  createConffetiCanvas()

  return {
    confettiFromSides,
    clearConffetiCanvas
  }
})
