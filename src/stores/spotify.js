import { defineStore } from "pinia";
import { useWebsocketStore } from '../stores/websocket'
import { reactive, ref, computed, watch } from "vue";
import { ONE_SECOND, elapsedSeconds } from "../util";

export const useSpotifyStore = defineStore('spotify', () => {
  let progressTimeoutId
  let progressLastTs = 0;
  const ws = useWebsocketStore()
  const playerState = reactive({
    data: {
      isPlaying: false
    }
  })
  const playerStateProgress = ref(0)
  const currentlyPlaying = reactive({ data: {} })
  const isPlaying = computed(() => !!playerState.data.is_playing)
  const track = computed(() =>
    currentlyPlaying.data.item ? currentlyPlaying.data.item : null
  )
  const trackAlbum = computed(() => (track.value ? track.value.album : null))
  const trackArtist = computed(() => (track.value ? track.value.artists[0] : null))
  const progressPercentage = computed(() => !track.value || !playerStateProgress.value ? 0 : parseFloat(((playerStateProgress.value / track.value.duration_ms) * 100).toFixed(6)))

  const updateProgress = (timestmap) => {
    progressTimeoutId = window.requestAnimationFrame(updateProgress)
    if (playerStateProgress.value >= track.value.duration_ms) {
      cancelAnimationFrame(progressTimeoutId)
    }
    if (timestmap - progressLastTs > ONE_SECOND) {
      progressLastTs = timestmap;
      playerStateProgress.value += ONE_SECOND;
    }
  }

  ws.onMessage(({ event, payload }) => {
    if (!event || !event.includes('spotify')) return
    switch (event) {
      case 'spotify.currently-playing':
        currentlyPlaying.data = { ...payload }
        break
      case 'spotify.player-state':
        playerState.data = { ...payload }
        playerStateProgress.value = playerState.data.progress_ms
        break
    }

    cancelAnimationFrame(progressTimeoutId)
    if (payload) {
      progressTimeoutId = window.requestAnimationFrame(updateProgress)
    }
  })

  const refresh = () => {
    return !ws.isReady ? setTimeout(refresh, 10) : ws.send('spotify.current');
  }

  watch(() => isPlaying.value, (value) => {
    cancelAnimationFrame(progressTimeoutId)
    if (value) {
      progressTimeoutId = window.requestAnimationFrame(updateProgress)
    }
  })

  return {
    refresh,
    playerState: computed(() => playerState.data),
    isPlaying,
    isTrack: computed(() => playerState.data?.currently_playing_type === 'track'),
    isAd: computed(() => playerState.data?.currently_playing_type === 'ad'),
    hasActiveDevice: computed(() => !!playerState.data?.device?.is_active),
    currentlyPlaying: computed(() => currentlyPlaying.data),
    currentlyPlayingType: computed(() => playerState.data?.currently_playing_type),

    progressPercentage,
    durationFormatted: computed(() => elapsedSeconds(track.value ? track.value.duration_ms / 1000 : 0)),
    progressFormatted: computed(() => elapsedSeconds(playerStateProgress.value ? playerStateProgress.value / 1000 : 0)),

    track,
    trackAlbum,
    trackArtist
  }
});