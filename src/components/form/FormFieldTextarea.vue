<script setup>
const $emit = defineEmits(['input'])
const props = defineProps({
  label: { type: String },
  help: { type: String },
  helpTokens: { type: [Object] },
  horizontal: { type: Boolean, default: true },
  vertical: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  value: { type: [String] }
})
</script>
<template>
  <FormField v-bind="props" class="field--input-textarea">
    <textarea
      v-model="props.value"
      :disabled="props.disabled"
      @input="
        (evt) => {
          $emit('input', evt.target.value)
        }
      "
    ></textarea>
  </FormField>
</template>
