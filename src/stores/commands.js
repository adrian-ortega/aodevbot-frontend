import { defineStore } from "pinia";
import { computed, ref, reactive, watch } from "vue";
import { createUrlSearchParams } from '../util';

const COMMAND_STUB = { template: null, permission: 1, name: null, response: null, aliases: [] }

export const useCommandsStore = defineStore("commands", () => {
  const fetching = ref(false);
  const search = ref('');
  const page = ref(1);
  const pageLimit = ref(10);
  const editId = ref(null);
  const state = reactive({
    items: [],
    templates: (new Array(21)).fill(0).map((_, i) => ({
      permission: 1,
      name: `!hug-${i}`,
      response: `This is a reply for ${i}`
    }))
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
  const currentTab = computed(() => tab.value ? tabs[tab.value] : tabs.general);

  const selectTab = (tabId) => {
    Object.entries(tabs).forEach(([id]) => {
      tabs[id].active = id === tabId
      if (tabs[id].active) {
        tab.value = id
      }
    });
    subTab.value = null;
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
        page: page.value,
        limit: pageLimit.value,
        search: search.value
      })}`);

      responseData = await response.json();
    } catch (err) {
      responseData = { data: [], pagination: { page: 1, limit: 10 } };
      console.log(err);
    }

    state.items = [...responseData.data];
    setTimeout(() => {
      fetching.value = false;
    }, 100);
  }

  const commandTemplateOptions = computed(() => {
    const options = [];
    for (let i = 0; i < state.templates.length; i++) {
      options.push({
        value: i,
        label: state.templates[i].name
      })
    }
    return options;
  });

  watch(tab, () => fetchItems());

  const createCommand = async (data) => {
    let responseData;
    try {
      const response = await fetch('/api/commands', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      responseData = await response.json();
    } catch (err) {
      responseData = null;
      console.log(err);
    }
    return responseData;
  };


  // Individial command actions
  const enableCommand = (command) => {

  }

  const editCommand = (command) => {
    selectSubTab('edit')
    editId.value = command.id;
  }

  const deleteCommand = (command) => {
    console.log(command);
    if (!confirm('Are you sure you want to delete this Command?')) {
      return;
    }

  }

  return {
    tab,
    subTab,
    tabs,
    currentTab,
    fetching,
    items: computed(() => state.items),
    editId,
    templates: computed(() => state.templates),
    pagination: computed(() => state.pagination),
    commandTemplateOptions,
    permissionOptions: [
      { value: 1, label: 'Everyone' },
      { value: 2, label: 'Moderators' },
      { value: 3, label: 'Broadcaster' }
    ],
    selectTab,
    selectSubTab,
    setSearch,
    fetchItems,

    STUB: computed(() => ({ ...COMMAND_STUB })),
    getCommand: (id) => {
      const cmd = state.items.find(a => a.id === id);
      return cmd ? { ...cmd } : null
    },
    createCommand,
    editCommand,
    deleteCommand,
    enableCommand
  }
});