<script setup>
const props = defineProps({
  inline: Boolean,
  alignRight: Boolean
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
