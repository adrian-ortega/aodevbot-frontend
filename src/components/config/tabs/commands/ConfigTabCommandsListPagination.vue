<script setup>
import { useCommandsStore } from '../../../../stores/commands'
import TablePagination from '../../../table/TablePagination.vue'
const props = defineProps({
  type: {
    type: String,
    default() {
      return 'general'
    }
  }
})
</script>

<template></template>
