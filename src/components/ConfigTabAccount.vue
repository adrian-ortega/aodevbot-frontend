<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import ConfigTabAccountItem from './ConfigTabAccountItem.vue';
import InlineNotification from '../components/InlineNotification.vue'
import { onMounted, ref } from 'vue';
import { useAccountsStore } from '../stores/accounts';
import { mdiDotsCircle } from '@mdi/js';
const accountsStore = useAccountsStore();
const loading = ref(true);
let primaryAccount, primaryAccountLoginUrl, botAccount, botAccountLoginUrl;

onMounted(async () => {
  loading.value = true;
  primaryAccount = await accountsStore.getBroadcaster();
  primaryAccountLoginUrl = await accountsStore.getAuthUrl(1);
  botAccount = await accountsStore.getSecondary();
  botAccountLoginUrl = await accountsStore.getAuthUrl(2);
  loading.value = false;
});
</script>

<template>
  <div class="config-view">
    <div class="page-sub-header">
      <InlineNotification is-warning v-if="!accountsStore.hasBroadcaster">
        <p>Please log into your Twitch account below</p>
      </InlineNotification>
      <p>
        Here you set your primary Twitch Streaming account and have the option to set a
        secondary account as the <span class="icon">🤖</span> "bot".
      </p>
    </div>
    <template v-if="loading">
      <SvgIcon type="mdi" :path="mdiDotsCircle"/>
    </template>
    <div class="accounts" v-else>
      <ConfigTabAccountItem
        title="Primary Twitch Account"
        :account="primaryAccount"
        :login-url="primaryAccountLoginUrl"
        help-text="Please log in to use this app"
      />
      <ConfigTabAccountItem
        title="Bot Twitch Account"
        :account="botAccount"
        :login-url="botAccountLoginUrl"
        help-text="Bot accounts are optional"
      />
    </div>
  </div>
</template>
