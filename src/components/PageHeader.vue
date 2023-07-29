<script setup>
defineProps({
  title: String
})
</script>

<template>
  <div class="page-header">
    <div class="page-header__container">
      <div class="page-header__item page-header__item--left" v-if="$slots.left">
        <slot name="left"></slot>
      </div>
      <div class="page-header__item page-header__item--center" v-if="title">
        <h1>{{ title }}</h1>
      </div>
      <div class="page-header__itempage-header__item--right" v-if="$slots.right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
