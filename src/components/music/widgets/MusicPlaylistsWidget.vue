<script setup>
import MusicWidget from './MusicWidget.vue'
</script>
<template>
  <MusicWidget title="Recent Playlists">
    <ul>
      <li v-for="i in 5" :key="i">
        <div class="playlist">
          <div class="playlist__no">#{{ i }}</div>
          <div class="playlist__name">
            <h4>Playlist name</h4>
          </div>
          <div class="playlist__info">
            <div>Jan 22, 2024</div>
            <div><span>3</span> Participants</div>
            <div><span>48</span> Songs</div>
          </div>
        </div>
      </li>
    </ul>
    <p>
      <router-link :to="{name: 'music.playlists'}" class="button button--fw">
        <span class="text">All Playlists</span>
      </router-link>
    </p>
  </MusicWidget>
</template>