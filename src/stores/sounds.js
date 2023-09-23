import { Howl } from 'howler'
import { defineStore } from 'pinia'

export const useSoundsStore = defineStore('sounds', () => {
  const play = (src) => {
    const sound = new Howl({
      src: [src]
    })
    sound.play()
    return sound
  }

  return {
    play
  }
})
