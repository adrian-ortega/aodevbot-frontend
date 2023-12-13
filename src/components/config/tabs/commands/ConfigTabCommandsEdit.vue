<script setup>
import FormField from '../../../form/FormField.vue'
import FormFieldSelect from '../../../form/FormFieldSelect.vue'
import FormFieldAliases from '../../../form/FormFieldAliases.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import FormButtons from '../../../form/FormButtons.vue'
import FormHelpTokens from '../../../form/help/FormHelpTokens.vue'
import { mdiChevronLeft, mdiPound, mdiRestore, mdiText, mdiChartLine } from '@mdi/js'
import { onMounted, computed, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommandsStore } from '../../../../stores/commands'
import { useNotificationsStore, NOTIFICATION_ERROR } from '../../../../stores/notifications'
import { isEmpty, isObject, objectHasKey } from '../../../../util'

const route = useRoute()
const router = useRouter()
const cs = useCommandsStore()
const ns = useNotificationsStore()
const nameInput = ref(null)
const formTitle = ref('')
const form = reactive({
  data: {}
})
const isCustomCommand = computed(() => form.data.type && form.data.type === 2)
const isCreateMode = computed(() => isEmpty(route.params.id))
const hasAliasResponses = computed(
  () =>
    !isEmpty(form.data) &&
    !isEmpty(form.data.options.fields) &&
    form.data.options.fields.find((field) => field.type === 'alias-responses')
)
const hasStats = computed(() => !isEmpty(form.data) && !isEmpty(form.data.stats))
const hasExamples = computed(() => !isEmpty(form.data) && !isEmpty(form.data.examples))
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
  const response = await cs.updateCommand(form.data.id, form.data)
  if (response.message) {
    ns.append(response.message, response.error ? ns.types.error : ns.types.success)
  }
}

const onSaveAndClose = async () => {
  await onSave()
}

const onResetCustomCommand = async () => {
  const response = await cs.resetCustomCommand(form.data.id)
  if (response.message) {
    ns.append(response.message, response.error ? ns.types.error : ns.types.success)
  }
  if (isObject(response.data)) {
    form.data = { ...response.data }
  }
}

onMounted(async () => {
  // await cs.fetchTemplates()
  if (isCreateMode.value) {
    formTitle.value = 'Create'
  } else {
    const { id } = route.params
    const command = await cs.getCommand(id)
    if (!objectHasKey(command, 'id')) {
      ns.append(`Cannot find command with ID ${id}`, NOTIFICATION_ERROR)
      router.push({ name: 'config.commands' })
      return
    }

    formTitle.value = `Editing: ${command.formatted_name}`
    form.data = { ...command }
  }
})
</script>
<template>
  <div class="edit-form edit-form--two-col">
    <div class="edit-form__header">
      <div class="edit-form__title">
        <div>
          <h2>{{ formTitle }}</h2>
        </div>
        <div v-if="form.data.id">
          <button
            v-if="isCustomCommand"
            class="button button--icon button--transparent button--danger-hover"
            @click.prevent="onResetCustomCommand"
          >
            <span class="icon"><SvgIcon type="mdi" :path="mdiRestore" /></span>
            <span class="popup-text">Reset to defaults</span>
          </button>
          <code>
            <span class="icon"><SvgIcon type="mdi" :path="mdiPound" /></span>
            {{ form.data.id }}
          </code>
        </div>
      </div>
    </div>
    <div class="edit-form__content">
      <FormFieldSelect
        v-if="!isCustomCommand"
        label="Template"
        :options="templateOptions"
        @input="(id) => onTemplateChange(id)"
      />
      <FormField label="Name">
        <input type="text" ref="nameInput" v-model="form.data.name" :disabled="isCustomCommand" />
      </FormField>
      <template v-if="!hasAliasResponses">
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
      <template v-if="isCustomCommand">
        <component
          v-for="field in form.data.options.fields"
          :key="field.id"
          v-bind="field"
          :value="form.data.options.field_values[field.id]"
          :is="`form-field-${field.type}`"
          :command-options="form.data.options"
          @input="(value) => (form.data.options.field_values[field.id] = value)"
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
    </div>

    <div class="edit-form__sidebar">
      <template v-if="isCreateMode || (isCustomCommand && form.data.description.length > 0)">
        <div class="edit-form__desc edit-form__sidebar-widget">
          <h4>
            <span class="icon"><SvgIcon type="mdi" :path="mdiText" /></span>
            <span>Description</span>
          </h4>
          <div>
            <template v-if="isCreateMode">
              <p>
                You are creating a new <em>General</em> command. These types of commands have
                limited functionality and can be configured based on a template or a generic
                sentence response.
              </p>
            </template>
            <p v-else>{{ form.data.description }}</p>
          </div>
        </div>
      </template>
      <template v-if="hasExamples">
        <div class="edit-form__examples edit-form__sidebar-widget">
          <h4>
            <span class="icon"><SvgIcon type="mdi" :path="mdiText" /></span>
            <span>Examples</span>
          </h4>
          <div>
            <div
              v-for="example in form.data.examples"
              :key="example.example"
              class="edit-form__example"
            >
              <p v-if="example.description">{{ example.description }}</p>
              <pre>{{ example.example }}</pre>
            </div>
          </div>
        </div>
      </template>
      <template v-if="hasStats">
        <div class="edit-form__stats edit-form__sidebar-widget">
          <h4>
            <span class="icon"><SvgIcon type="mdi" :path="mdiChartLine" /></span>
            <span>Statistics</span>
          </h4>
          <div>
            <div v-for="stat in form.data.stats" :key="stat.id" class="edit-form__stat-item">
              <div class="edit-form__stat-label">{{ stat.label }}</div>
              <div class="edit-form__stat-value">
                <span class="v">{{ stat.value.toLocaleString() }}</span>
                <span class="u" v-if="stat.value !== 0">{{
                  stat.value > 1 ? stat.unit.plural : stat.unit.single
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="edit-form__buttons">
      <FormButtons style="--button-height: 3em">
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
