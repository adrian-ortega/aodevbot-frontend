<script setup>
import FormField from './FormField.vue'
import FormFieldSelect from './FormFieldSelect.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiLoading, mdiPlus, mdiChevronRight } from '@mdi/js'
import { useCommandsStore } from '../stores/commands'
const cs = useCommandsStore()
</script>
<template>
  <div class="table-actions">
    <div class="table-actions__left">
      <FormField label="Search for a command" vertical>
        <input type="text" placeholder="Search commands" v-model="cs.search" />
      </FormField>
      <FormFieldSelect
        label="Filter Status"
        vertical
        :value="cs.filters.status"
        :options="[
          { label: 'Any', value: -1 },
          { label: 'Enabled', value: 1 },
          { label: 'Disabled', value: 0 }
        ]"
        @input="(value) => cs.updateFilter('status', value)"
      />
      <FormFieldSelect
        label="Limit"
        vertical
        :value="cs.filters.limit"
        :options="[5, 10, 25, 100]"
        @input="(value) => cs.updateFilter('limit', value)"
      >
      </FormFieldSelect>
      <FormField vertical>
        <button class="button" :class="{ 'is-disabled': cs.fetching }" :disabled="cs.fetching">
          <span class="text">Filter</span>
          <span class="icon" :class="{ 'is-spinner': cs.fetching }">
            <SvgIcon type="mdi" :path="cs.fetching ? mdiLoading : mdiChevronRight" />
          </span>
        </button>
      </FormField>
    </div>
    <div class="table-actions__right">
      <FormField>
        <button class="button button--primary" @click.prevent="() => cs.selectSubTab('create')">
          <span class="text">Create</span>
          <span class="icon">
            <SvgIcon type="mdi" :path="mdiPlus" />
          </span>
        </button>
      </FormField>
    </div>
  </div>
</template>
