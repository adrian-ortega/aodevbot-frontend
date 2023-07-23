import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { useWebsocketStore } from './websocket';

export const useChatStore = defineStore('chat', () => {
  const wsStore = useWebsocketStore();
  const state = reactive({
    replies: []
  });

  const sendChatMessage = (message) => {
    wsStore.send('chat-message', {
      message,
      twitch_id: 87329705
    })
  }

  wsStore.onMessage(({ event, payload }) => {
    if (event !== 'chat-message') return;
    state.replies.push(...payload.messages);
  })

  return {
    replies: computed(() => state.replies),
    sendChatMessage
  }
});
