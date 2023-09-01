<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import placeholderImg from '../../assets/gifs/friends-hug.gif'
import { mdiSpotify } from '@mdi/js'
</script>
<template>
  <div class="spotify-player">
    <div class="spotify-player__container">
      <div class="spotify-player__track">
        <div class="spotify-player__album">
          <img :src="placeholderImg" alt="" />
        </div>
        <div class="spotify-player__content">
          <div class="spotify-player__title">
            <div :class="{ marquee: false }">
              <div>A Song Title</div>
            </div>
          </div>
          <div class="spotify-player__artist">
            <div :class="{ marquee: false }">
              <div>Artist</div>
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
        <div :style="{ width: '25%' }"></div>
      </div>
    </div>
  </div>
</template>
