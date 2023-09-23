import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { ONE_SECOND, createUrlSearchParams, objectHasKey } from '../util'
import { useNotificationsStore } from './notifications'
import debounce from 'lodash.debounce'

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

  const fetchItems = debounce(async () => {
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
  }, 10)

  const filterSearch = () => {
    pageLimit.value = state.filters.limit;
    return fetchItems()
  }

  const hasNextPage = computed(() => page.value + 1 > pages.value)
  const nextPage = (type) => {
    if (hasNextPage.value) {
      page.value++
    }
    return filterSearch(type)
  }

  const hasPreviousPage = computed(() => page.value - 1 > 1)
  const previousPage = (type) => {
    if (hasPreviousPage.value) {
      page.value--
    }
    return filterSearch(type)
  }

  const getUser = () => { }

  const syncing = ref(false)
  const syncPercentage = ref(100)

  const syncUsers = () => {
    const ns = useNotificationsStore();
    syncing.value = true;
    const progressId = ns.progress('Syncing Users', syncPercentage.value)
    const updateProgress = (progress, total = 0, current = 0) => {
      const statusText = progress < 100 ? `Working: ${current} of ${total}` : 'Done'
      ns.updateProgress(progressId, progress, statusText);
    }

    let updateId;
    const update = async () => {
      clearTimeout(updateId)
      try {
        const response = await fetch('/api/chatters/sync-status')
        const { percentage, total, current } = await response.json();
        updateProgress(percentage, total, current);
        if (percentage < 100) {
          updateId = setTimeout(update, ONE_SECOND * 1.5)
        } else {
          fetchItems()
          updateId = setTimeout(() => {
            ns.dismiss(progressId)
            syncing.value = false
          }, ONE_SECOND * 3)
        }
      } catch (err) {
        console.log(err)
      }
    }

    window.navigator.sendBeacon('/api/chatters/sync');

    setTimeout(update, ONE_SECOND);
  }

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
    updateFilter,
    filterSearch,
    hasNextPage,
    nextPage,
    hasPreviousPage,
    previousPage,

    getUser,
    syncUsers,
    syncing,
  }
})
