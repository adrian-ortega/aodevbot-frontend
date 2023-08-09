<script setup>
import { reactive, onMounted } from 'vue'
import { useCommandsStore } from '../stores/commands'
import FormButtons from './FormButtons.vue'
import FormField from './FormField.vue'
import FormFieldSelect from './FormFieldSelect.vue'
import { storeToRefs } from 'pinia'

const cs = useCommandsStore()
const data = reactive({ form: {} })
const { editId } = storeToRefs(cs)
const onTemplateChange = (value) => {
  if (!confirm('This will erase your progress, are you sure you want to apply this template?')) {
    return
  }
  data.form.template = value
  const tData = { ...cs.templates[value] }
  data.form.command_name = tData.command_name
  data.form.command_reply = tData.command_reply
}

onMounted(() => {
  data.form = { ...cs.getCommand(cs.editId) }
})
</script>
<template>
  <div class="tabs__edit-form">
    <h2>Edit command</h2>
    <FormFieldSelect
      horizontal
      label="Template"
      :value="data.form.template"
      :options="cs.commandTemplateOptions"
      @input="(value) => onTemplateChange(value)"
    />
    <FormField label="Command" horizontal>
      <input type="text" v-model="data.form.command_name" />
    </FormField>
    <FormField label="Response" horizontal>
      <textarea v-model="data.form.command_reply"></textarea>
    </FormField>
    <FormFieldSelect
      horizontal
      label="Permission"
      :value="data.form.permission"
      :options="cs.permissionOptions"
      @input="(value) => (data.form.permission = value)"
    />
    <FormButtons>
      <button class="button" @click.prevent="reset()">Reset</button>
      <button class="button" @click.prevent="cs.selectSubTab('list')">Close</button>
      <button class="button button--primary" @click.prevent="create()">Confirm</button>
    </FormButtons>
  </div>
</template>
