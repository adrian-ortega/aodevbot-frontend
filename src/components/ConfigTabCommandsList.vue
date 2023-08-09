<script setup>
import debounce from 'lodash/debounce'
import SvgIcon from '@jamescoyle/vue-icon'
import FormField from './FormField.vue'
import MenuActionsDropdown from './MenuActionsDropdown.vue'
import { mdiLoading, mdiMagnify, mdiPlus } from '@mdi/js'
import { computed, ref, watch } from 'vue'
import { useCommandsStore } from '../stores/commands'

const cs = useCommandsStore()
const search = ref('')
const hasSearch = computed(() => search.value.length > 0)

const onSearch = debounce(() => {
  cs.setSearch(search.value)
}, 500)

const createRowActions = (command) => {
  const enabled = ref(command.enable)
  return [
    {
      label: enabled.value ? 'Disable' : 'Enable',
      handler: ({ closeMenu }) => {
        cs.enableCommand(command)
        closeMenu()
      }
    },
    {
      label: 'Edit',
      handler: ({ closeMenu }) => {
        cs.editCommand(command)
        closeMenu()
      }
    },
    {
      label: 'Delete',
      handler: ({ closeMenu }) => {
        cs.deleteCommand(command)
        closeMenu()
      }
    }
  ]
}

watch(search, onSearch)
</script>
<template>
  <div class="table-wrapper">
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
      <div class="table-actions__right" v-if="cs.tab === 'general'">
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
          <div class="table__cell table__cell--h">Aliases</div>
          <div class="table__cell table__cell--h actions">Actions</div>
        </div>
      </div>
      <div class="table__body">
        <div class="table__row" v-if="cs.items.length === 0 && cs.tab === 'general'">
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
              <h4 class="title">
                <a href="#" @click.prevent="cs.editCommand(row)">
                  <span>{{ row.formatted_name }}</span>
                  <code>{{ row.name }}</code>
                </a>
              </h4>
              <p class="description">{{ row.description }}</p>
            </div>
          </div>
          <div class="table__cell">
            <template v-for="alias in row.aliases" :key="alias">
              <code>{{ alias }}</code>
            </template>
          </div>
          <div class="table__cell actions">
            <MenuActionsDropdown :actions="createRowActions(row)" />
          </div>
        </div>
      </div>
    </div>

    <div class="table-actions"></div>
  </div>
</template>
