<script setup>
import ConfigTabCommandsListTableActions from './ConfigTabCommandsListTableActions.vue'
import ConfigTabCommandsListNotFound from './ConfigTabCommandsListNotFound.vue'
import ConfigTabCommandsListRow from './ConfigTabCommandsListRow.vue'
import ConfigTabCommandsListPagination from './ConfigTabCommandsListPagination.vue'
import { useCommandsStore } from '../../../../stores/commands'
import { useRoute } from 'vue-router'
import { onMounted, watch } from 'vue'

const cs = useCommandsStore()
const route = useRoute()
const refresh = async () => await cs.fetchItems(route.meta?.listType)
onMounted(refresh)
watch(() => route.name, refresh)
</script>
<template>
  <div class="table-wrapper">
    <ConfigTabCommandsListTableActions :type="route.meta?.listType" />
    <div class="table">
      <div class="table__header">
        <div class="table__row">
          <div class="table__cell cb table__cell--h"><input type="checkbox" /></div>
          <div class="table__cell table__cell--h">Information</div>
          <div class="table__cell table__cell--h">Aliases</div>
          <div class="table__cell table__cell--h actions right">Actions</div>
        </div>
      </div>
      <div class="table__body">
        <ConfigTabCommandsListNotFound v-if="!cs.fetching && !cs.hasItems" />
        <ConfigTabCommandsListRow v-else v-for="row in cs.items" :key="row.id" :row="row" />
      </div>
    </div>
    <ConfigTabCommandsListPagination />
  </div>
</template>
