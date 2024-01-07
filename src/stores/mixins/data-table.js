import { ref, computed } from "vue";
import { useLocalStore } from "../local"

export const useDataTable = ({
  storeName = 'default',
  fetchItems = () => { }
}) => {
  const ls = useLocalStore();
  const lsSave = (key, value) => ls.save(`${storeName}.dt.${key}`, value);
  const lsGet = (key, defaultValue) => ls.get(`${storeName}.dt.${key}`, defaultValue);

  const fetching = ref(false)
  const page = ref(1)
  const pages = ref(1)
  const pageLimit = ref(lsGet('limit', 10))
  const pageTotal = ref(1)

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

  const hasNextPage = computed(() => ((page.value + 1) < pages.value))

  const nextPage = (...args) => {
    if (hasNextPage.value) {
      page.value++
    }
    return fetchItems(...args)
  }

  const hasPreviousPage = computed(() => page.value - 1 > 1)

  const previousPage = (...args) => {
    if (hasPreviousPage.value) {
      page.value--
    }
    return fetchItems(...args)
  }

  const setPagination = (pagination) => {
    page.value = pagination.page
    pageLimit.value = pagination.limit
    pages.value = pagination.pages
    pageTotal.value = pagination.total
  }

  return {
    page,
    pages,
    pageLimit,
    pageTotal,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,

    fetching,
    isFetching,
    doneFetching,
    setPagination
  }
};
