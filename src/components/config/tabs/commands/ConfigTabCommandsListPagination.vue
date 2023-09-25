<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
import { computed } from 'vue'
import { useCommandsStore } from '../../../../stores/commands'

const props = defineProps({
  type: String
})
const cs = useCommandsStore()
const currentPage = computed(() => cs.page)
</script>

<template>
  <div class="table-actions table-actions--footer">
    <div class="table-actions__left">
      <button
        class="button button--transparent"
        @click.prevent="() => cs.previousPage(props.type)"
        :disabled="!cs.hasPreviousPage"
      >
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiChevronLeft" />
        </span>
        <span class="text">Previous</span>
      </button>
    </div>
    <div class="table-actions__center">
      <div>Page {{ currentPage }}</div>
    </div>
    <div class="table-actions__right">
      <button
        class="button button--transparent"
        @click.prevent="() => cs.nextPage(props.type)"
        :disabled="!cs.hasNextPage"
      >
        <span class="text">Next</span>
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiChevronRight" />
        </span>
      </button>
    </div>
  </div>
</template>
