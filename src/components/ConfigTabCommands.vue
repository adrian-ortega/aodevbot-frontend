<script setup>
import ConfigTabCommandsList from './ConfigTabCommandsList.vue'
import ConfigTabCommandsCreate from './ConfigTabCommandsCreate.vue'
import ConfigTabCommandsEdit from './ConfigTabCommandsEdit.vue'
import { onMounted } from 'vue'
import { useCommandsStore } from '../stores/commands'
import { useRoute } from 'vue-router'

const route = useRoute()
const TAB_QS = 'subtab'
const cs = useCommandsStore()

onMounted(() => {
  let tabKey = route.query[TAB_QS]
  const tabKeys = Object.keys(cs.tabs)
  if (!isNaN(tabKey) && isFinite(tabKey)) {
    tabKey = Math.abs(parseInt(tabKey, 10))
    tabKey = tabKeys[tabKey <= tabKeys.length ? tabKey : 0]
  }

  if (!tabKey || !cs.tabs[tabKey]) {
    tabKey = tabKeys[0]
  }
  cs.selectTab(tabKey)
  if (route.query.mode) {
    cs.selectSubTab(route.query.mode)
  }
})
</script>

<template>
  <div class="config-view">
    <nav class="tabs">
      <a
        v-for="(tab, tabId) in cs.tabs"
        :class="{ tabs__trigger: true, 'is-active': tab.active }"
        :key="tabId"
        @click.prevent="() => cs.selectTab(tabId)"
      >
        <span>{{ tab.label }}</span>
        <span v-if="tab.active" class="tabs__trigger-bb"></span>
      </a>
    </nav>
    <div class="tabs__content">
      <p v-if="!cs.subTab || cs.subTab === 'list'" v-html="cs.currentTab.description"></p>
      <ConfigTabCommandsCreate v-if="cs.subTab === 'create'" />
      <ConfigTabCommandsEdit v-if="cs.subTab === 'edit'" />
      <ConfigTabCommandsList v-if="!cs.subTab || cs.subTab === 'list'" />
    </div>
  </div>
</template>
