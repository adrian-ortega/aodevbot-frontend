<script setup>
import FormField from './FormField.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiLoading, mdiMagnify, mdiPlus } from '@mdi/js'
import { useCommandsStore } from '../stores/commands'
const cs = useCommandsStore()
</script>
<template>
  <div class="table-actions">
    <div class="table-actions__left">
      <FormField>
        <input type="text" placeholder="Search commands" v-model="cs.search" />
        <template v-slot:post>
          <button
            class="button button--icon"
            :class="{ 'is-disabled': cs.fetching }"
            :disabled="cs.fetching"
          >
            <span class="icon" :class="{ 'is-spinner': cs.fetching }">
              <SvgIcon type="mdi" :path="cs.fetching ? mdiLoading : mdiMagnify" />
            </span>
          </button>
        </template>
      </FormField>
    </div>
    <div class="table-actions__right" v-if="cs.tab === 'general'">
      <button class="button button--primary" @click.prevent="() => cs.selectSubTab('create')">
        <span class="text">Create</span>
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiPlus" />
        </span>
      </button>
    </div>
  </div>
</template>
