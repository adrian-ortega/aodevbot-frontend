<script setup>
import { computed, useSlots } from 'vue';
const $slots = useSlots();
const props = defineProps({
  label: { type: String }
});


const hasLabel = computed(() => $slots.label || props.label)
</script>
<template>
  <div class="field">
    <div v-if="hasLabel" class="field__label">
      <slot name="label">{{ props.label }}</slot>
    </div>
    <div class="field__input">
      <slot></slot>
    </div>
    <div v-if="$slots.post" class="field__post">
      <slot name="post"></slot>
    </div>
  </div>
</template>