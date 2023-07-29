<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import ConfigTabAccountItem from './ConfigTabAccountItem.vue';
import InlineNotification from '../components/InlineNotification.vue'
import { onMounted, ref } from 'vue';
import { useAccountsStore } from '../stores/accounts';
import { mdiDotsCircle } from '@mdi/js';
const accountsStore = useAccountsStore();
const loading = ref(true);
let primaryAccount, botAccount;

onMounted(async () => {
  loading.value = true;
  primaryAccount = await accountsStore.getBroadcaster();
  botAccount = await accountsStore.getBot();
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
        help-text="Please log in to use this app"
        :login-url="accountsStore.getAuthUrl('admin')"
      />
      <ConfigTabAccountItem
        title="Bot Twitch Account"
        :account="botAccount"
        help-text="Bot accounts are optional"
        :login-url="accountsStore.getAuthUrl('bot')"
      />
    </div>
  </div>
</template>
