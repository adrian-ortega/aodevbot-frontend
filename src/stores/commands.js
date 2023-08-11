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
  const templates = ref([])
  const state = reactive({ items: [] });

  const setSearch = (s) => {
    search.value = s;
  }

  const fetchItems = async (type = 'general') => {
    console.log('fetching items');
    fetching.value = true;
    let responseData;
    try {
      const response = await fetch(`/api/commands?${createUrlSearchParams({
        type,
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
    editId.value = command.id;
  }

  const deleteCommand = (command) => {
    if (!confirm('Are you sure you want to delete this Command?')) {
      return;
    }

  }

  return {
    search,
    setSearch,
    hasSearch: computed(() => search.value.length > 0),

    items: computed(() => state.items),
    hasItems: computed(() => state.items.length > 0),
    fetching,
    fetchItems,

    // individual actions for a command,
    createCommand,
    enableCommand,
    editCommand,
    deleteCommand
  }
});