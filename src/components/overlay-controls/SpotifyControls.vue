<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { useSpotifyStore } from '../../stores/spotify'
import { mdiPlay, mdiSkipNext, mdiSkipPrevious, mdiStop, mdiHeart } from '@mdi/js'
const spotify = useSpotifyStore()
</script>

<template>
  <fieldset>
    <legend>Spotify</legend>
    <div class="field">
      <template v-if="spotify.currentlyPlayingType === 'ad'">
        <div class="spotify-track">
          <div class="spotify-track__image">ad</div>
          <div class="spotify-track__info">
            <figure>AD</figure>
          </div>
          <div class="spotify-track__progress">
            <div
              class="spotify-track__progress-bar"
              :style="{ width: spotify.progressPercentage + '%' }"
            ></div>
          </div>
        </div>
      </template>
      <template v-if="spotify.track">
        <div class="spotify-track">
          <div class="spotify-track__image">
            <figure class="square-img">
              <span>
                <img
                  :src="spotify.trackAlbum.images[spotify.trackAlbum.images.length - 1].url"
                  alt=""
                />
              </span>
            </figure>
          </div>
          <div class="spotify-track__info">
            <div class="spotify-track__song-name">{{ spotify.track.name }}</div>
            <div class="spotify-track__artist">{{ spotify.trackArtist.name }}</div>
          </div>
          <div class="spotify-track__progress">
            <div
              class="spotify-track__progress-bar"
              :style="{ width: spotify.progressPercentage + '%' }"
            ></div>
          </div>
        </div>
      </template>
    </div>
    <div class="form-buttons">
      <button class="button">
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiSkipPrevious" />
        </span>
        <span class="text">Prev</span>
      </button>
      <button class="button">
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiStop" />
        </span>
        <span class="text">Stop</span>
      </button>
      <button class="button">
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiPlay" />
        </span>
        <span class="text">Play</span>
      </button>
      <button class="button">
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiHeart" />
        </span>
      </button>
      <button class="button">
        <span class="text">Next</span>
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiSkipNext" />
        </span>
      </button>
    </div>
  </fieldset>
</template>
