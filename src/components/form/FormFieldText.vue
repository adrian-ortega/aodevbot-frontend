<script setup>
import { onMounted, ref } from 'vue'

const inputValue = ref(null)
const props = defineProps({
  value: {
    type: [String, Number, Array]
  },
  label: {
    type: String
  },
  horizontal: {
    type: Boolean,
    default: true
  },
  vertical: {
    type: Boolean,
    default: false
  },
  commandOptions: {
    type: [Object],
    default: () => {
      return {}
    }
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
    <input type="text" ref="nameInput" v-model="inputValue" />
  </FormField>
</template>
