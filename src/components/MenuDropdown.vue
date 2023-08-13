<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiDotsVertical } from '@mdi/js'
import { ref, computed } from 'vue'
import { isFunction } from '../util'

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
  if (!$el || (event.target !== $el && !$el.contains(event.target))) {
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
  document.removeEventListener('keyup', escapeKeyHandler, false)
  document.removeEventListener('click', outsideClickEventHandler, false)
}

const props = defineProps({
  triggerHandler: {
    type: Function
  },
  triggerLabel: {
    type: String,
    required: false
  },
  triggerIcon: {
    type: String,
    required: false
  }
})

const hasTriggerAction = computed(() => {
  return isFunction(props.triggerHandler)
})
</script>

<template>
  <div
    ref="dd"
    :class="{
      dropdown: true,
      'is-open': isOpen,
      'is-closed': isClosed
    }"
  >
    <div class="dropdown__trigger">
      <template v-if="hasTriggerAction">
        <button class="button" @click.prevent="() => props.triggerHandler()">
          <span class="label">{{ props.triggerLabel }}</span>
        </button>
      </template>
      <button class="button" @click.prevent="() => toggleMenu()">
        <slot name="trigger">
          <span class="icon">
            <SvgIcon type="mdi" :path="triggerIcon ? triggerIcon : mdiDotsVertical" />
          </span>
        </slot>
      </button>
    </div>
    <div class="dropdown__content" v-if="isOpen">
      <slot name="default" v-bind="{ closeMenu, openMenu, toggleMenu }"></slot>
    </div>
  </div>
</template>
