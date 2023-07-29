import { ref } from "vue";
import { defineStore } from "pinia";

export const useAccountsStore = defineStore('accounts', () => {
  const hasBroadcaster = ref(false);
  const getBroadcaster = async () => {
    let data;
    try {
      const response = await fetch('/api/broadcaster');
      data = await response.json();
    } catch (error) {
      data = null
    }

    hasBroadcaster.value = data !== null;
    return data;
  }

  const getBot = async () => {
    return null;
  }

  const getAuthUrl = (type) => {
    return '#';
  }

  return {
    hasBroadcaster,
    getBroadcaster,
    getBot,
    getAuthUrl
  }
});