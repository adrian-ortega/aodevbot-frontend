<script setup>
import { reactive } from 'vue'
import { useCommandsStore } from '../stores/commands'
import FormButtons from './FormButtons.vue'
import FormField from './FormField.vue'
import FormFieldSelect from './FormFieldSelect.vue'

const STUB = { template: null, permission: 1, command_name: null, command_reply: null }

const cs = useCommandsStore()
const data = reactive({ form: { ...STUB } })
const reset = () => {
  data.form = { ...STUB }
}
const onTemplateChange = (value) => {
  data.form.template = value
  const tData = { ...cs.templates[value] }
  data.form.command_name = tData.command_name
  data.form.command_reply = tData.command_reply
}
</script>
<template>
  <div class="tabs__create-form" v-if="cs.subTab === 'create'">
    <h2>Add a custom command</h2>
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
