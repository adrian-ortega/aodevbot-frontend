import { defineStore } from "pinia";
import { useWebsocketStore } from '../stores/websocket'
import { reactive, computed } from "vue";

export const useSpotifyStore = defineStore('spotify', () => {
  const ws = useWebsocketStore()
  const playerState = reactive({ data: {} })
  const currentlyPlaying = reactive({ data: {} })

  const track = computed(() =>
    currentlyPlaying.data.item ? currentlyPlaying.data.item : null
  )
  const trackAlbum = computed(() => (track.value ? track.value.album : null))
  const trackArtist = computed(() => (track.value ? track.value.artists[0] : null))
  const progressPercentage = computed(() => !track.value || !playerState.data.progress_ms ? 0 : parseFloat(((playerState.data.progress_ms / track.value.duration_ms) * 100).toFixed(6)))

  ws.onMessage(({ event, payload }) => {
    if (!event || !event.includes('spotify')) return
    switch (event) {
      case 'spotify.currently-playing':
        currentlyPlaying.data = { ...payload }
        break
      case 'spotify.player-state':
        console.log(payload)
        playerState.data = { ...payload }
        break
    }
  })

  return {
    playerState: computed(() => playerState.data),
    currentlyPlaying: computed(() => currentlyPlaying.data),
    currentlyPlayingType: computed(() => playerState.data?.currently_playing_type),

    progressPercentage,

    track,
    trackAlbum,
    trackArtist
  }
});