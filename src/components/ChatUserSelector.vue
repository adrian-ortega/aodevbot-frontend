<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import AvatarImage from './AvatarImage.vue'
import { useChatStore } from '../stores/chat'
import { ref } from 'vue'
import { mdiClose, mdiCheckBold } from '@mdi/js'
import FormField from './FormField.vue'
import debounce from 'lodash.debounce'

const emit = defineEmits(['chatFocus'])

const chatStore = useChatStore()
const popup = ref(null)
const popupSearch = ref('')
const popupSearchInput = ref(null)
const showPopup = ref(false)

const searchUsers = () => chatStore.fetchChatters({ search: popupSearch.value })

const blurredSearch = debounce(searchUsers, 500)

const outsideClickEventHandler = (event) => {
  if (!showPopup.value) return false
  const $el = popup.value
  if (event.target !== $el && !$el.contains(event.target)) {
    closeUsersPopup()
  }
}

const escapeKeyHandler = (event) => {
  if (event.keyCode === 27) closeUsersPopup()
}

const openUsersPopup = async () => {
  await searchUsers()
  showPopup.value = true
  document.addEventListener('keyup', escapeKeyHandler, false)
  document.addEventListener('click', outsideClickEventHandler, false)
  setTimeout(() => {
    popupSearchInput.value.focus()
  }, 100)
}
const closeUsersPopup = () => {
  showPopup.value = false
  document.removeEventListener('keyup', escapeKeyHandler, false)
  document.removeEventListener('click', outsideClickEventHandler, false)
}

const selectChatter = (twitch_id) => {
  chatStore.setChatter(twitch_id)
  closeUsersPopup()
  emit('chatFocus')
}

const isSelectedChatter = (twitch_id) =>
  chatStore.chatter && chatStore.chatter.twitch_id === twitch_id
</script>

<template>
  <div class="chat__user-selector">
    <div ref="popup" class="selector-popup" v-if="showPopup">
      <div class="selector-popup__header">
        <h4>Select a user</h4>
        <button class="button button--close" @click.prevent="closeUsersPopup">
          <span class="icon">
            <SvgIcon type="mdi" :path="mdiClose" />
          </span>
        </button>

        <FormField vertical="">
          <input type="text" ref="popupSearchInput" v-model="popupSearch" @keyup="blurredSearch" />
        </FormField>
      </div>
      <div class="selector-popup__body">
        <div>
          <div
            v-for="chatter in chatStore.chatters"
            :key="chatter.twitch_id"
            :class="{
              'is-active': isSelectedChatter(chatter.twitch_id)
            }"
            class="button button--transparent"
            :disabled="isSelectedChatter(chatter.twitch_id)"
            @click.prevent="selectChatter(chatter.twitch_id)"
          >
            <AvatarImage :src="chatter.profile_image_url" />
            <span class="text">
              {{ chatter.display_name }}
            </span>
            <span class="icon" v-if="isSelectedChatter(chatter.twitch_id)">
              <SvgIcon type="mdi" :path="mdiCheckBold" />
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="button" @click.prevent="() => openUsersPopup()" v-if="chatStore.chatter">
      <AvatarImage :src="chatStore.chatter.profile_image_url" />
    </div>
  </div>
</template>
