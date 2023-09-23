<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import Chat from '../components/chat/Chat.vue'
import BrowserSourceControls from '../components/browser-source/BrowserSourceControls.vue'
import BrowserSourceOverlay from '../components/browser-source/BrowserSourceOverlay.vue'
import BrowserSourceTerminal from '../components/browser-source/BrowserSourceTerminal.vue'
import PageHeader from '../components/page/PageHeader.vue'
import { mdiArrowCollapseLeft, mdiArrowRight } from '@mdi/js'
import { useLocalStore } from '../stores/local'
import { ref } from 'vue'

const ls = useLocalStore()
const LOCAL_STORAGE_KEY = 'debug:sidebar'
const isCollapsed = ref(ls.get(LOCAL_STORAGE_KEY, false))
const toggleCollapsed = () => {
  isCollapsed.value = !isCollapsed.value
  ls.save(LOCAL_STORAGE_KEY, isCollapsed.value)
}
</script>

<template>
  <PageHeader title="Debug" />
  <div class="container" :class="{ 'sidebar-collapsed': isCollapsed }">
    <div class="content">
      <div class="content__scroller">
        <fieldset class="overlay-debug">
          <legend>Browser Source</legend>
          <BrowserSourceOverlay />
        </fieldset>
        <BrowserSourceControls />
        <BrowserSourceTerminal />
      </div>
    </div>
    <div class="sidebar">
      <button class="button button--close" @click.prevent="toggleCollapsed">
        <span class="icon">
          <SvgIcon v-if="isCollapsed" type="mdi" :path="mdiArrowCollapseLeft" />
          <SvgIcon v-else type="mdi" :path="mdiArrowRight" />
        </span>
      </button>
      <Chat v-if="!isCollapsed" />
    </div>
  </div>
</template>
