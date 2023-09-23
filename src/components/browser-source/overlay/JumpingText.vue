<script setup>
import { computed } from 'vue'
const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const textChars = computed(() => {
  return props.text.split('')
})
</script>
<template>
  <span class="jumping-text">
    <span v-for="(char, i) in textChars" :key="`${char}${i}`" v-html="char"></span>
  </span>
</template>
