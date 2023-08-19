import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { createUrlSearchParams } from '../util'

export const useChattersStore = defineStore('users', () => {
  const fetching = ref(false)
  const search = ref('')
  const page = ref(1)
  const pages = ref(1)
  const pageLimit = ref(5)
  const pageTotal = ref(1)
  const state = reactive({
    items: [],
    filters: {
      limit: 5
    }
  })

  const isFetching = () => {
    fetching.value = true
  }
  const doneFetching = (() => {
    let id
    return () => {
      clearTimeout(id)
      id = setTimeout(() => {
        fetching.value = false
      }, 10)
    }
  })()

  const setSearch = (s) => {
    search.value = s
  }

  const updateFilter = (key, value) => {
    if (objectHasKey(state.filters, key)) {
      state.filters[key] = value
    }
  }

  const fetchItems = async () => {
    isFetching()
    let responseData
    try {
      const response = await fetch(
        `/api/chatters?${createUrlSearchParams({
          page: page.value,
          limit: pageLimit.value,
          search: search.value
        })}`
      )
      responseData = await response.json()
    } catch (err) {
      responseData = { data: [], pagination: { page: page.value, limit: pageLimit.value } }
    }
    doneFetching()
    state.items = [...responseData.data]
    if (responseData.pagination) {
      page.value = responseData.pagination.page
      pageLimit.value = responseData.pagination.limit
      pages.value = responseData.pagination.pages
      pageTotal.value = responseData.pagination.total
    }
  }

  const filterSearch = () => { }

  const getUser = () => { }

  return {
    page,
    pageLimit,

    search,
    setSearch,
    hasSearch: computed(() => search.value.length > 0),

    items: computed(() => state.items),
    hasItems: computed(() => state.items.length > 0),
    fetching,
    fetchItems,
    filters: computed(() => state.filters),
    filterSearch,
    updateFilter,

    getUser
  }
})
