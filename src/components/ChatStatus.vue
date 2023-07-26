<script setup>
import { storeToRefs } from 'pinia';
import { useChatStore } from '../stores/chat';
const chatStore = useChatStore();
const { status } = storeToRefs(chatStore);
console.log(status);
</script>
<template>
  <div class="chat__status">
    <p>{{ status }}</p>
  </div>
</template>