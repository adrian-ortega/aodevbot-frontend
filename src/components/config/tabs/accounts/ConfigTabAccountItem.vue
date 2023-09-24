<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiChevronRight } from '@mdi/js'
import { computed } from 'vue'
import { objectHasKey, popupWindowCenter } from '../../../../util'

let loginIframe

const props = defineProps({
  title: String,
  tokenType: String,
  icon: String,
  loginUrl: String,
  helpText: String,
  disabled: Boolean,
  account: {
    type: Object,
    required: false
  }
})

const expires_at = computed(() => {
  const df = (ms) => {
    const d = new Date(ms)
    return d <= new Date() ? 'Expired' : d.toLocaleString()
  }

  if (!objectHasKey(props.account, 'tokens')) {
    return objectHasKey(props.account, 'expires_at') ? df(props.account.expires_at) : null
  }

  return !props.tokenType || !objectHasKey(props.account.tokens, props.tokenType)
    ? null
    : df(props.account.tokens[props.tokenType].expires_at)
})
const loginButtonText = computed(() => (props.account ? 'Change' : 'Login'))
const openLoginPopup = () => {
  window.onmessage = (e) => {
    console.log(e)
  }

  if (loginIframe) loginIframe.close()

  loginIframe = popupWindowCenter({
    url: props.loginUrl,
    title: 'Login with Twitch'
  })
}
</script>

<template>
  <div class="accounts__item" :class="{ 'accounts__item--disabled': disabled }">
    <div>
      <span class="icon">
        <SvgIcon type="mdi" :path="icon" />
      </span>
    </div>
    <div>
      <h3>{{ title }}</h3>
      <div class="linked-account">
        <template v-if="account">
          <p>
            Logged in as <strong>{{ account.display_name }}</strong>
          </p>
          <p v-if="tokenType">
            <small v-if="expires_at && expires_at.toLowerCase() === 'expired'" class="error"
              ><strong class="is-error-text">Token Expired </strong></small
            >
            <small v-else>Token Expires at {{ expires_at }}</small>
          </p>
        </template>
        <p v-else>{{ helpText }}</p>
      </div>
    </div>
    <div>
      <button class="button" @click.prevent="() => openLoginPopup()" :disabled="disabled">
        <span class="text">{{ loginButtonText }}</span>
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiChevronRight" />
        </span>
      </button>
    </div>
  </div>
</template>
