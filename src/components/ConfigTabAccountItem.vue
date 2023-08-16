<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiChevronRight } from '@mdi/js'
import { computed } from 'vue'
import { popupWindowCenter } from '../util'

let loginIframe

const props = defineProps({
  title: String,
  icon: String,
  loginUrl: String,
  helpText: String,
  disabled: Boolean,
  account: {
    type: Object,
    required: false
  }
})

const loginButtonText = computed(() => (props.account ? 'Change' : 'Login'))
const openLoginPopup = () => {
  window.onmessage = (e) => {
    console.log(e)
  }

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
        <p v-if="account">Logged in as @{{ account.display_name }}</p>
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
