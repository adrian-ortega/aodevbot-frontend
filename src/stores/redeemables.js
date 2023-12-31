import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
import { useWebsocketStore } from '../stores/websocket'
import { objectHasKey } from '../util'

export const useRedeemablesStore = defineStore('redeemables', () => {
  const webSocketStore = useWebsocketStore()
  const rewards = reactive({ data: [] })
  const state = reactive({
    firstToChat: null
  })

  webSocketStore.onMessage((data) => {
    if (!data.redeem) return
    const { type, payload } = data.redeem
    state[type] = payload
  })

  const fetchRewards = async () => {
    try {
      const response = await fetch('/api/twitch/chat/rewards')
      const data = await response.json()
      rewards.data = [...data.data]
      return rewards.data
    } catch (err) {
      // Do nothing
    }
    return []
  }

  return {
    state,
    rewards: computed(() => rewards.data),
    fetchRewards,
    firstToChat: computed(() => state.firstToChat),
    clearState: (key) => {
      if (objectHasKey(state, key)) {
        state[key] = null
      }
    }
  }
})
