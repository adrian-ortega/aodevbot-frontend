<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiChartLine, mdiText } from '@mdi/js'
import { computed } from 'vue'
import { isEmpty } from '../../../../util'
import { useCommandsStore } from '../../../../stores/commands'
const cs = useCommandsStore()
const props = defineProps({
  type: { type: [Number, String] },
  id: { type: [Number, String] },
  description: { type: String },
  stats: { type: Array },
  examples: { type: Array }
})
const isCustomCommand = computed(() => props.type && props.type === 2)
const isCreateMode = computed(() => isEmpty(props.id))
</script>
<template>
  <div class="edit-form__sidebar">
    <template v-if="isCreateMode || (isCustomCommand && props.description.length > 0)">
      <div class="edit-form__desc edit-form__sidebar-widget">
        <h4>
          <span class="icon"><SvgIcon type="mdi" :path="mdiText" /></span>
          <span>Description</span>
        </h4>
        <div>
          <template v-if="isCreateMode">
            <p>
              You are creating a new <em>General</em> command. These types of commands have limited
              functionality and can be configured based on a template or a generic sentence
              response.
            </p>
          </template>
          <p v-else>{{ props.description }}</p>
        </div>
      </div>
    </template>
    <template v-if="stats && Object.keys(stats).length > 0">
      <div class="edit-form__stats edit-form__sidebar-widget">
        <h4>
          <span class="icon"><SvgIcon type="mdi" :path="mdiChartLine" /></span>
          <span>Statistics</span>
        </h4>
        <div>
          <div v-for="stat in props.stats" :key="stat.id" class="edit-form__stat-item">
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
    <template v-if="examples && examples.length > 0">
      <div class="edit-form__examples edit-form__sidebar-widget">
        <h4>
          <span class="icon"><SvgIcon type="mdi" :path="mdiText" /></span>
          <span>Examples</span>
        </h4>
        <div>
          <div v-for="example in props.examples" :key="example.example" class="edit-form__example">
            <p v-if="example.description">{{ example.description }}</p>
            <fieldset class="edit-form__pre">
              <legend>Example</legend>
              <pre>{{ example.example }}</pre>
            </fieldset>
          </div>
        </div>
      </div>
    </template>

    <div class="edit-form__sidebar-widget">
      <h4>
        <span class="icon"><SvgIcon type="mdi" :path="mdiText" /></span>
        <span>Submission</span>
      </h4>
      <div>
        <fieldset>
          <legend>Object</legend>
          <pre>{{ cs.lastSubmission }}</pre>
        </fieldset>
      </div>
    </div>
  </div>
</template>
