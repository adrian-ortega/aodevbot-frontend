<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiWindowMinimize } from '@mdi/js'
import { useLocalStore } from '../../stores/local'
import { onMounted, ref } from 'vue'
import { slugify } from '../../util'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
const ls = useLocalStore()
const getId = () => `bsc:${slugify(props.id)}`
const isOpen = ref(ls.get(getId(), true))

const $emit = defineEmits(['collapsed'])
const update = () => {
  ls.save(getId(), isOpen.value)
  $emit('collapsed', { id: props.id, value: isOpen.value })
}

const toggle = () => {
  isOpen.value = !isOpen.value
  update()
}

onMounted(update)
</script>
<template>
  <fieldset class="overlay-control" :class="{ 'is-open': isOpen, 'is-closed': !isOpen }">
    <template v-if="isOpen">
      <legend>{{ title }}</legend>
      <slot></slot>
    </template>
    <template v-else>
      <h4>{{ title }}</h4>
    </template>
    <button class="button button--sm" @click.prevent="toggle" :class="{ 'button--close': isOpen }">
      <span v-if="isOpen" class="icon">
        <SvgIcon type="mdi" :path="mdiWindowMinimize" />
      </span>
      <span v-else class="text">Open</span>
    </button>
  </fieldset>
</template>
