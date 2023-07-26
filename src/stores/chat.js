import { defineStore, storeToRefs } from "pinia";
import { computed, reactive, watch } from "vue";
import { useWebsocketStore } from './websocket';

export const useChatStore = defineStore('chat', () => {
  const wsStore = useWebsocketStore();
  const state = reactive({
    status: 'Disconnected',
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
  });

  const { connected: wsConnected } = storeToRefs(wsStore);
  watch(wsConnected, (value) => {
    state.status = value ? 'Connected' : 'Reconnecting'
  })

  return {
    status: computed(() => state.status),
    replies: computed(() => state.replies),
    sendChatMessage
  }
});
