import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const BREAKPOINT_GAP = 32
export const BREAKPOINT_TABLET = 769
export const BREAKPOINT_DESKTOP = 960 + (BREAKPOINT_GAP * 2)
export const BREAKPOINT_WIDESCREEN = 1152 + (BREAKPOINT_GAP * 2)
export const BREAKPOINT_FULLHD = 1344 + (BREAKPOINT_GAP * 2)
export const BREAKPOINT_2K = 2495 + (BREAKPOINT_GAP * 2)

export const useBreakpointsStore = defineStore('breakpoints', () => {
  const windowWidth = ref(window.innerWidth);

  const onWindowResize = () => {
    windowWidth.value = window.innerWidth;
  }

  window.addEventListener('resize', onWindowResize)

  return {
    windowWidth,
    isMobile: computed(() => windowWidth.value < BREAKPOINT_TABLET),
    isTouch: computed(() => windowWidth.value < BREAKPOINT_DESKTOP),
    isDesktop: computed(() => windowWidth.value > BREAKPOINT_DESKTOP),
    isWidescreen: computed(() => windowWidth.value > BREAKPOINT_WIDESCREEN),
    isFullHD: computed(() => windowWidth.value > BREAKPOINT_FULLHD),
    is2K: computed(() => windowWidth.value > BREAKPOINT_2K)
  }
})