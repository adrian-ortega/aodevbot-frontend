import FormField from './FormField.vue';
<script setup>
import { onMounted, ref } from 'vue'
import FormField from './FormField.vue'
const emit = defineEmits(['input'])
const inputValue = ref(false)
const inputCheckbox = ref(null)
const props = defineProps({
  value: {
    type: [Boolean]
  }
})
const onChange = () => {
  emit('input', inputCheckbox.value.checked)
}
onMounted(() => {
  inputValue.value = !!props.value
})
</script>
<template>
  <FormField class="field--input-switch">
    <label class="input-switch">
      <input
        ref="inputCheckbox"
        type="checkbox"
        class="input-switch__cb"
        v-model="inputValue"
        @change="onChange"
      />
      <span class="input-switch__s"></span>
    </label>
  </FormField>
</template>
