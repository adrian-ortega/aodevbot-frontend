<script setup>
import { onMounted, ref } from 'vue'

const inputValue = ref(null)
const props = defineProps({
  label: {
    type: String
  },
  help: {
    type: String
  },
  helpTokens: {
    type: [Object]
  },
  horizontal: {
    type: Boolean,
    default: true
  },
  vertical: {
    type: Boolean,
    default: false
  },
  value: {
    type: [String, Number, Array]
  }
})

onMounted(() => {
  inputValue.value = props.value
})
</script>
<template>
  <FormField
    :label="props.label"
    :horizontal="props.horizontal"
    :vertical="props.vertical"
    class="field--input-text"
  >
    <textarea v-model="inputValue"></textarea>
  </FormField>
</template>
