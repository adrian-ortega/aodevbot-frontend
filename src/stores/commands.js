import { defineStore } from "pinia";
import { computed, ref, reactive, watch } from "vue";
import { createUrlSearchParams } from '../util';

export const useCommandsStore = defineStore("commands", () => {
  const fetching = ref(false);
  const search = ref('');
  const state = reactive({
    items: [],
    pagination: {
      page: 1,
      limit: 10
    }
  });

  const tab = ref(null);
  const subTab = ref(null);
  const tabs = reactive({
    general: {
      label: 'General',
      type: 'general',
      active: false,
      description: 'Here you can manage your custom commands.'
    },
    custom: {
      label: 'Custom',
      type: 'custom',
      active: false,
      description: `These commands are made custom and stored within the bot code. You can turn them on/off and manage some settings for each, if available.`
    }
  });
  const currentTab = computed(() => {
    return tab.value ? tabs[tab.value] : tabs.general;
  });

  const selectTab = (tabId) => {
    Object.entries(tabs).forEach(([id]) => {
      tabs[id].active = id === tabId
      if (tabs[id].active) {
        tab.value = id
      }
    })
  }

  const subTabs = ['create', 'edit'];
  const selectSubTab = (id) => {
    subTab.value = subTabs.includes(id) ? id : null;
  }

  const setSearch = (s) => {
    search.value = s;
  }

  const fetchItems = async () => {
    if (!tab) return;

    fetching.value = true;
    let responseData;
    try {
      const response = await fetch(`/api/commands?${createUrlSearchParams({
        type: tab.value,
        page: state.pagination.page,
        limit: state.pagination.limit,
        search: search.value
      })}`);

      responseData = await response.json();
    } catch (err) {
      responseData = { data: [], pagination: { page: 1, limit: 10 } };
      console.log(err);
    }

    state.items = [...responseData.data];
    state.pagination = { ...responseData.pagination };
    setTimeout(() => {
      fetching.value = false;
    }, 100);
  }

  const create = () => { }

  watch(tab, () => fetchItems());

  return {
    tab,
    subTab,
    tabs,
    currentTab,
    fetching,
    items: computed(() => state.items),
    pagination: computed(() => state.pagination),
    selectTab,
    selectSubTab,
    setSearch,
    fetchItems,
    create
  }
});