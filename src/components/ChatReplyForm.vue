<script setup>
import { useChatStore } from '../stores/chat.js';
import { ref } from 'vue';

const chatStore = useChatStore();
const chatInput = ref('');
const chatInputElement = ref(null);
const submitForm = () => {
  const message = chatInput.value
  if (message.length < 1) return;
  chatInput.value = '';
  chatStore.sendChatMessage(message)
}
</script>

<template>
  <form
    class="chat__form"
    action="/"
    method="POST"
    @submit.prevent="submitForm"
  >
    <div class="chat__input">
      <input
      type="text"
      ref="chatInputElement"
      v-model="chatInput"
      @keyup.enter.prevent="submitForm"
    />
    </div>
    <div class="chat__settings">
      <div>
        <button class="button">O</button>
      </div>
      <div>
        <button class="button button--primary" @click.prevent="submitForm">Send</button>
      </div>
    </div>
  </form>
</template>
