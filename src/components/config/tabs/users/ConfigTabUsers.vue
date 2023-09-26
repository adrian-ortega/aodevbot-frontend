<script setup>
import ConfigTabUsersListRow from './ConfigTabUsersListRow.vue'
import ConfigTabUsersListTableActions from './ConfigTabUsersListTableActions.vue'
import ConfigTabUsersListPagination from './ConfigTabUsersListPagination.vue'
import { useChattersStore } from '../../../../stores/chatters'
import { onMounted } from 'vue'

const cs = useChattersStore()
const refresh = async () => await cs.fetchItems()
onMounted(refresh)
</script>
<template>
  <div>
    <div class="table-wrapper">
      <ConfigTabUsersListTableActions />
      <div class="table">
        <div class="table__header">
          <div class="table__row">
            <div class="table__cell cb table__cell--h"><input type="checkbox" /></div>
            <div class="table__cell table__cell--h">Display Name</div>
            <div class="table__cell table__cell--h">Username</div>
            <div class="table__cell table__cell--h">Type</div>
            <div class="table__cell table__cell--h actions right">Actions</div>
          </div>
        </div>
        <div class="table__body">
          <template v-if="!cs.fetching && !cs.hasItems">None</template>
          <ConfigTabUsersListRow v-else v-for="row in cs.items" :key="row.id" :row="row" />
        </div>
      </div>
      <ConfigTabUsersListPagination />
    </div>
  </div>
</template>
