<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import Chat from '../components/chat/Chat.vue'
import PageContent from '../components/page/PageContent.vue'
import PageHeader from '../components/page/PageHeader.vue'
import PageNotifications from '../components/page/PageNotifications.vue'
import { mdiArrowCollapseLeft, mdiArrowRight } from '@mdi/js'
import { useLocalStore } from '../stores/local';
import { onMounted, ref } from 'vue';

const ls = useLocalStore();
const LOCAL_STORAGE_KEY = 'layout:sidebar'
const isCollapsed = ref(ls.get(LOCAL_STORAGE_KEY, true))
const toggleCollapsed = () => {
  isCollapsed.value = !isCollapsed.value
  ls.save(LOCAL_STORAGE_KEY,  isCollapsed.value)
}

const props = defineProps({
  title: {
    type:  String,
    default: ''
  }
})

onMounted(() => {
  const $app = document.querySelector('#app');
  if($app) {
    $app.className = '';
    const classNames = ['layout', 'layout--sidebar'];
    
    $app.classList.add(...classNames)
  }
})
</script>

<template>
  <PageHeader :title="props.title"/>
  <PageContent>
    <div class="container" :class="{ 'sidebar-collapsed': isCollapsed }">
      <div class="content">
        <div class="content__scroller">
          <slot/>
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
          <span class="popup-text popup-text--bottom">{{
            isCollapsed ? 'Open Chat' : 'Close Chat'
          }}</span>
        </button>
        <Chat v-if="!isCollapsed" />
      </div>
    </div>
  </PageContent>
  <PageNotifications />
</template>