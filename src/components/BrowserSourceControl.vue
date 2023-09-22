<script setup>
const props = defineProps({
  title: {
    type: String
  }
})
</script>
<template>
  <fieldset class="overlay-control">
    <legend>{{ title }}</legend>
    <slot></slot>
  </fieldset>
</template>
