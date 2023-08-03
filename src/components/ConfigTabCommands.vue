<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { useCommandsStore } from '../stores/commands';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMagnify } from '@mdi/js';
const cs = useCommandsStore();
const tab = ref('general')
const tabs = reactive({
  general: {
    label: 'General', type: 'general', active: true,
    description: 'Here you can manage your custom commands.'
  },
  custom: {
    label: 'Custom', type: 'custom', active: false,
    description: `
      These commands are made custom and stored within the bot code. 
      You can turn them on/off and manage some settings for each,
      if available.`
  }
});

const onTabChange = async (tabId) => {
  await cs.fetchItems({ type: tabs[tabId].type })
}

const selectTab = (tabId) => {
  Object.entries(tabs).forEach(([id]) => {
    tabs[id].active = id === tabId;
    if (tabs[id].active) {
      tab.value = id;
    }
  });  
}

watch(tab, onTabChange);
onMounted(() => {
  onTabChange(tab.value);
})
</script>

<template>
  <div class="config-view">
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
      <p v-html="tabs[tab].description"></p>
      <div class="table-wrapper">
        <div class="table-actions">
          <div class="table-actions__left">
            <label class="field">
              <input type="text" placeholder="Search commands"/>
              <span>
                <SvgIcon type="mdi" :path="mdiMagnify"/>
              </span>
            </label>
          </div>
          <div class="table-actions__right">
            Page 1 of 4
          </div>
        </div>
        <div class="table">
          <div class="table__header">
            <div class="table__row">
              <div class="table__cell cb table__cell--h"><input type="checkbox"/></div>
              <div class="table__cell table__cell--h">Information</div>
              <div class="table__cell table__cell--h">Actions</div>
            </div>
          </div>
          <div class="table__body">
            <div class="table__row" v-for="row in cs.items" :key="row.id">
              <div class="table__cell cb">
                <input type="checkbox"/>
              </div>
              <div class="table__cell">
                <pre>{{ row }}</pre>
              </div>
              <div class="table__cell">
                ...
              </div>
            </div>
          </div>
        </div>

        <div class="table-actions">

        </div>
      </div>
    </div>
  </div>
</template>
