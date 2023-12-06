<script setup>
import { computed, onMounted, reactive } from 'vue'
import FormFieldAliases from './FormFieldAliases.vue'
import FormField from './FormField.vue'
import FormHelpTokens from './help/FormHelpTokens.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiDelete, mdiDotsHorizontal, mdiTagMultiple } from '@mdi/js'
import FormFieldSelect from './FormFieldSelect.vue'
import { makeId } from '../../util'
const aliases = reactive({ data: [] });
const responses = reactive({ data: [] });
const responseToAdd = reactive({ aliases: [], response: '' });
const props = defineProps({
  form: {
    type: Object
  },
  value: {
    type: [Object, String, Array]
  },
  horizontal: { type: Boolean, default: true },
  vertical: { type: Boolean, default: false },
  commandOptions: {
    type: [Object],
    default: () => {
      return {}
    }
  }
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

const addResponse = () => {
  const { aliases, response } = responseToAdd;
  responseToAdd.aliases = [];
  responseToAdd.response = '';

  if (response.length) {
    responses.data.push({ id: makeId(),aliases, response })
  }
}
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
  <fieldset class="field field--input-alias-responses">
    <legend>Alias & Responses</legend>
    <FormFieldAliases
      :horizontal="props.horizontal"
      :vertical="props.vertical"
      :value="aliases.data"
      label="Aliases"
      @input="(value) => (aliases.data = [...aliases.data, value])"
    />

    <FormField class="has-label" v-if="responses.data.length > 0">
      <div class="alias-responses">
        <h5>Alias/Response</h5>
        <div class="alias-responses__items">
          <div class="alias-responses__item" v-for="response in responses.data" :key="response.id">
            <div>
              <p>{{ response.response }}</p>
            </div>
            <div>
              <div class="form-buttons">
                <button class="button button--sm button--icon">
                  <span class="icon">
                    <SvgIcon type="mdi" :path="mdiTagMultiple" />
                  </span>
                </button>
                <button class="button button--sm button--icon">
                  <span class="icon">
                    <SvgIcon type="mdi" :path="mdiDelete" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormField>

    <FormField label="Responses" :horizontal="props.horizontal" :vertical="props.vertical">
      <template v-slot:pre>
        <FormFieldSelect
          :options="aliasOptions"
          :value="responseToAdd.aliases"
          @input="(value) => responseToAdd.aliases = [...value]"
          multiple
        >
          <template v-slot:selected-label>
            <span class="icon">
              <SvgIcon type="mdi" :path="mdiTagMultiple"/>
              </span>
          </template>
        </FormFieldSelect>
      </template>
      <input type="text" v-model="responseToAdd.response"/>
      <template v-if="commandOptions.tokens" v-slot:helpopup>
        <FormHelpTokens :command-options="commandOptions"/>
      </template>
    </FormField>
    <FormField class="has-label">
      <button class="button button--fw" @click.prevent="addResponse">
        <span class="text">Add Response</span>
      </button>
    </FormField>
  </fieldset>
</template>
