<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  max: {
    type: Number,
    default: 10
  }
})
</script>
<template>
  <div class="fireflies">
    <div class="firefly" v-for="i in props.max" :key="i"></div>
  </div>
</template>
