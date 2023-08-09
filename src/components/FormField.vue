<script setup>
import { computed, useSlots } from 'vue'
const $slots = useSlots()
const props = defineProps({
  label: {
    type: String
  },
  horizontal: {
    type: Boolean,
    default: true
  }
})

const hasLabel = computed(() => $slots.label || props.label)
</script>
<template>
  <div :class="{ field: true, 'is-horizontal': props.horizontal }">
    <div v-if="hasLabel" class="field__label">
      <slot name="label">{{ props.label }}</slot>
    </div>
    <div class="field__input" v-if="$slots.default">
      <slot name="default"></slot>
    </div>
    <div v-if="$slots.post" class="field__post">
      <slot name="post"></slot>
    </div>
  </div>
</template>
