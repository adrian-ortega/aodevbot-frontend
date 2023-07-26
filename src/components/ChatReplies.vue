<script setup>
import { useChatStore } from '../stores/chat';
const USER_COLOR = 'color';
const USER_DISPLAY_NAME = 'display-name';
const chatStore = useChatStore();
</script>
<template>
  <div class="chat__replies">
    <div class="chat__reply" v-for="({ user, html }) in chatStore.replies">
      <span class="chat__badge chat__badge--broadcaster">O</span>
      <span class="chat__badge chat__badge--sub">M</span>
      <span class="chat__badge">W</span>
      <span><strong :style="{color: user[USER_COLOR] }">{{ user[USER_DISPLAY_NAME] }}</strong>:</span>
      <span v-html="html"></span>
    </div>
  </div>
</template>