<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
const props = defineProps({
  type: {
    type: String,
    default: 'general'
  },
  store: {
    type: [Object]
  }
})
</script>
<template>
  <div class="table-actions table-actions--footer">
    <div class="table-actions__left">
      <button
        v-if="store.hasPreviousPage"
        class="button button--transparent"
        @click.prevent="() => store.previousPage(props.type)"
      >
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiChevronLeft" />
        </span>
        <span class="text">Previous</span>
      </button>
    </div>
    <div v-if="store.pages > 1" class="table-actions__center">
      <div>Page {{ store.page }} of {{ store.pages }}</div>
    </div>
    <div class="table-actions__right">
      <button
        v-if="store.hasNextPage"
        class="button button--transparent"
        @click.prevent="() => store.nextPage(props.type)"
      >
        <span class="text">Next</span>
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiChevronRight" />
        </span>
      </button>
    </div>
  </div>
</template>
