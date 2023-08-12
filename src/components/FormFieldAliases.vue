<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import FormField from './FormField.vue'
import { mdiClose, mdiPlus } from '@mdi/js'
import { ref, computed } from 'vue'
import { isNumeric, isString, isArray } from '../util'
const $emit = defineEmits(['input'])
const props = defineProps({
  label: {
    type: String,
    default: 'Aliases'
  },
  value: {
    type: [Object, String, Array]
  }
})

const input = ref(null)
const alias = ref('')
const aliases = computed(() => {
  let data = []
  if (isString(props.value) || isNumeric(props.value)) {
    data.push(props.value)
  }

  if (isArray(props.value)) {
    data = [...props.value]
  }

  return data
})

const append = () => {
  let value = alias.value
  if (value.includes('!')) {
    value = value.replace('!', '')
  }
  $emit('input', value)
  alias.value = ''
  input.value.focus()
}
</script>

<template>
  <FormField class="field--input-aliases" :label="label">
    <FormField>
      <input type="text" v-model="alias" @keypress.enter="append" ref="input" />
      <template v-slot:post>
        <button class="button button--fw" @click.prevent="append">
          <span class="icon">
            <SvgIcon type="mdi" :path="mdiPlus" />
          </span>
          <span class="text">Add</span>
        </button>
      </template>
    </FormField>
    <div class="aliases" v-if="aliases.length > 0">
      <template v-for="(alias, i) in aliases">
        <button class="button button--tag">
          <span class="text">!{{ alias }}</span>
          <span class="icon">
            <SvgIcon type="mdi" :path="mdiClose" />
          </span>
        </button>
      </template>
    </div>
  </FormField>
</template>
