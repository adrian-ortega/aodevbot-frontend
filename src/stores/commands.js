import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const useCommandsStore = defineStore("commands", () => {
  const state = reactive({
    items: [],
    pagination: {
      page: 1,
      per_page: 10
    }
  });

  const fetchItems = () => {

  }

  return {
    items: computed(() => state.items),
    pagination: computed(() => state.pagination)
  }
});