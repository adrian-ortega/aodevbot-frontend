import { ref } from "vue";
import { defineStore } from "pinia";
import { useNotificationsStore } from "./notifications";

export const BROADCASTER_PRIMARY_ACCOUNT = 1;
export const BROADCASTER_SECONDARY_ACCOUNT = 2;
class BroadcasterError extends Error {
  constructor(message, data) {
    super(message);
    this.data = data;
  }
}

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
      if (data.error) {
        throw new BroadcasterError(data.message, data);
      }
    } catch (error) {
      data = null;
      if (error instanceof BroadcasterError && error.data.type === BROADCASTER_PRIMARY_ACCOUNT) {
        notify('Cannot retrieve brodcaster.', 'error')
      }
    }
    return data;
  }
  const getBroadcaster = async () => {
    const data = await getBroadcasterAccount(BROADCASTER_PRIMARY_ACCOUNT);
    hasBroadcaster.value = data !== null;
    return data;
  }

  const getSecondary = async () => {
    const data = await getBroadcasterAccount(BROADCASTER_SECONDARY_ACCOUNT);
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