<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import {
  mdiBookEdit,
  mdiCheckboxBlankCircle,
  mdiCheckboxBlankCircleOutline,
  mdiDeleteOutline,
  mdiPencil
} from '@mdi/js'
import FormButtons from './FormButtons.vue'

const props = defineProps({
  row: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="table__row">
    <div class="table__cell cb">
      <input type="checkbox" :name="`cb-${props.row.id}`" />
    </div>
    <div class="table__cell">
      <div class="table__cell-content">
        <h4 class="title">
          <a href="#" @click.prevent="cs.editCommand(props.row)">
            <span>{{ props.row.formatted_name }}</span>
            <code>{{ props.row.name }}</code>
          </a>
        </h4>
        <p class="description">{{ props.row.description }}</p>
      </div>
    </div>
    <div class="table__cell">
      <template v-for="alias in props.row.aliases" :key="alias">
        <code>{{ alias }}</code>
      </template>
    </div>
    <div class="table__cell actions right">
      <FormButtons inline align-right>
        <button
          class="button button--transparent button--icon"
          :class="{
            'button--success': !props.row.enabled
          }"
          :title="props.row.enabled ? 'Disable' : 'Enable'"
        >
          <span class="icon" :class="{ 'icon--success': props.row.enabled }">
            <SvgIcon
              type="mdi"
              :path="props.row.enabled ? mdiCheckboxBlankCircle : mdiCheckboxBlankCircleOutline"
            />
          </span>
        </button>
        <button class="button button--transparent button--icon" title="Edit">
          <span class="icon">
            <SvgIcon type="mdi" :path="mdiPencil" />
          </span>
        </button>
        <button class="button button--danger button--transparent button--icon" title="Delete">
          <span class="icon">
            <SvgIcon type="mdi" :path="mdiDeleteOutline" />
          </span>
        </button>
      </FormButtons>
    </div>
  </div>
</template>
