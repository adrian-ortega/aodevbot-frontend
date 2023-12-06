<script setup>
const props = defineProps({
  fullPage: {
    type: Boolean
  },
  commandOptions: {
    type: [Object],
    default: () => {
      return {}
    }
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
