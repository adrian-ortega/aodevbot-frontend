import { defineStore, storeToRefs } from "pinia";
import { computed, reactive, watch } from "vue";
import { useWebsocketStore } from './websocket';

export const useChatStore = defineStore('chat', () => {
  const wsStore = useWebsocketStore();
  const state = reactive({
    status: 'Disconnected',
    chatter: null,
    chatters: [],
    replies: []
  });

  const setBroadcasterAsDefaultChatter = async () => {
    const response = await fetch('/api/broadcaster');
    const data = await response.json();
    state.chatter = { ...data };
  }

  const fetchChatters = async () => {
    const response = await fetch('/api/chatters');
    const data = await response.json();

    state.chatters = [...data];
  }

  const setChatter = (twitch_id) => {
    const chatter = state.chatters.find(c => c.twitch_id === twitch_id);
    state.chatter = { ...chatter };
  }

  const sendChatMessage = (message) => {
    wsStore.send('chat-message', {
      message,
      twitch_id: state.chatter.twitch_id
    })
  }

  wsStore.onMessage(({ event, payload }) => {
    if (event !== 'chat-message') return;
    state.replies.push(...payload.messages);
  });

  const { connected: wsConnected } = storeToRefs(wsStore);
  watch(wsConnected, (value) => {
    state.status = value ? 'Connected' : 'Reconnecting'
  });

  setBroadcasterAsDefaultChatter();

  return {
    chatter: computed(() => state.chatter),
    chatters: computed(() => state.chatters),
    status: computed(() => state.status),
    replies: computed(() => state.replies),

    fetchChatters,
    setChatter,
    sendChatMessage
  }
});
