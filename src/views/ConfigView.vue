<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import Chat from '../components/chat/Chat.vue'
import PageHeader from '../components/page/PageHeader.vue'
import PageContent from '../components/page/PageContent.vue'
import PageNotifications from '../components/page/PageNotifications.vue'
import ConfigTabs from '../components/config/ConfigTabs.vue'
import { mdiArrowCollapseLeft, mdiArrowRight } from '@mdi/js'
import { useLocalStore } from '../stores/local'
import { ref } from 'vue'

const ls = useLocalStore()
const LOCAL_STORAGE_KEY = 'debug:sidebar'
const isCollapsed = ref(ls.get(LOCAL_STORAGE_KEY, true))
const toggleCollapsed = () => {
  isCollapsed.value = !isCollapsed.value
  ls.save(LOCAL_STORAGE_KEY, isCollapsed.value)
}
</script>

<template>
  <PageHeader title="Settings" />
  <PageContent>
    <div class="container" :class="{ 'sidebar-collapsed': isCollapsed }">
      <div class="content">
        <div class="content__scroller">
          <ConfigTabs />
          <router-view class="tabs__content" />
        </div>
      </div>
      <div class="sidebar">
        <button
          class="button button--close"
          @click.prevent="toggleCollapsed"
          :title="isCollapsed ? 'Open Chat' : 'Close Chat'"
        >
          <span class="icon">
            <SvgIcon v-if="isCollapsed" type="mdi" :path="mdiArrowCollapseLeft" />
            <SvgIcon v-else type="mdi" :path="mdiArrowRight" />
          </span>
        </button>
        <Chat v-if="!isCollapsed" />
      </div>
    </div>
  </PageContent>
  <PageNotifications />
</template>
