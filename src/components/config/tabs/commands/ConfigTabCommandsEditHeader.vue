<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { computed, onMounted, ref, watch } from 'vue'
import { useCommandsStore } from '../../../../stores/commands'
import { isObject, objectHasKey } from '../../../../util'
import { mdiPound, mdiRestore, mdiCodeJson } from '@mdi/js'
import { useNotificationsStore } from '../../../../stores/notifications'

const $emit = defineEmits(['input'])
const props = defineProps({
  type: { type: [Number, String] },
  id: { type: [Number, String] }
})

const cs = useCommandsStore()
const formTitle = ref(null)
const isCustomCommand = computed(() => props.type && props.type === 2)

const onResetCustomCommand = async () => {
  const response = await cs.resetCustomCommand(props.id)
  if (response.message) {
    const ns = useNotificationsStore()
    ns.append(response.message, response.error ? ns.types.error : ns.types.success)
  }
  if (isObject(response.data)) {
    $emit('input', response.data)
  }
}

const changeFormTitle = async (id) => {
  const command = await cs.getCommand(id)
  if (objectHasKey(command, 'formatted_name')) {
    formTitle.value = `You are editing: ${command.formatted_name}`
  } else {
    formTitle.value = 'Create a new Command'
  }
}

watch(
  () => props.id,
  (newId) => changeFormTitle(newId)
)

onMounted(async () => {
  await changeFormTitle(props.id)
})
</script>
<template>
  <div class="edit-form__header">
    <div class="edit-form__title">
      <div>
        <h2>{{ formTitle }}</h2>
      </div>
      <div v-if="id">
        <button
          v-if="isCustomCommand"
          class="button button--icon button--transparent button--danger-hover"
          @click.prevent="onResetCustomCommand"
        >
          <span class="icon"><SvgIcon type="mdi" :path="mdiRestore" /></span>
          <span class="popup-text">Reset to defaults</span>
        </button>
        <a
          :href="`/api/commands/${id}`"
          target="_blank"
          class="button button--icon button--transparent"
        >
          <span class="icon"><SvgIcon type="mdi" :path="mdiCodeJson" /></span>
          <span class="popup-text">Show Command JSON</span>
        </a>
        <code>
          <span class="icon"><SvgIcon type="mdi" :path="mdiPound" /></span>
          {{ id }}
        </code>
      </div>
    </div>
  </div>
</template>
