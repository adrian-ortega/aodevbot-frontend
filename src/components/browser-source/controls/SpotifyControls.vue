<script setup>
import BrowserSourceControl from '../BrowserSourceControl.vue'
import noSongJpg from '../../../assets/jpg/no-song.jpg'
import SvgIcon from '@jamescoyle/vue-icon'
import {
  mdiPlay,
  mdiSkipNext,
  mdiSkipPrevious,
  mdiHeart,
  mdiAdvertisements,
  mdiReload,
  mdiPause
} from '@mdi/js'
import { useSpotifyStore } from '../../../stores/spotify'
import { useWebsocketStore } from '../../../stores/websocket'

const ss = useSpotifyStore()
const ws = useWebsocketStore()

const refresh = () => {
  ws.send('spotify.current')
}

const skipPrevious = () => {
  ws.send('spotify.previous')
}

const playPause = () => {
  ss.isPlaying ? ws.send('spotify.pause') : ws.send('spotify.play')
}

const skipToNext = () => {
  ws.send('spotify.next')
}
</script>

<template>
  <BrowserSourceControl class="overlay-control--spotify" title="Spotify">
    <div class="field">
      <div class="spotify-track">
        <div class="spotify-track__image">
          <figure class="square-img">
            <span>
              <template v-if="ss.isAd">
                <SvgIcon type="mdi" :path="mdiAdvertisements" />
              </template>
              <img
                v-else-if="ss.isTrack"
                :src="ss.trackAlbum.images[ss.trackAlbum.images.length - 1].url"
                alt=""
              />
              <img v-else :src="noSongJpg" alt="" />
            </span>
          </figure>
        </div>
        <div class="spotify-track__info">
          <div class="spotify-track__song-name">
            <template v-if="ss.track">{{ ss.track.name }}</template>
            <template v-else>Nothing playing</template>
          </div>
          <div class="spotify-track__artist">
            <template v-if="ss.trackArtist">{{
              ss.track.artists.map((a) => a.name).join(', ')
            }}</template>

            <template v-else>No Artist</template>
          </div>
        </div>
        <div class="spotify-track__progress">
          <div
            class="spotify-track__progress-bar"
            :style="{ width: ss.progressPercentage + '%' }"
          ></div>
        </div>
        <div class="spotify-track__progress-ts">
          <div>{{ ss.progressFormatted }}</div>
          <div>{{ ss.durationFormatted }}</div>
        </div>
      </div>
    </div>
    <div class="form-buttons form-buttons--centered">
      <button
        class="button"
        title="Skip Previous"
        :disabled="!ss.hasActiveDevice"
        @click.prevent="skipPrevious"
      >
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiSkipPrevious" />
        </span>
      </button>
      <button class="button" title="Play/Pause" @click.prevent="playPause">
        <span class="icon">
          <SvgIcon v-if="ss.isPlaying" type="mdi" :path="mdiPause" />
          <SvgIcon v-else type="mdi" :path="mdiPlay" />
        </span>
      </button>
      <button class="button" title="Skip next" @click.prevent="skipToNext">
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiSkipNext" />
        </span>
      </button>
      <button class="button" title="Like">
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiHeart" />
        </span>
      </button>
      <button class="button" title="Like" @click.prevent="refresh">
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiReload" />
        </span>
      </button>
    </div>
  </BrowserSourceControl>
</template>
