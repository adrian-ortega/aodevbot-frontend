<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { slugify } from '../../util'

const props = defineProps({
  topLevel: {
    type: Boolean,
  },
  parent: {
    type: [String, Number],
    default: 'root'
  }
})
const router = useRouter()
const routes = router.getRoutes()
const routeTabs = computed(() => {
  const filterRoutes = (_routes) => _routes.filter((c) => !c?.meta.ignoreTab)
    .map((c) => {
      const { name, meta } = c;
      const label = meta && meta.label ? meta.label : name
      return { name, label, to: { name } }
    })

  if(props.parent === 'root') {
    return filterRoutes(routes.filter(r => r.meta.parent === 0));
  }

  const matchedRoute = routes.find((r) => r.name === props.parent)
  return matchedRoute ? filterRoutes(matchedRoute.children) : []
})
const tabSlug = computed(() => slugify(props.parent.replace('.', ' ')))
</script>

<template>
  <nav v-if="routeTabs.length > 0" class="tabs" :class="{
    [`tabs--${tabSlug}`]: true,
    'tabs--top-level': props.topLevel
  }">
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
