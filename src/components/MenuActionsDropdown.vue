<script setup>
import { computed } from 'vue'
import MenuDropdown from './MenuDropdown.vue'
import { mdiMenuDown } from '@mdi/js'
const props = defineProps({
  actions: {
    type: Object,
    default() {
      return {}
    }
  }
})
const firstOption = computed(() => {
  return { ...props.actions[Object.keys(props.actions)[0]] }
})

const otherOptions = computed(() => {
  return [...props.actions].slice(1)
})
</script>
<template>
  <MenuDropdown
    class="dropdown--actions"
    :trigger-label="firstOption.label"
    :trigger-handler="firstOption.handler"
    :trigger-icon="mdiMenuDown"
  >
    <template v-slot:default="{ closeMenu, openMenu }">
      <div v-for="(button, id) in otherOptions" :key="id">
        <button
          class="button button--transparent button--fw"
          @click.prevent="
            () => {
              button.handler({ closeMenu, openMenu })
            }
          "
        >
          <span class="text">{{ button.label }}</span>
        </button>
      </div>
    </template>
  </MenuDropdown>
</template>
