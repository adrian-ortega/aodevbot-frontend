import { defineStore } from 'pinia'
import { computed, ref, reactive } from 'vue'
import { createUrlSearchParams, isEmpty, objectHasKey } from '../util'

export const useCommandsStore = defineStore('commands', () => {
  const fetching = ref(false)
  const search = ref('')
  const page = ref(1)
  const pages = ref(1)
  const pageLimit = ref(10)
  const pageTotal = ref(1)
  const editId = ref(null)
  const state = reactive({
    items: [],
    templates: [],
    filters: {
      limit: pageLimit.value,
      status: -1
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

  const fetchTemplates = async () => {
    if (state.templates.length > 0) {
      return state.templates
    }

    let responseData
    isFetching()
    try {
      const response = await fetch('/api/commands/templates')
      responseData = await response.json()
    } catch (err) {
      responseData = { data: [] }
      console.log(err)
    }
    doneFetching()
    state.templates = [...responseData.data]
  }

  const setSearch = (s) => {
    search.value = s
  }

  const updateFilter = (key, value) => {
    if (objectHasKey(state.filters, key)) {
      state.filters[key] = value
    }
  }

  const fetchItems = async (type = 'general') => {
    isFetching()
    let responseData
    try {
      const response = await fetch(
        `/api/commands?${createUrlSearchParams({
          type,
          page: page.value,
          limit: pageLimit.value,
          search: search.value
        })}`
      )
      responseData = await response.json()
    } catch (err) {
      responseData = { data: [], pagination: { page: page.value, limit: pageLimit.value } }
      console.log(err)
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

  const filterSearch = (type) => {
    pageLimit.value = state.filters.limit
    return fetchItems(type)
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

  const getCommand = async (id) => {
    if (isEmpty(id)) return null
    isFetching()
    let data
    try {
      const response = await fetch(`/api/commands/${id}`)
      const responseData = await response.json()
      data = responseData.data
    } catch (err) {
      data = null
    }
    doneFetching()
    return data
  }

  const createCommand = async (data) => {
    let responseData
    isFetching()
    try {
      const response = await fetch('/api/commands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      responseData = await response.json()
    } catch (err) {
      responseData = null
      console.log(err)
    }
    doneFetching()
    return responseData
  }

  // Individial command actions
  const enableCommand = (command) => {
    // @TODO implement enableCommand(command)
    console.log({ command })
  }

  const updateCommand = async (id, data) => {
    let responseData;
    isFetching();
    try {
      const response = await fetch(`/api/commands/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      responseData = await response.json()
    } catch (err) {
      responseData = { error: true };
      console.log(err);
    }
    doneFetching();
    return responseData;
  }

  const deleteCommand = (command) => {
    // @TODO implement deleteCommand(command)
    console.log({ command })
    if (!confirm('Are you sure you want to delete this Command?')) {
      return
    }
  }

  const resetCustomCommand = async (id) => {
    let responseData = {};
    isFetching();
    try {
      const response = await fetch(`/api/commands/${id}/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
    } catch (err) {
      responseData = { error: true };
      console.log(err);
    }
    doneFetching();
    return responseData;
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

    fetchTemplates,
    templates: computed(() => state.templates),

    // individual actions for a command,
    getCommand,
    createCommand,
    enableCommand,
    updateCommand,
    resetCustomCommand,
    deleteCommand
  }
})
