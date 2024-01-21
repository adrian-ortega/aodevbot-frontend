<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import FormField from './FormField.vue'
import FormFieldSelect from './FormFieldSelect.vue'
import { mdiSync } from '@mdi/js'
import { useChattersStore } from '../stores/chatters'
import { onMounted } from 'vue'
const cs = useChattersStore()
onMounted(() => {
  cs.updateSyncStatus()
})
</script>
<template>
  <div class="table-actions">
    <div class="table-actions__left">
      <FormField label="Search for a user" vertical>
        <input
          type="search"
          placeholder="Search users"
          v-model="cs.search"
          @keyup.enter="() => cs.filterSearch()"
        />
      </FormField>
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
        <button
          class="button"
          :class="{ 'is-disabled': cs.syncing }"
          :disabled="cs.syncing"
          title="Sync with Twitch"
          @click.prevent="cs.sync()"
        >
          <span class="text">Sync</span>
          <span class="icon" :class="{ 'is-spinner': cs.syncing }">
            <SvgIcon type="mdi" :path="mdiSync" />
          </span>
          <span
            class="progress"
            :data-progress="cs.syncPercent.value"
            :style="{ width: `${cs.syncPercent.value}%` }"
          ></span>
        </button>
      </FormField>
    </div>
  </div>
</template>
