<script setup>
import { ref, computed, useSlots } from 'vue'
import FormField from './FormField.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCheck, mdiChevronDown, mdiChevronUp } from '@mdi/js'
import { isString, isNumeric, objectHasKey } from '../util'
const $slots = useSlots()
const emit = defineEmits(['input'])
const props = defineProps({
  value: {
    type: [String, Number, Array]
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
    type: Boolean,
    default: true
  },
  vertical: {
    type: Boolean,
    default: false
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
      let parsedOpt

      if (isString(opt) || isNumeric(opt)) {
        parsedOpt = { value: opt, label: opt }
      } else if (Array.isArray(opt)) {
        parsedOpt = { value: opt[0], label: opt[1] }
      } else if (objectHasKey(opt, 'value') && objectHasKey(opt, 'label')) {
        parsedOpt = { value: opt.value, label: opt.label }
      }
      opts.push(parsedOpt)
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
    :vertical="props.vertical"
    class="field--input-select"
    :data-selected="props.value"
  >
    <div ref="dd" class="input-select" :class="{ 'is-open': isOpen, 'is-closed': isClosed }">
      <div class="input-select__v" @click.prevent="() => toggleMenu()">
        <div class="input-select__vv">{{ selectOptionLabel }}</div>
        <div class="input-select__cd">
          <span class="icon">
            <SvgIcon type="mdi" :path="isOpen ? mdiChevronUp : mdiChevronDown" />
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
    <template v-slot:post v-if="$slots.post"><slot name="post"></slot></template>
  </FormField>
</template>
