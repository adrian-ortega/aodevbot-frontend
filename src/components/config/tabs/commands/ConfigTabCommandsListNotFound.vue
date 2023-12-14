<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { useCommandsStore } from '../../../../stores/commands'
import { mdiPlus } from '@mdi/js'
const cs = useCommandsStore()
</script>
<template>
  <div class="table__row">
    <div class="table__cell table__cell--fw">
      <div class="table__cell-content">
        <template v-if="cs.hasSearch">
          <p>Nothing found with that search. Try again, or Create a new command.</p>
        </template>
        <template v-else>
          <p>No commands found, consider adding one.</p>
        </template>
        <p>
          <RouterLink class="button button--inline" :to="{ name: 'config.commands.create' }">
            <span class="text">Create</span>
            <span class="icon"><SvgIcon type="mdi" :path="mdiPlus" /></span>
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
