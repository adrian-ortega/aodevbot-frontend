import { defineStore } from "pinia";
import { computed, ref, reactive } from "vue";
import { createUrlSearchParams } from '../util';

export const useCommandsStore = defineStore("commands", () => {
  const search = ref('');
  const state = reactive({
    items: [],
    pagination: {
      page: 1,
      limit: 10
    }
  });

  const fetchItems = async ({ type }) => {
    let responseData;
    try {
      const response = await fetch(`/api/commands?${createUrlSearchParams({
        type,
        page: state.pagination.page,
        limit: state.pagination.limit,
        search: search.value
      })}`);
      responseData = await response.json();
    } catch (err) {
      responseData = { data: [], pagination: { page: 1, limit: 10 } };
    }

    state.items = [...responseData.data];
    state.pagination = { ...responseData.pagination };
  }

  return {
    items: computed(() => state.items),
    pagination: computed(() => state.pagination),
    fetchItems
  }
});