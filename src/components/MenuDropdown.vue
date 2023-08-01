<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDotsVertical } from '@mdi/js';
import { ref } from 'vue';
const dd = ref(null);
const isOpen = ref(false);
const isClosed = ref(false);
const toggleMenu = () => (isOpen.value ? closeMenu() : openMenu());
const escapeKeyHandler = (event) => event.keyCode === 27 ? closeMenu() : undefined;
const outsideClickEventHandler = (event) => {
  if (!isOpen.value) {
    return false;
  }
  const $el = dd.value;
  if (event.target !== $el && !$el.contains(event.target)) {
    closeMenu();
  }
}
const openMenu = () => {
  isOpen.value = true;
  isClosed.value = false;
  document.addEventListener('keyup', escapeKeyHandler, false);
  document.addEventListener('click', outsideClickEventHandler, false);
};
const closeMenu = () => {
  isOpen.value = false;
  isClosed.value = true;
  document.removeEventListener('keyup', escapeKeyHandler);
  document.removeEventListener('click', outsideClickEventHandler);
};
</script>

<template>
  <div ref="dd" :class="{
    dropdown: true,
    'is-open': isOpen,
    'is-closed': isClosed
  }">
    <div class="dropdown__trigger">
      <button class="button button--transparent" @click.prevent="() => toggleMenu()">
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiDotsVertical"/>
        </span>
      </button>
    </div>
    <div class="dropdown__content">
      <slot></slot>
    </div>
  </div>
</template>
