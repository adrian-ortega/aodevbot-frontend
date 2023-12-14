<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import FormField from './FormField.vue'
import { mdiClose, mdiPlus } from '@mdi/js'
import { ref, computed } from 'vue'
import { isEmpty, isNumeric, isString, isArray } from '../../util'
const $emit = defineEmits(['input'])
const props = defineProps({
  label: { type: String },
  help: { type: String },
  helpTokens: { type: [Object] },
  horizontal: { type: Boolean, default: true },
  vertical: { type: Boolean, default: false },
  value: { type: [Object, String, Array] },
  tagPrefix: { type: String }
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

  if (isEmpty(value.trim())) return

  $emit('input', [...aliases.value, value])
  alias.value = ''
  input.value.focus()
}

const remove = (value) => {
  $emit(
    'input',
    aliases.value.filter((alias) => alias !== value)
  )
}
</script>

<template>
  <FormField
    class="field--input-aliases"
    :label="label"
    :help="help"
    :horizontal="horizontal"
    :vertical="vertical"
  >
    <div class="aliases" v-if="aliases.length > 0">
      <div v-for="(alias, i) in aliases" :key="i" class="tag">
        <span class="text">{{ tagPrefix }}{{ alias }}</span>
        <button
          class="button button--close"
          @click.prevent="remove(alias)"
          :title="`Remove ${tagPrefix ?? ''}'${alias}'`"
        >
          <span class="icon"><SvgIcon type="mdi" :path="mdiClose" /></span>
        </button>
      </div>
    </div>
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
  </FormField>
</template>
