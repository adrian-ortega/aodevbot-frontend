<script setup>
import FormField from '../../../form/FormField.vue'
import FormFieldSelect from '../../../form/FormFieldSelect.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import debounce from 'lodash.debounce'
import { mdiPlus } from '@mdi/js'
import { useCommandsStore } from '../../../../stores/commands'
const cs = useCommandsStore()
const props = defineProps({
  type: {
    type: String,
    default() {
      return 'general'
    }
  }
})

const filterSearch = (data = {}) => {
  Object.keys(data).map((key) => cs.updateFilter(key, data[key]))
  return cs.filterSearch(props.type)
}
const blurredTimeout = 500
const blurredSearch = debounce(() => cs.filterSearch(props.type), blurredTimeout)
</script>
<template>
  <div class="table-actions table-actions--header">
    <div class="table-actions__left">
      <FormField label="Search for a command" vertical>
        <input
          type="search"
          placeholder="Search commands"
          v-model="cs.search"
          @input="blurredSearch"
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
        @input="(status) => filterSearch({ status })"
      />
      <FormFieldSelect
        label="Limit"
        vertical
        :value="cs.filters.limit"
        :options="[5, 10, 25, 100]"
        @input="(limit) => filterSearch({ limit })"
      />
    </div>
    <div class="table-actions__right" v-if="props.type !== 'custom'">
      <FormField vertical>
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
