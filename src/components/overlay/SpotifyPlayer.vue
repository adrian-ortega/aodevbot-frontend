<script setup>
import placeholderImg from '../../assets/gifs/friends-hug.gif'
</script>
<template>
  <div class="spotify-player animate-in">
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
      <div class="spotify-player__progress">
        <div :style="{ width: '25%' }"></div>
      </div>
    </div>
  </div>
</template>
