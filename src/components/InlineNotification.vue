<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAlert } from '@mdi/js';
import { computed } from 'vue';

const props = defineProps({
  isError: { type: Boolean },
  isWarning: { type: Boolean },
  isSuccess: { type: Boolean }
});

const iconPath = computed(() => {
  switch (true) {
    case props.isError: return mdiAlert;
    case props.isWarning: return mdiAlert;
    case props.isSuccess: return mdiAlert;
  }
  return null;
})
</script>

<template>
  <div :class="{
    'inline-notification': true,
    'is-error': isError,
    'is-warning': isWarning,
    'is-success': isSuccess
  }">
    <div class="inline-notification__icon" v-if="iconPath">
      <span class="icon">
        <SvgIcon type="mdi" :path="iconPath"/>
      </span>
    </div>
    <div class="inline-notification__content"><slot></slot></div>
    
  </div>
</template>
