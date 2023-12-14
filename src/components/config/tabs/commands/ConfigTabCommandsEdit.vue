<script setup>
import FormField from '../../../form/FormField.vue'
import FormFieldSelect from '../../../form/FormFieldSelect.vue'
import FormFieldAliases from '../../../form/FormFieldAliases.vue'
import FormButtons from '../../../form/FormButtons.vue'
import FormHelpTokens from '../../../form/help/FormHelpTokens.vue'
import { onMounted, computed, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommandsStore } from '../../../../stores/commands'
import { useNotificationsStore, NOTIFICATION_ERROR } from '../../../../stores/notifications'
import { isArray, isEmpty, isObject, objectHasKey } from '../../../../util'
import ConfigTabCommandsEditHeader from './ConfigTabCommandsEditHeader.vue'
import ConfigTabCommandsEditSidebar from './ConfigTabCommandsEditSidebar.vue'
import FormFieldSwitch from '../../../form/FormFieldSwitch.vue'

const route = useRoute()
const router = useRouter()
const cs = useCommandsStore()
const ns = useNotificationsStore()
const nameInput = ref(null)
const form = reactive({ data: {} })
const isCustomCommand = computed(() => form.data.type && form.data.type === 2)
const isCreateMode = computed(() => isEmpty(route.params.id))
const hasCustomFields = computed(
  () => !isEmpty(form.data) && !isEmpty(form.data.options) && !isEmpty(form.data.options.fields)
)
const customFields = computed(() => {
  const globalTokenKeys = [...form.data.options.tokens]
  const globalTokenDescriptions = { ...form.data.options.token_descriptions }
  return (hasCustomFields.value ? form.data.options.fields : []).map((field) => {
    if (objectHasKey(field, 'token_descriptions')) {
      field.token_descriptions = { ...field.token_descriptions, ...globalTokenDescriptions }
      field.tokens = Object.keys(field.token_descriptions)
      field.helpTokens = field.token_descriptions
    }

    if (form.data.options.field_values[field.id]) {
      field.value = form.data.options.field_values[field.id]
    }
    return field
  })
})
const nameHelpText = computed(() =>
  isCustomCommand.value
    ? `Custom command names cannot be changed.${
        customFields.value.find((f) => ['aliases', 'alias', 'alias-responses'].includes(f.type))
          ? ' Aliases can be added below.'
          : ''
      }`
    : ''
)
const templateOptions = computed(() => {
  return cs.templates.map((template, i) => ({ label: template.name, value: i }))
})

const onTemplateChange = (id) => {
  const template = cs.templates[id]
  Object.keys(form).forEach((key) => {
    if (objectHasKey(template, key)) {
      form[key] = template[key]
    }
  })
  nameInput.value.focus()
}

const onSave = async () => {
  const response = await cs.updateCommand(form.data.id, {
    id: form.data.id,
    name: form.data.name,
    enabled: form.data.enabled,
    permission: form.data.permission,
    response: form.data.response,
    description: form.data.description,
    options: Object.keys(form.data.options.field_values).reduce((acc, key) => {
      acc[key] = form.data.options.field_values[key]
      return acc
    }, form.data.options.field_values)
  })
  if (response.message) {
    ns.append(response.message, response.error ? ns.types.error : ns.types.success)
  }
}

const onSaveAndClose = async () => {
  await onSave()
}

const onCustomFieldSave = async (field_id, field_value) => {
  const ogData = { ...form.data }
  if (
    objectHasKey(ogData, 'options') &&
    objectHasKey(ogData.options, 'field_values') &&
    objectHasKey(ogData.options.field_values, field_id)
  ) {
    console.log(field_value)
    if (objectHasKey(field_value, 'value')) {
      field_value = field_value.value
    }
    if (isArray(field_value)) {
      ogData.options.field_values[field_id] = [...field_value]
    } else {
      ogData.options.field_values[field_id] = field_value
    }
  }
  form.data = { ...ogData }
}

onMounted(async () => {
  if (!isCreateMode.value) {
    const { id } = route.params
    const command = await cs.getCommand(id)
    if (!objectHasKey(command, 'id')) {
      ns.append(`Cannot find command with ID ${id}`, NOTIFICATION_ERROR)
      router.push({ name: 'config.commands' })
      return
    }
    form.data = { ...command }
  }
})
</script>
<template>
  <div class="edit-form edit-form--two-col">
    <ConfigTabCommandsEditHeader
      :type="form.data?.type"
      :id="form.data?.id"
      @input="(value) => (form.data = { ...value })"
    />
    <div class="edit-form__content">
      <FormField label="Name" :help="nameHelpText">
        <input type="text" ref="nameInput" v-model="form.data.name" :disabled="isCustomCommand" />
      </FormField>

      <!-- Custom fields -->
      <template v-if="hasCustomFields">
        <component
          v-for="field in customFields"
          :key="field.id"
          v-bind="field"
          :is="`form-field-${field.type}`"
          :command-options="form.data.options"
          @input="(value) => onCustomFieldSave(field.id, value)"
        />
      </template>

      <!-- General Commands -->
      <template v-if="!isCustomCommand">
        <FormFieldSelect
          label="Template"
          :options="templateOptions"
          @input="(id) => onTemplateChange(id)"
        />
        <FormField label="Response">
          <textarea v-model="form.data.response"></textarea>
          <template v-slot:helpopup>
            <FormHelpTokens :command-options="form.data.options" />
          </template>
        </FormField>
        <FormFieldAliases
          :value="form.data.aliases"
          tag-prefix="!"
          @input="(value) => (form.data.aliases = [...form.data.aliases, value])"
        />
      </template>

      <FormFieldSelect
        label="Permission"
        :value="form.data.permission"
        :options="[
          { label: 'Everyone', value: 0 },
          { label: 'Subscribers', value: 1 },
          { label: 'Moderators', value: 2 },
          { label: 'Broadcaster', value: 3 }
        ]"
        @input="(value) => (form.data.permission = value)"
      />
      <FormFieldSwitch
        label="Enabled"
        :value="form.data.enabled"
        @input="(value) => (form.data.enabled = value)"
        help="Turn this command on or off"
      />
    </div>

    <ConfigTabCommandsEditSidebar
      :type="form.data?.type"
      :id="form.data?.id"
      :description="form.data?.description"
      :stats="form.data?.stats"
      :examples="form.data?.examples"
    />

    <div class="edit-form__buttons">
      <FormButtons style="--button-height: 3em; max-width: 30em">
        <RouterLink :to="{ name: 'config.commands' }" class="button button--fw">
          <span class="text">Close</span>
        </RouterLink>
        <button class="button button--secondary button--fw" @click.prevent="onSave">
          <span class="text">Save</span>
        </button>
        <button class="button button--primary button--fw" @click.prevent="onSaveAndClose">
          <span class="text">Save & Close</span>
        </button>
      </FormButtons>
    </div>
  </div>
</template>
