<script setup>
import { computed } from 'vue'
import AvatarImage from '../../AvatarImage.vue'
import { isObject } from '../../../util'

const props = defineProps({
  type: {
    type: String
  },
  item: {
    type: Object
  }
})
const itemBitValue = computed(() => {
  const val = props.item.value
  switch (true) {
    case val > 1000000:
      return `${(val / 1000000).toFixed(1)}M`
    case val > 1000:
      return `${(val / 1000).toFixed(1)}K`
    default:
      return val
  }
})

const itemHasUser = computed(() => isObject(props.item.user))
const itemUser = computed(() => (itemHasUser.value ? props.item.user : null))
const itemProfileImageUrl = computed(() => {
  if (!itemHasUser.value || !itemUser.value.profile_image_url) return null
  return itemUser.value.profile_image_url
})
</script>
<template>
  <div
    class="header-stat"
    :class="{
      [`header-stat--${props.type}`]: true,
      'header-stat--has-image':
        ['bits-leaders', 'followers'].includes(props.type) || itemProfileImageUrl
    }"
  >
    <template v-if="props.type === 'bits-leaders'">
      <div class="header-stat__image header-stat__image--is-number">
        <span class="header-stat__number">
          <span v-html="itemBitValue"></span>
        </span>
      </div>
      <div class="header-stat__title"><span v-html="item.title"></span></div>
      <div class="header-stat__value">
        <span v-html="item.user.display_name"></span>
      </div>
    </template>
    <template v-else>
      <template v-if="itemProfileImageUrl">
        <div class="header-stat__image">
          <AvatarImage :src="itemProfileImageUrl" />
        </div>
      </template>
      <div class="header-stat__title"><span v-html="item.title"></span></div>
      <div class="header-stat__value">
        <span v-html="item.value"></span>
      </div>
    </template>
  </div>
</template>
