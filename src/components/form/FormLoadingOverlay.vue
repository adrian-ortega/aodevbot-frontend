<script setup>
const props = defineProps({
  fullPage: {
    type: Boolean
  }
})
</script>
<template>
  <div class="loading-overlay" :class="{ 'is-full-page': props.fullPage }">
    <div>
      <div class="loader"></div>
      <slot />
    </div>
  </div>
</template>
