<script setup>
import { onMounted, ref } from 'vue'
const $emit = defineEmits(['input'])
const inputValue = ref(null)
const props = defineProps({
  label: { type: String },
  help: { type: String },
  helpTokens: { type: [Object] },
  horizontal: { type: Boolean, default: true },
  vertical: { type: Boolean, default: false },
  value: { type: [String] }
})

onMounted(() => {
  inputValue.value = props.value
})
</script>
<template>
  <FormField v-bind="props" class="field--input-text">
    <input
      type="text"
      ref="inputValue"
      :value="props.value"
      @input="() => $emit('input', inputValue.value)"
    />
  </FormField>
</template>
