<script setup>
import { computed, useSlots } from 'vue';
import { slugify } from '../../../util';
const $slots = useSlots();
const props = defineProps({
  title: {
    type: String,
    default: 'Widget'
  }
})
const hasHeaderActions = computed(() => !!$slots['header-actions'])
const widgetCssClasses = computed(() => {
  const cssClasses = ['widget'];
  cssClasses.push(`widget--${slugify(props.title)}`)
  return cssClasses;
})
</script>

<template>
  <div :class="widgetCssClasses">
    <div class="widget__header">
      <div class="widget__title">
        <h4>{{ props.title}}</h4>
      </div>
      <div v-if="hasHeaderActions" class="widget__actions">
        <slot name="header-actions"/>
      </div>
    </div>
    <div class="widget__content">
      <slot/>
    </div>
  </div>
</template>