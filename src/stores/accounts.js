import { ref } from "vue";
import { defineStore } from "pinia";
import { useNotificationsStore } from "./notifications";

export const useAccountsStore = defineStore('accounts', () => {
  const hasBroadcaster = ref(false);
  const hasSecondary = ref(false);
  let errorNotificationId;
  const notify = (message, type = 'info') => {
    const ns = useNotificationsStore();
    if (errorNotificationId) ns.dismiss(errorNotificationId);
    errorNotificationId = ns.append(message, type);
  }

  const getBroadcasterAccount = async (type) => {
    let data;
    try {
      const response = await fetch(`/api/broadcaster${type === 2 ? '/secondary' : ''}`);
      data = await response.json();
    } catch (error) {
      data = null;
      notify('Cannot retrieve brodcaster.', 'error')
    }
    return data;
  }
  const getBroadcaster = async () => {
    const data = await getBroadcasterAccount(1);
    hasBroadcaster.value = data !== null;
    return data;
  }

  const getSecondary = async () => {
    const data = await getBroadcasterAccount(2);
    hasSecondary.value = data !== null;
    return data;
  }

  const getAuthUrl = async (type) => {
    try {
      const response = await fetch(`/api/twitch/authenticate?type=${type}`);
      const { data } = await response.json();
      return data;
    } catch (err) { }
  }

  return {
    hasBroadcaster,
    getBroadcaster,
    getSecondary,
    getAuthUrl
  }
});