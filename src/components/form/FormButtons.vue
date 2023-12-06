<script setup>
const props = defineProps({
  inline: Boolean,
  alignRight: Boolean,
  commandOptions: {
    type: [Object],
    default: () => {
      return {}
    }
  }
})
</script>
<template>
  <div
    :class="{
      'form-buttons': true,
      'form-buttons--inline': props.inline,
      'form-buttons--right': props.alignRight
    }"
  >
    <slot></slot>
  </div>
</template>
