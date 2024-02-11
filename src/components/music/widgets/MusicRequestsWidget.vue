<script setup>
import MusicWidget from './MusicWidget.vue'
</script>

<template>
  <MusicWidget title="Requests">
    <div class="widget__stat">
      <span class="widget__stat-value">1,200</span>
      <span class="widget__stat-label">Song Requests</span>
    </div>
    <dl>
      <dt>Top Requester</dt>
      <dd>SomethingWitty</dd>

      <dt>Most Requested</dt>
      <dd>
        <div class="song-name">Song name</div>
        <div class="song-artist">Artist</div>
      </dd>
    </dl>
    <p>
      <router-link :to="{name: 'music.playlists'}" class="button button--fw">
        <span class="text">All Requests</span>
      </router-link>
    </p>
  </MusicWidget>
</template>