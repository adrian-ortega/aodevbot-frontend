import FormField from './FormField.vue'
import FormFieldAliases from './FormFieldAliases.vue';
import FormFieldSelect from './FormFieldSelect.vue';
import FormFieldAliasResponses from './FormFieldAliasResponses.vue';
import FormFieldText from './FormFieldText.vue';
import FormFieldTextarea from './FormFieldTextarea.vue';
import FormFieldSwitch from './FormFieldSwitch.vue'

export default (app) => Object.entries({
  FormField,
  FormFieldAliases,
  FormFieldSelect,
  FormFieldAliasResponses,
  FormFieldText,
  FormFieldTextarea,
  FormFieldSwitch,
}).forEach(([componentName, component]) => app.component(componentName, component))