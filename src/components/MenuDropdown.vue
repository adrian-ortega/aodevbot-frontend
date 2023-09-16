<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiDotsVertical } from '@mdi/js'
import { ref, computed, reactive } from 'vue'
import { isFunction } from '../util'

const dd = ref(null)
const ddContent = ref(null)
const isOpen = ref(false)
const isClosed = ref(false)
const coords = reactive({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
})

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
const getIsOpen = () => isOpen.value
const getIsClosed = () => isClosed.value
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
        <button
          class="button"
          @click.prevent="
            () =>
              props.triggerHandler({
                closeMenu,
                openMenu,
                toggleMenu,
                isOpen: getIsOpen,
                isClosed: getIsClosed
              })
          "
        >
          <span class="text">{{ props.triggerLabel }}</span>
          <span class="icon" v-if="triggerIcon !== false">
            <SvgIcon type="mdi" :path="triggerIcon ? triggerIcon : mdiDotsVertical" />
          </span>
        </button>
      </template>
      <button v-else class="button" @click.prevent="() => toggleMenu()">
        <slot name="trigger">
          <span class="text" v-if="triggerLabel">
            {{ triggerLabel }}
          </span>
          <span class="icon">
            <SvgIcon type="mdi" :path="triggerIcon ? triggerIcon : mdiDotsVertical" />
          </span>
        </slot>
      </button>
    </div>
    <div ref="ddContent" class="dropdown__content" v-if="isOpen">
      <slot
        name="default"
        v-bind="{
          closeMenu,
          openMenu,
          toggleMenu,
          isOpen: getIsOpen,
          isClosed: getIsClosed
        }"
      ></slot>
    </div>
  </div>
</template>
