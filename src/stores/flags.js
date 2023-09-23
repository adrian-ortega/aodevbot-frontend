import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFlagsStore = defineStore('events', () => {
  const statsShown = ref(false)
  const setStatsShown = async (value) => {
    statsShown.value = value
  }

  return {
    statsShown,
    setStatsShown
  }
})
