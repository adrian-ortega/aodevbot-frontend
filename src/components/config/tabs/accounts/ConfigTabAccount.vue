<script setup>
import ConfigTabAccountItem from './ConfigTabAccountItem.vue'
import InlineNotification from '../../../InlineNotification.vue'
import { mdiSpotify, mdiTwitch } from '@mdi/js'
import { onMounted } from 'vue'
import {
  useAccountsStore,
  BROADCASTER_PRIMARY_ACCOUNT,
  BROADCASTER_SECONDARY_ACCOUNT,
  BROADCASTER_SPOTIFY_ACCOUNT
} from '../../../../stores/accounts'
const store = useAccountsStore()
onMounted(async () => store.fetchAccounts())
</script>

<template>
  <div class="config-view">
    <div class="edit-form">
      <div class="page-sub-header">
        <InlineNotification is-warning v-if="!store.hasBroadcaster">
          <p>
            Please log into your Twitch account below. After you've done so, you will be able to log
            into your other accounts.
          </p>
        </InlineNotification>
        <p>
          Here you set your primary Twitch Streaming account and have the option to set a secondary
          account as the <span class="icon">🤖</span> "bot". This is also where you link your other
          accounts that support the bot.
        </p>
      </div>
      <div class="accounts">
        <ConfigTabAccountItem
          title="Primary Twitch Account"
          class="accounts__item--twitch"
          :icon="mdiTwitch"
          :account="store.accounts[BROADCASTER_PRIMARY_ACCOUNT]"
          :login-url="store.logins[BROADCASTER_PRIMARY_ACCOUNT]"
          token-type="twitch"
          help-text="Please log in to use this app"
        />
        <ConfigTabAccountItem
          title="Bot Twitch Account"
          class="accounts__item--twitch accounts__item--twitch-alt"
          :icon="mdiTwitch"
          :account="store.accounts[BROADCASTER_SECONDARY_ACCOUNT]"
          :login-url="store.logins[BROADCASTER_SECONDARY_ACCOUNT]"
          :disabled="store.hasAuxDisabled"
          token-type="twitch"
          help-text="Bot accounts are optional"
        />
        <ConfigTabAccountItem
          title="Spotify Account"
          class="accounts__item--spotify"
          :icon="mdiSpotify"
          :account="store.accounts[BROADCASTER_SPOTIFY_ACCOUNT]"
          :login-url="store.logins[BROADCASTER_SPOTIFY_ACCOUNT]"
          :disabled="store.hasAuxDisabled"
          token-type="spotify"
          help-text="Is used to add songs to your queue"
        />
      </div>
    </div>
  </div>
</template>
