<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import AvatarImage from './AvatarImage.vue';
import { useChatStore } from '../stores/chat';
import { ref } from 'vue';
import { mdiClose } from '@mdi/js'

const chatStore = useChatStore();
const showPopup = ref(false)

const openUsersPopup = async () => {
  await chatStore.fetchChatters();
  console.log(chatStore.chatters)
  showPopup.value = true;
}
const closeUsersPopup = () => {
  showPopup.value = false;
}
</script>

<template>
  <div class="chat__user-selector">
    <div class="selector-popup" v-if="showPopup">
      <div class="selector-popup__header">
        <div>
          <p>Users</p>
          <p><small>to impersonate</small></p>
        </div>
        <div>
          <button class="button button--close" @click.prevent="closeUsersPopup">
            <span class="icon">
              <SvgIcon type="mdi" :path="mdiClose"/>
            </span>
          </button>
        </div>
      </div>
      <div class="selector-popup__body">
        <button
          v-for="chatter in chatStore.chatters"
          class="button button--transparent"
        >
          <AvatarImage :src="chatter.profile_image_url"/>
          <span class="text">
            {{ chatter.display_name }}
          </span>
        </button>
      </div>
    </div>
    
    <button class="button" @click.prevent="openUsersPopup" v-if="chatStore.chatter">
      <AvatarImage :src="chatStore.chatter.profile_image_url"/>
    </button>
  </div>
</template>
