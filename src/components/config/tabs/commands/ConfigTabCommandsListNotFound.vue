<script setup>
import { useCommandsStore } from '../../../../stores/commands'
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
          <a
            href="#"
            class="button button--primary button--inline"
            @click.prevent="() => cs.selectSubTab('create')"
            >Add Custom Command</a
          >
        </p>
      </div>
    </div>
  </div>
</template>
