import FormField from './FormField.vue'
import FormFieldAliases from './FormFieldAliases.vue';
import FormFieldSelect from './FormFieldSelect.vue';
import FormFieldAliasResponses from './FormFieldAliasResponses.vue'

export default (app) => Object.entries({
  FormField,
  FormFieldAliases,
  FormFieldSelect,
  FormFieldAliasResponses
}).forEach(([componentName, component]) => app.component(componentName, component))