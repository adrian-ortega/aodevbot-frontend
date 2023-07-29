<script setup>
import ChatStatus from '../components/ChatStatus.vue'
import ChatReplies from '../components/ChatReplies.vue';
import ChatReplyForm from '../components/ChatReplyForm.vue';
</script>

<template>
  <div class="chat">
    <ChatStatus/>
    <ChatReplies/>
    <ChatReplyForm/>
  </div>
</template>
