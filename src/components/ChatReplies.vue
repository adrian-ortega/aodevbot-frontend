<script setup>
import { useChatStore } from '../stores/chat';
const USER_COLOR = 'color';
const USER_DISPLAY_NAME = 'display-name';
const chatStore = useChatStore();
</script>
<template>
  <div class="chat__replies">
    <div v-for="({ user, html }) in chatStore.replies">
      <strong :style="{color: user[USER_COLOR]}">{{ user[USER_DISPLAY_NAME] }}</strong>
      <span v-html="html"></span>
    </div>
  </div>
</template>