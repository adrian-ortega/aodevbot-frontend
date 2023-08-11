import { defineStore } from "pinia";
import { computed, ref, reactive } from "vue";
import { createUrlSearchParams, isEmpty, objectHasKey } from '../util';

const COMMAND_STUB = { template: null, permission: 1, name: null, response: null, aliases: [] }

export const useCommandsStore = defineStore("commands", () => {
  const fetching = ref(false);
  const search = ref('');
  const page = ref(1);
  const pageLimit = ref(10);
  const editId = ref(null);
  const state = reactive({
    items: [],
    templates: [],
    filters: {
      limit: 10,
      status: -1
    }
  });

  const isFetching = () => {
    fetching.value = true
  };
  const doneFetching = (() => {
    let id;
    return () => {
      clearTimeout(id);
      id = setTimeout(() => {
        fetching.value = false;
      }, 10)
    }
  })()

  const fetchTemplates = async () => {
    if (state.templates.length > 0) {
      return state.templates;
    }

    let responseData;
    isFetching()
    try {
      const response = await fetch('/api/commands/templates');
      responseData = await response.json();
    } catch (err) {
      responseData = { data: [] };
      console.log(err);
    }
    doneFetching()
    state.templates = [...responseData.data]
  }

  const setSearch = (s) => {
    search.value = s;
  }

  const updateFilter = (key, value) => {
    if (objectHasKey(state.filters, key)) {
      state.filters[key] = value;
    }
  }

  const fetchItems = async (type = 'general') => {
    isFetching()
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
    doneFetching()
    state.items = [...responseData.data];

  }

  const getCommand = async (id) => {
    if (isEmpty(id)) return null;
    isFetching()
    let data;
    try {
      const response = await fetch(`/api/commands/${id}`)
      const responseData = await response.json();
      data = responseData.data
    } catch (err) {
      data = null;
    }
    doneFetching()
    return data;
  }

  const createCommand = async (data) => {
    let responseData;
    isFetching()
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
    doneFetching();
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
    filters: computed(() => state.filters),
    updateFilter,

    fetchTemplates,
    templates: computed(() => state.templates),

    // individual actions for a command,
    getCommand,
    createCommand,
    enableCommand,
    editCommand,
    deleteCommand
  }
});