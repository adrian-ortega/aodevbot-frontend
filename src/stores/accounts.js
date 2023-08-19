import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useNotificationsStore } from "./notifications";


export const BROADCASTER_PRIMARY_ACCOUNT = 1;
export const BROADCASTER_SECONDARY_ACCOUNT = 2;
export const BROADCASTER_SPOTIFY_ACCOUNT = 3;

class BroadcasterError extends Error {
  constructor(message, data) {
    super(message);
    this.data = data;
  }
}

export const useAccountsStore = defineStore('accounts', () => {
  const hasBroadcaster = ref(false);
  const hasSecondary = ref(false);
  const hasAuxDisabled = ref(false);

  const accounts = reactive({
    items: {
      [BROADCASTER_PRIMARY_ACCOUNT]: null,
      [BROADCASTER_SECONDARY_ACCOUNT]: null,
      [BROADCASTER_SPOTIFY_ACCOUNT]: null
    },
    logins: {
      [BROADCASTER_PRIMARY_ACCOUNT]: null,
      [BROADCASTER_SECONDARY_ACCOUNT]: null,
      [BROADCASTER_SPOTIFY_ACCOUNT]: null
    }
  })

  let errorNotificationId;
  const notify = (message, type = 'info', { redirect }) => {
    const ns = useNotificationsStore();
    if (errorNotificationId) ns.dismiss(errorNotificationId);
    errorNotificationId = ns.append(message, type);
  }

  const getAuthUrl = async (type) => {
    try {
      let endpoint = `/api/twitch/authenticate?type=${type}`;
      if (type === BROADCASTER_SPOTIFY_ACCOUNT) {
        endpoint = '/api/spotify/authenticate'
      }
      const response = await fetch(endpoint);
      const { data } = await response.json();
      return data;
    } catch (err) { }
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
        notify('Cannot retrieve brodcaster. <a href="/config/accounts" class="button">Fix this</a>', 'error', { redirect: { name: 'config.accounts' } })
      }
    }
    return data;
  }

  const getBroadcaster = async () => {
    if (accounts.items[BROADCASTER_PRIMARY_ACCOUNT]) {
      return accounts.items[BROADCASTER_PRIMARY_ACCOUNT]
    }

    const data = await getBroadcasterAccount(BROADCASTER_PRIMARY_ACCOUNT);
    hasBroadcaster.value = data !== null;
    hasAuxDisabled.value = data === null;
    accounts.items[BROADCASTER_PRIMARY_ACCOUNT] = { ...data };
    accounts.logins[BROADCASTER_PRIMARY_ACCOUNT] = await getAuthUrl(BROADCASTER_PRIMARY_ACCOUNT)
    return data;
  }

  const getSecondary = async () => {
    if (accounts.items[BROADCASTER_SECONDARY_ACCOUNT]) {
      return accounts.items[BROADCASTER_SECONDARY_ACCOUNT]
    }

    const data = await getBroadcasterAccount(BROADCASTER_SECONDARY_ACCOUNT);
    hasSecondary.value = data !== null;
    accounts.items[BROADCASTER_SECONDARY_ACCOUNT] = { ...data };
    accounts.logins[BROADCASTER_SECONDARY_ACCOUNT] = await getAuthUrl(BROADCASTER_SECONDARY_ACCOUNT)
    return data;
  }

  const getSpotify = async () => {
    if (accounts.items[BROADCASTER_SPOTIFY_ACCOUNT]) {
      return accounts.items[BROADCASTER_SPOTIFY_ACCOUNT]
    }

    let data;
    try {
      const response = await fetch('/api/broadcaster/accounts/spotify');
      data = await response.json();
      if (data.error) {
        throw new BroadcasterError(data.message, data);
      }
    } catch (err) {
      data = null;
    }

    accounts.items[BROADCASTER_SPOTIFY_ACCOUNT] = { ...data };
    accounts.logins[BROADCASTER_SPOTIFY_ACCOUNT] = await getAuthUrl(BROADCASTER_SPOTIFY_ACCOUNT)
    return data;
  }

  const fetchAccounts = async () => {
    await getBroadcaster()
    await getSecondary()
    await getSpotify()
  }

  return {
    accounts: computed(() => accounts.items),
    logins: computed(() => accounts.logins),
    hasBroadcaster,
    hasAuxDisabled,
    fetchAccounts,
    getBroadcaster,
    getSecondary,
    getSpotify,
    getAuthUrl
  }
});