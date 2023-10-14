<script setup>
import { computed, onMounted, reactive } from 'vue'
import FormFieldAliases from './FormFieldAliases.vue'
import FormField from './FormField.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiDelete } from '@mdi/js'
import FormFieldSelect from './FormFieldSelect.vue'
const aliases = reactive({ data: [] })
const props = defineProps({
  form: {
    type: Object
  },
  horizontal: { type: Boolean, default: true },
  vertical: { type: Boolean, default: false }
})
const aliasOptions = computed(() => aliases.data.map((value) => ({ label: value, value })))
onMounted(() => {
  if (props.form && props.form.aliases.length > 0) {
    aliases.data = props.form.aliases.map((alias) => {
      // @TODO tie it into the responses object
      return alias
    })
  }
})
/*
One reply can be mapped to multiple Aliases
{
  aliases: [],
  responses: []
}


Aliases ['hug', 'abrazo', 'love']

responses [
  {
    response: '{0} hugged {1}',
    aliases: [0, 2]
  }, 
  {
    response: 'Awe! {0} wanted to show some love to {1}',
    aliases: [0]
  }
]
*/
</script>
<template>
  <fieldset class="field">
    <legend>Alias & Responses</legend>
    <FormFieldAliases
      :horizontal="props.horizontal"
      :vertical="props.vertical"
      :value="aliases.data"
      label="Aliases"
      @input="(value) => (aliases.data = [...aliases.data, value])"
    />
    <FormField label="Responses" :horizontal="props.horizontal" :vertical="props.vertical">
      <template v-slot:pre>
        <FormFieldSelect :options="aliasOptions" multiple />
      </template>
      <input type="text" />
      <template v-slot:post>
        <button class="button button--icon">
          <span class="icon">
            <SvgIcon type="mdi" :path="mdiDelete" />
          </span>
        </button>
      </template>
    </FormField>
    <FormField class="has-label">
      <button class="button button--fw">
        <span class="text">Add Response</span>
      </button>
    </FormField>
  </fieldset>
</template>
