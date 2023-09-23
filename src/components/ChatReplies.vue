<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { computed, ref, watch } from 'vue'
import { mdiCamera } from '@mdi/js'
import { useChatStore } from '../stores/chat'

const USER_COLOR = 'color'
const USER_DISPLAY_NAME = 'display-name'
const USER_ID = 'user-id'
const USER_ROOM_ID = 'room-id'
const USER_IS_MOD = 'mod'
const USER_TYPE = 'user-type'
const USER_TMI_SENT_STAMP = 'tmi-sent-ts'

const chatStore = useChatStore()
const scrollBox = ref(null)

watch(chatStore.replies, () => {
  setTimeout(() => {
    scrollBox.value.scrollTop = scrollBox.value.scrollHeight
  }, 1)
})

const replies = computed(() =>
  chatStore.replies.map((r) => ((r.vkey = `${r.user[USER_ID]}-${r.user[USER_TMI_SENT_STAMP]}`), r))
)
</script>
<template>
  <div class="chat__replies">
    <div class="chat__replies-box" ref="scrollBox">
      <div class="chat__reply" v-for="{ user, html, vkey } in replies" :key="vkey">
        <span
          class="chat__badge chat__badge--broadcaster"
          v-if="user[USER_ID] === user[USER_ROOM_ID]"
        >
          <SvgIcon type="mdi" :path="mdiCamera" size="16" />
        </span>
        <span class="chat__badge chat__badge--sub" v-if="user[USER_IS_MOD]">
          <SvgIcon type="mdi" :path="mdiCamera" size="16" />
        </span>
        <span class="chat__badge" v-if="user[USER_TYPE] === 'sub'"> S </span>
        <span
          ><strong :style="{ color: user[USER_COLOR] }">{{ user[USER_DISPLAY_NAME] }}</strong
          >:</span
        >
        <span v-html="html"></span>
      </div>
    </div>
  </div>
</template>
