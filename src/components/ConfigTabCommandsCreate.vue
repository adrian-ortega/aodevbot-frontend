<script setup>
import { ref, reactive } from 'vue'
import { useCommandsStore } from '../stores/commands'
import FormButtons from './FormButtons.vue'
import FormField from './FormField.vue'
import FormFieldSelect from './FormFieldSelect.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiClose, mdiPlus } from '@mdi/js'

const cs = useCommandsStore()
const data = reactive({ form: { ...cs.STUB } })
const aliasTemp = ref('')
const inputName = ref('inputName')
const reset = () => {
  data.form = { ...cs.STUB }
}
const onTemplateChange = (value) => {
  data.form.template = value
  const tData = { ...cs.templates[value] }
  data.form.name = tData.name
  data.form.response = tData.response
  inputName.value.focus()
}

const create = () => {
  cs.createCommand({
    name: data.form.name,
    response: data.form.response,
    permission: data.form.permission
  })
}

const addAlias = () => {
  console.log('ye')
  data.form.aliases.push(aliasTemp.value)
  aliasTemp.value = ''
}

const removeAlias = (idx) => {
  data.form.aliases = data.form.aliases.filter((_, i) => idx != i)
}
</script>
<template>
  <div class="tabs__create-form">
    <h2>Add a custom command</h2>
    <FormFieldSelect
      label="Template"
      :value="data.form.template"
      :options="cs.commandTemplateOptions"
      @input="(value) => onTemplateChange(value)"
    />
    <FormField label="Command">
      <input type="text" ref="inputName" v-model="data.form.name" />
    </FormField>
    <FormField label="Response">
      <textarea v-model="data.form.response"></textarea>
    </FormField>

    <FormField label="Aliases" class="field--input-aliases">
      <template v-slot:default v-if="data.form.aliases.length > 0">
        <div class="aliases">
          <button
            v-for="(alias, i) in data.form.aliases"
            class="button"
            @click.prevent="removeAlias(i)"
            title="Remove"
          >
            <span class="text">{{ alias }} </span>
            <span class="icon">
              <SvgIcon type="mdi" :path="mdiClose" />
            </span>
          </button>
        </div>
      </template>

      <template v-slot:post>
        <input type="text" v-model="aliasTemp" @keyup.enter="addAlias()" />
        <button class="button" @click.prevent="addAlias()">
          <span class="icon"><SvgIcon type="mdi" :path="mdiPlus"></SvgIcon></span>
          <span class="text">Add Alias</span>
        </button>
      </template>
    </FormField>

    <FormFieldSelect
      label="Permission"
      :value="data.form.permission"
      :options="cs.permissionOptions"
      @input="(value) => (data.form.permission = value)"
    />
    <FormButtons>
      <button class="button" @click.prevent="reset()">Reset</button>
      <button class="button button--right" @click.prevent="cs.selectSubTab('list')">Close</button>
      <button class="button button--primary" @click.prevent="create()">Confirm</button>
    </FormButtons>
  </div>
</template>
