<script setup>
import FormField from './FormField.vue'
import FormFieldSelect from './FormFieldSelect.vue'
import FormFieldAliases from './FormFieldAliases.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import FormButtons from './FormButtons.vue'
import { onMounted, computed, ref, reactive } from 'vue'
import { useCommandsStore } from '../stores/commands'
import { useNotificationsStore, NOTIFICATION_ERROR } from '../stores/notifications'
import { mdiChevronLeft } from '@mdi/js'
import { useRoute, useRouter } from 'vue-router'
import { objectHasKey } from '../util'

const route = useRoute()
const router = useRouter()
const cs = useCommandsStore()
const ns = useNotificationsStore()
const nameInput = ref(null)
const formTitle = ref('')
const form = reactive({
  id: undefined,
  name: '',
  permission: 0,
  response: '',
  aliases: []
})

const templateOptions = computed(() => {
  return cs.templates.map((template, i) => ({ label: template.name, value: i }))
})

const onTemplateChange = (id) => {
  const template = cs.templates[id]
  Object.keys(form).forEach((key) => {
    if (objectHasKey(template, key)) {
      console.log(key)

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

    formTitle.value = 'Editing'
    form.id = command.id
    form.name = command.name
    form.aliases = command.aliases
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
        <h2>
          {{ formTitle }} <code v-if="form.id">{{ form.id }}</code>
        </h2>
      </div>
    </div>
    <hr />
    <FormFieldSelect
      label="Template"
      :options="templateOptions"
      @input="(id) => onTemplateChange(id)"
    />
    <FormField label="Name">
      <input type="text" ref="nameInput" v-model="form.name" />
    </FormField>
    <FormField label="Response">
      <textarea v-model="form.response"></textarea>
    </FormField>
    <FormFieldAliases
      :value="form.aliases"
      @input="(value) => (form.aliases = [...form.aliases, value])"
    />
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
