<script setup>
import PageHeader from '../components/PageHeader.vue';
import PageContent from '../components/PageContent.vue';
import PageNotifications from '../components/PageNotifications.vue';
import ConfigTabAcount from '../components/ConfigTabAccount.vue';
import ConfigTabCommands from '../components/ConfigTabCommands.vue';
import ConfigTabEvents from '../components/ConfigTabEvents.vue'
import ConfigTabRedeemables from '../components/ConfigTabRedeemables.vue';
import { onMounted, reactive, ref, shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const TAB_QS = 'tab';
const tab = ref('account');
const tabs = reactive({
  account: {
    label: 'Accounts', component: shallowRef(ConfigTabAcount)
  },
  commands: {
    label: 'Commands', component: shallowRef(ConfigTabCommands)
  },
  events: {
    label: 'Events', component: shallowRef(ConfigTabEvents)
  },
  redeemables: {
    label: 'Redeemables', component: shallowRef(ConfigTabRedeemables)
  }
});
const selectTab = (tabId) => {
  Object.entries(tabs).forEach(([id]) => {
    tabs[id].active = id === tabId;
    if (tabs[id].active) {
      tab.value = id;
    }
  });  
}

const selectTabFromQueryString = () => {
  let tabKey = route.query[TAB_QS];
  const tabKeys = Object.keys(tabs);
  if (!isNaN(tabKey) && isFinite(tabKey)) {
    tabKey = Math.abs(parseInt(tabKey, 10));
    tabKey = Object.keys(tabs)[tabKey <= tabKeys.length ? tabKey : 0];
  }

  if (!tabKey || !tabs[tabKey]) {
    tabKey = tabKeys[0];
  }
  selectTab(tabKey)
}

onMounted(() => selectTabFromQueryString());
</script>

<template>
  <PageHeader title="Settings"/>
  <PageContent>
    <nav class="tabs">
      <a
        v-for="(tab, tabId) in tabs"
        :class="{ 'tabs__trigger': true, 'is-active': tab.active}"
        :key="tabId"
        @click.prevent="() => selectTab(tabId)"
      >
        <span>{{ tab.label }}</span>
        <span v-if="tab.active" class="tabs__trigger-bb"></span>
      </a>
    </nav>
    <div class="tabs__content">
      <component v-if="tab" :is="tabs[tab].component" />
    </div>
  </PageContent>
  <PageNotifications/>
</template>
