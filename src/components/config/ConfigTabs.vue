<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { slugify } from '../../util'

const props = defineProps({
  baseRoute: {
    type: String,
    default: 'config'
  }
})
const router = useRouter()
const routes = router.getRoutes()
const routeTabs = computed(() => {
  const matchedRoute = routes.find((r) => r.name === props.baseRoute)
  return matchedRoute?.children
    .filter((c) => !c.meta.ignoreTab)
    .map((c) => {
      return {
        name: c.name,
        label: c.meta?.label,
        to: { name: c.name }
      }
    })
})
const tabSlug = computed(() => slugify(props.baseRoute.replace('.', ' ')))
</script>

<template>
  <nav class="tabs" :class="`tabs--${tabSlug}`">
    <template v-for="{ to, name, label } in routeTabs" :key="name">
      <RouterLink
        :to="to"
        active-class="is-active"
        exact-active-class="is-current"
        class="tabs__trigger"
      >
        <span>{{ label }}</span>
        <span class="tabs__trigger-bb"></span>
      </RouterLink>
    </template>
  </nav>
</template>
