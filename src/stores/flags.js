import { defineStore } from "pinia";
import { ref } from "vue";

export const useFlagsStore = defineStore("events", () => {
  const statsShown = ref(false)

  return {
    statsShown,
    setStatsShown(value) {
      statsShown.value = value
    }
  }
});