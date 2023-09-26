<script setup>
import FormField from '../../../form/FormField.vue'
import FormFieldSelect from '../../../form/FormFieldSelect.vue'
import FormFieldAliases from '../../../form/FormFieldAliases.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import FormButtons from '../../../form/FormButtons.vue'
import { mdiChevronLeft, mdiPound } from '@mdi/js'
import { onMounted, computed, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommandsStore } from '../../../../stores/commands'
import { useNotificationsStore, NOTIFICATION_ERROR } from '../../../../stores/notifications'
import { isEmpty, objectHasKey } from '../../../../util'

const route = useRoute()
const router = useRouter()
const cs = useCommandsStore()
const ns = useNotificationsStore()
const nameInput = ref(null)
const formTitle = ref('')
const form = reactive({
  id: undefined,
  type: 1,
  enabled: false,
  description: '',
  name: '',
  permission: 0,
  response: '',
  options: {},
  aliases: []
})
const isCustomCommand = computed(() => form.type && form.type === 2)
const hasAliasResponses = computed(
  () =>
    !isEmpty(form.options.fields) &&
    form.options.fields.find((field) => field.type === 'alias-responses')
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

onMounted(async () => {
  // await cs.fetchTemplates()
  const { id } = route.params
  if (id) {
    const command = await cs.getCommand(id)
    if (!objectHasKey(command, 'id')) {
      ns.append(`Cannot find command with ID ${id}`, NOTIFICATION_ERROR)
      router.push({ name: 'config.commands' })
      return
    }

    formTitle.value = `Editing: ${command.formatted_name}`
    form.id = command.id
    form.name = command.name
    form.aliases = command.aliases
    form.type = command.type
    form.enabled = command.enabled
    form.formated_name = command.formatted_name
    form.description = command.description
    form.response = command.response
    form.options = command.options
  } else {
    formTitle.value = 'Create'
  }
})
</script>
<template>
  <div class="edit-form">
    <div class="edit-form__header">
      <div>
        <RouterLink class="button" :to="{ name: 'config.commands' }">
          <span class="icon"><SvgIcon type="mdi" :path="mdiChevronLeft" /></span>
          <span class="text">Back</span>
        </RouterLink>
      </div>
      <div class="edit-form__title">
        <h2>{{ formTitle }}</h2>
        <code v-if="form.id">
          <span class="icon">
            <SvgIcon type="mdi" :path="mdiPound" />
          </span>
          {{ form.id }}
        </code>
      </div>
    </div>
    <hr />
    <FormFieldSelect
      v-if="!isCustomCommand"
      label="Template"
      :options="templateOptions"
      @input="(id) => onTemplateChange(id)"
    />
    <FormField label="Name">
      <input type="text" ref="nameInput" v-model="form.name" :disabled="isCustomCommand" />
    </FormField>
    <template v-if="!hasAliasResponses">
      <FormField label="Response">
        <textarea v-model="form.response"></textarea>
      </FormField>
      <FormFieldAliases
        :value="form.aliases"
        tag-prefix="!"
        @input="(value) => (form.aliases = [...form.aliases, value])"
      />
    </template>
    <template v-if="isCustomCommand">
      <component
        v-for="field in form.options.fields"
        v-model="form.options.field_values[field.id]"
        :form="form"
        :key="field.id"
        :is="`form-field-${field.type}`"
      />
    </template>

    <FormFieldSelect
      label="Permission"
      :value="form.permission"
      :options="[
        { label: 'Everyone', value: 0 },
        { label: 'Subscribers', value: 1 },
        { label: 'Moderators', value: 2 },
        { label: 'Broadcaster', value: 3 }
      ]"
      @input="(value) => (form.permission = value)"
    />

    <FormButtons>
      <RouterLink :to="{ name: 'config.commands' }" class="button button--fw">
        <span class="text">Close</span>
      </RouterLink>
      <button class="button button--primary button--fw">
        <span class="text">Save</span>
      </button>
    </FormButtons>
  </div>
</template>
