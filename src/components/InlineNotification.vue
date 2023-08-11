<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAlert, mdiInformation } from '@mdi/js'
import { computed } from 'vue'

const props = defineProps({
  isError: { type: Boolean },
  isWarning: { type: Boolean },
  isSuccess: { type: Boolean },
  isInfo: { type: Boolean }
})

const iconPath = computed(() => {
  switch (true) {
    case props.isError:
      return mdiAlert
    case props.isWarning:
      return mdiAlert
    case props.isSuccess:
      return mdiAlert
    case props.isInfo:
      return mdiInformation
  }
  return null
})
</script>

<template>
  <div
    :class="{
      'inline-notification': true,
      'is-error': props.isError,
      'is-warning': props.isWarning,
      'is-success': props.isSuccess,
      'is-info': props.isInfo
    }"
  >
    <div class="inline-notification__icon" v-if="iconPath">
      <span class="icon">
        <SvgIcon type="mdi" :path="iconPath" />
      </span>
    </div>
    <div class="inline-notification__content"><slot></slot></div>
  </div>
</template>
