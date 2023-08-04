<script setup>
import debounce from 'lodash/debounce'
import SvgIcon from '@jamescoyle/vue-icon'
import FormField from './FormField.vue'
import { mdiLoading, mdiMagnify, mdiPlus } from '@mdi/js'
import { computed, ref, watch } from 'vue'
import { useCommandsStore } from '../stores/commands'

const cs = useCommandsStore()
const search = ref('')
const hasSearch = computed(() => search.value.length > 0)

const onSearch = debounce(() => {
  cs.setSearch(search.value)
}, 500)

watch(search, onSearch)
</script>
<template>
  <div class="table-wrapper" v-if="!cs.subTab || cs.subTab === 'list'">
    <div class="table-actions">
      <div class="table-actions__left">
        <FormField>
          <input type="text" placeholder="Search commands" v-model="search" />
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
      <div class="table-actions__right">
        <button class="button button--primary" @click.prevent="() => cs.selectSubTab('create')">
          <span class="text">Create</span>
          <span class="icon">
            <SvgIcon type="mdi" :path="mdiPlus" />
          </span>
        </button>
      </div>
    </div>
    <div class="table">
      <div class="table__header">
        <div class="table__row">
          <div class="table__cell cb table__cell--h"><input type="checkbox" /></div>
          <div class="table__cell table__cell--h">Information</div>
          <div class="table__cell table__cell--h">Actions</div>
        </div>
      </div>
      <div class="table__body">
        <div class="table__row" v-if="cs.items.length === 0 && cs.tab === 'custom'">
          <div class="table__cell table__cell--fw">
            <div class="table__cell-content">
              <template v-if="hasSearch">
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

        <div class="table__row" v-else v-for="row in cs.items" :key="row.id">
          <div class="table__cell cb">
            <input type="checkbox" :name="`cb-${row.id}`" />
          </div>
          <div class="table__cell">
            <div class="table__cell-content">
              <h4>{{ row.name }}</h4>
              <p>{{ row.description }}</p>
            </div>
          </div>
          <div class="table__cell">...</div>
        </div>
      </div>
    </div>

    <div class="table-actions"></div>
  </div>
</template>
