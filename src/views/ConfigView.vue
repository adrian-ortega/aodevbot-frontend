<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import PageHeader from '../components/PageHeader.vue';
import PageContent from '../components/PageContent.vue';
import PageFooter from '../components/PageFooter.vue';
import ConfigTabAcount from '../components/ConfigTabAccount.vue';
import ConfigTabCommands from '../components/ConfigTabCommands.vue';
import ConfigTabEvents from '../components/ConfigTabEvents.vue'
import ConfigTabRedeemables from '../components/ConfigTabRedeemables.vue';
import { computed, reactive } from 'vue';
import { mdiDotsVertical } from '@mdi/js';

const tabs = reactive({
  account: { label: 'Accounts', component: ConfigTabAcount, active: true },
  commands: { label: 'Commands', component: ConfigTabCommands, active: false },
  events: { label: 'Events', component: ConfigTabEvents, active: false },
  redeemables: { label: 'Redeemables', component: ConfigTabRedeemables, active: false }
});
const selectTab = (tabId) => {
  Object.entries(tabs).forEach(([id]) => {
    tabs[id].active = id === tabId;
  });  
}
const selectedTabComponent = computed((...args) => {
  const keys = Object.keys(tabs);
  for (let i = 0; i < keys.length; i++) {
    if (tabs[keys[i]].active) {
      return tabs[keys[i]].component;
    }
  }
})
</script>

<template>
  <PageHeader title="Settings">
    <template v-slot:right>
      <button class="button button--transparent">
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiDotsVertical"/>
        </span>
      </button>
    </template>
  </PageHeader>

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
    <component :is="selectedTabComponent" />
  </PageContent>

  <PageFooter>
    <button class="button button--primary button--fw is-disabled" disabled>
        <span class="text">Save</span>
      </button>
  </PageFooter>
</template>
