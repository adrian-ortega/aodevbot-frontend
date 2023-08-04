<script setup>
import { reactive } from 'vue'
import { useCommandsStore } from '../stores/commands'
import FormButtons from './FormButtons.vue'
import FormField from './FormField.vue'

const cs = useCommandsStore()
const data = reactive({
  command_name: null,
  command_reply: null
})
</script>
<template>
  <div class="tabs__create-form" v-if="cs.subTab === 'create'">
    <h2>Add a custom command</h2>
    <FormField label="Template" horizontal>
      <select>
        <option>one</option>
        <option>twp</option>
      </select>
    </FormField>
    <FormField label="Command" horizontal>
      <input type="text" v-model="data.command_name" />
    </FormField>
    <FormField label="Response" horizontal>
      <textarea v-model="data.command_reply"></textarea>
    </FormField>
    <FormField label="Permission" horizontal> Radio options </FormField>
    <FormButtons>
      <button class="button" @click.prevent="cs.selectSubTab('list')">Close</button>
      <button class="button button--primary" @click.prevent="cs.create(data)">Confirm</button>
    </FormButtons>
  </div>
</template>
