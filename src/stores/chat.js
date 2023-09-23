import { defineStore, storeToRefs } from 'pinia'
import { computed, reactive, watch } from 'vue'
import { useWebsocketStore } from './websocket'
import { useAccountsStore } from './accounts'
import { createUrlSearchParams } from '../util'

export const useChatStore = defineStore('chat', () => {
  const wsStore = useWebsocketStore()
  const accountsStore = useAccountsStore()
  const state = reactive({
    status: 'Disconnected',
    chatter: null,
    chatters: [],
    replies: []
  })

  const setBroadcasterAsDefaultChatter = async () => {
    if (!accountsStore.broadcaster) {
      setTimeout(setBroadcasterAsDefaultChatter, 10)
      return
    }
    state.chatter = { ...accountsStore.broadcaster }
  }

  const fetchChatters = async ({ search = '' }) => {
    const response = await fetch(
      `/api/chatters?${createUrlSearchParams({
        page: 1,
        limit: 10,
        search
      })}`
    )

    const { data } = await response.json()

    state.chatters = [...data]
  }

  const setChatter = (twitch_id) => {
    const chatter = state.chatters.find((c) => c.twitch_id === twitch_id)
    state.chatter = { ...chatter }
  }

  const sendChatMessage = (message) => {
    wsStore.send('chat-message', {
      message,
      twitch_id: state.chatter.twitch_id
    })
  }

  wsStore.onMessage(({ event, payload }) => {
    if (event !== 'chat-message') return
    state.replies.push(...payload.messages)
  })

  const { connected: wsConnected } = storeToRefs(wsStore)
  watch(wsConnected, (value) => {
    state.status = value ? 'Connected' : 'Reconnecting'
  })

  setBroadcasterAsDefaultChatter()

  return {
    chatter: computed(() => state.chatter),
    chatters: computed(() => state.chatters),
    status: computed(() => state.status),
    replies: computed(() => state.replies),

    fetchChatters,
    setChatter,
    sendChatMessage
  }
})
