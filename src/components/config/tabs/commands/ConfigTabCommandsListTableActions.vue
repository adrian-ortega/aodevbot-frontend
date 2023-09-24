<script setup>
import FormField from '../../../form/FormField.vue'
import FormFieldSelect from '../../../form/FormFieldSelect.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiLoading, mdiPlus, mdiChevronRight } from '@mdi/js'
import { useCommandsStore } from '../../../../stores/commands'
const cs = useCommandsStore()
const props = defineProps({
  type: String,
  default() {
    return 'general'
  }
})
</script>
<template>
  <div class="table-actions">
    <div class="table-actions__left">
      <FormField label="Search for a command" vertical>
        <input
          type="search"
          placeholder="Search commands"
          v-model="cs.search"
          @keyup.enter="() => cs.filterSearch(props.type)"
        />
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
        <button
          class="button"
          :class="{ 'is-disabled': cs.fetching }"
          :disabled="cs.fetching"
          @click.prevent="cs.filterSearch(props.type)"
        >
          <span class="text">Filter</span>
          <span class="icon" :class="{ 'is-spinner': cs.fetching }">
            <SvgIcon type="mdi" :path="cs.fetching ? mdiLoading : mdiChevronRight" />
          </span>
        </button>
      </FormField>
    </div>
    <div class="table-actions__right">
      <FormField>
        <RouterLink class="button button--primary" :to="{ name: 'config.commands.create' }">
          <span class="text">Create</span>
          <span class="icon">
            <SvgIcon type="mdi" :path="mdiPlus" />
          </span>
        </RouterLink>
      </FormField>
    </div>
  </div>
</template>
