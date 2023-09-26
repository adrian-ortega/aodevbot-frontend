<script setup>
import { onMounted, reactive } from 'vue'
import FormFieldAliases from './FormFieldAliases.vue'
import FormField from './FormField.vue'
import FormButtons from './FormButtons.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiDelete, mdiTag } from '@mdi/js'
const aliases = reactive({ data: [] })
const props = defineProps({
  form: {
    type: Object
  }
})

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
  <fieldset class="field" style="border-color: var(--primary)">
    <FormFieldAliases
      :value="aliases.data"
      label="Responses"
      @input="(value) => (aliases.data = [...aliases.data, value])"
    />
    <FormButtons align-right>
      <button class="button">
        <span class="text">Add Response</span>
      </button>
    </FormButtons>
    <FormField label="Responses">
      <template v-slot:pre>
        <button class="button button--icon">
          <span class="icon">
            <SvgIcon type="mdi" :path="mdiTag" />
          </span>
        </button>
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
  </fieldset>
</template>
