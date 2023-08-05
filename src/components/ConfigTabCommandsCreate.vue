<script setup>
import { reactive } from 'vue'
import { useCommandsStore } from '../stores/commands'
import FormButtons from './FormButtons.vue'
import FormField from './FormField.vue'
import FormFieldSelect from './FormFieldSelect.vue'

const cs = useCommandsStore()
const data = reactive({
  template: null,
  permission: 1,
  command_name: null,
  command_reply: null
})
</script>
<template>
  <div class="tabs__create-form" v-if="cs.subTab === 'create'">
    <h2>Add a custom command</h2>
    <FormFieldSelect
      horizontal
      label="Template"
      :value="data.template"
      :options="cs.commandTemplateOptions"
      @input="(value) => (data.template = value)"
    />
    <FormField label="Command" horizontal>
      <input type="text" v-model="data.command_name" />
    </FormField>
    <FormField label="Response" horizontal>
      <textarea v-model="data.command_reply"></textarea>
    </FormField>
    <FormFieldSelect
      horizontal
      label="Permission"
      :value="data.permission"
      :options="cs.permissionOptions"
      @input="(value) => (data.permission = value)"
    />
    <FormButtons>
      <button class="button" @click.prevent="cs.selectSubTab('list')">Close</button>
      <button class="button button--primary" @click.prevent="cs.create(data)">Confirm</button>
    </FormButtons>
  </div>
</template>
