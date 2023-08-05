<script setup>
import { ref, computed } from 'vue'
import FormField from './FormField.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCheck, mdiMenuDown } from '@mdi/js'
import { isString, objectHasKey } from '../util'
const emit = defineEmits(['input'])
const props = defineProps({
  value: {
    type: [String, Array]
  },
  label: {
    type: String
  },
  hasSearch: {
    type: Boolean
  },
  multiple: {
    type: Boolean
  },
  horizontal: {
    type: Boolean
  },
  options: {
    type: Array
  }
})
const dd = ref(null)
const isOpen = ref(false)
const isClosed = ref(false)
const toggleMenu = () => (isOpen.value ? closeMenu() : openMenu())
const escapeKeyHandler = (event) => (event.keyCode === 27 ? closeMenu() : undefined)
const outsideClickEventHandler = (event) => {
  if (!isOpen.value) {
    return false
  }
  const $el = dd.value
  if (event.target !== $el && !$el.contains(event.target)) {
    closeMenu()
  }
}
const openMenu = () => {
  isOpen.value = true
  isClosed.value = false
  document.addEventListener('keyup', escapeKeyHandler, false)
  document.addEventListener('click', outsideClickEventHandler, false)
}
const closeMenu = () => {
  isOpen.value = false
  isClosed.value = true
  document.removeEventListener('keyup', escapeKeyHandler)
  document.removeEventListener('click', outsideClickEventHandler)
}
const selectOption = ({ value }) => {
  emit('input', value)
  closeMenu()
}
const parsedOptions = computed(() => {
  const opts = []
  if (Array.isArray(props.options)) {
    for (let i = 0; i < props.options.length; i++) {
      const opt = props.options[i]
      if (isString(opt)) {
        opts.push({ value: opt, label: opt })
      } else if (Array.isArray(opt)) {
        opts.push({ value: opt[0], label: opt[1] })
      } else if (objectHasKey(opt, 'value') && objectHasKey(opt, 'label')) {
        opts.push({ value: opt.value, label: opt.label })
      }
    }
  }
  return opts
})
const selectOptionLabel = computed(() => {
  const options = [...parsedOptions.value]
  for (let i = 0; i < options.length; i++) {
    if (options[i].value === props.value) {
      return options[i].label
    }
  }
  return props.value
})
</script>
<template>
  <FormField
    :label="props.label"
    :horizontal="props.horizontal"
    class="field--input-select"
    :data-selected="props.value"
  >
    <div ref="dd" class="input-select" :class="{ 'is-open': isOpen, 'is-closed': isClosed }">
      <div class="input-select__v" @click.prevent="() => toggleMenu()">
        <div class="input-select__vv">{{ selectOptionLabel }}</div>
        <div class="input-select__cd">
          <span class="icon">
            <SvgIcon type="mdi" :path="mdiMenuDown" />
          </span>
        </div>
      </div>
      <div class="input-select__dd">
        <div class="input-select__s" v-if="props.hasSearch">
          <input type="search" />
        </div>
        <div class="input-select__o">
          <div
            v-for="(option, oKey) in parsedOptions"
            :key="oKey"
            class="input-select__oi"
            :class="{ 'is-active': option.value === props.value }"
            @click.prevent="() => selectOption(option)"
          >
            <div class="input-select__cb" v-if="props.multiple">
              <span class="icon"><SvgIcon type="mdi" :path="mdiCheck" /> </span>
            </div>
            <div class="input-select__vv">{{ option.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </FormField>
</template>
