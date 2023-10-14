<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiHelpCircle } from '@mdi/js'
import { computed, useSlots } from 'vue'
const $slots = useSlots()
const props = defineProps({
  label: {
    type: String
  },
  help: {
    type: String
  },
  horizontal: {
    type: Boolean,
    default: true
  },
  vertical: {
    type: Boolean,
    default: false
  }
})

const hasHelp = computed(() => props.help && props.help.length > 0)
const hasLabel = computed(() => !!($slots.label || props.label))
const fieldCssClasses = computed(() => {
  const cssClasses = ['field']
  if (props.vertical) {
    cssClasses.push('is-vertical')
  } else if (props.horizontal) {
    cssClasses.push('is-horizontal')
  }
  if (hasLabel.value) {
    cssClasses.push('has-label')
  }
  return cssClasses
})
</script>
<template>
  <div :class="fieldCssClasses">
    <div v-if="hasLabel" class="field__label">
      <slot name="label">{{ props.label }}</slot>
    </div>
    <div
      class="field__content"
      :class="{
        'has-pre': $slots.pre,
        'has-post': $slots.post,
        'has-help': hasHelp
      }"
    >
      <div v-if="$slots.pre" class="field__pre">
        <slot name="pre"></slot>
      </div>
      <div class="field__input" v-if="$slots.default">
        <slot name="default"></slot>
      </div>
      <div v-if="$slots.post" class="field__post">
        <slot name="post"></slot>
      </div>
      <p v-if="hasHelp" class="field__help">
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiHelpCircle" />
        </span>
        <span v-html="props.help"></span>
      </p>
    </div>
  </div>
</template>
