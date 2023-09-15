<script setup>
import noSongJpg from '../../assets/jpg/no-song.jpg'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiSpotify } from '@mdi/js'
import { useSpotifyStore } from '../../stores/spotify'
import { onMounted } from 'vue'
const ss = useSpotifyStore()
onMounted(() => {
  ss.refresh()
})
</script>
<template>
  <div
    class="spotify-player"
    :class="{
      'animate-out': !ss.isPlaying,
      'animate-in': ss.isPlaying && ss.isTrack
    }"
  >
    <div class="spotify-player__container">
      <div class="spotify-player__track">
        <div class="spotify-player__album">
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
        <div class="spotify-player__content">
          <div class="spotify-player__title">
            <div :class="{ marquee: ss.track ? ss.track.name.length > 11 : false }">
              <div>
                <template v-if="ss.track">{{ ss.track.name }}</template>
                <template v-else>Nothing playing</template>
              </div>
            </div>
          </div>
          <div class="spotify-player__artist">
            <div
              :class="{
                marquee: ss.trackArtist
                  ? ss.track.artists.map((a) => a.name).join(', ').length > 23
                  : false
              }"
            >
              <div>
                <template v-if="ss.trackArtist">{{
                  ss.track.artists.map((a) => a.name).join(', ')
                }}</template>
                <template v-else>No Artist</template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="spotify-player__brand">
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiSpotify" />
        </span>
      </div>
      <div class="spotify-player__progress">
        <div :style="{ width: ss.progressPercentage + '%' }"></div>
      </div>
    </div>
  </div>
</template>
