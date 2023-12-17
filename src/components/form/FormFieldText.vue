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
  disabled: { type: Boolean, default: false },
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
      :disabled="props.disabled"
      @input="
        (evt) => {
          $emit('input', evt.target.value)
        }
      "
    />
  </FormField>
</template>
