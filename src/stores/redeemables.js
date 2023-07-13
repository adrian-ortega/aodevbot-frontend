import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { useWebsocketStore } from "../stores/websocket";

export const useRedeemablesStore = defineStore('redeemables', () => {
  const webSocketStore = useWebsocketStore();
  const state = reactive({
    firstToChat: null
  });

  webSocketStore.onMessage((data) => {
    if (!data.redeem) return;
    const { type, payload } = data.redeem;
    state[type] = payload;
  });

  return {
    state,
    firstToChat: computed(() => state.firstToChat)
  }
});