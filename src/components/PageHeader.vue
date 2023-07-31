<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDotsVertical, mdiRobotHappy } from '@mdi/js';

defineProps({
  title: String
})
</script>

<template>
  <div class="page-header">
    <div class="page-header__container">
      <div class="page-header__item page-header__item--left">
        <div class="logo">
          <SvgIcon type="mdi" :path="mdiRobotHappy" size="28"/>
          <span class="name">
            <span>aodev</span>
            <span>bot</span>
          </span>
        </div>
        <slot name="left"></slot>
      </div>
      <div class="page-header__item page-header__item--center" v-if="title">
        <h1>{{ title }}</h1>
      </div>
      <div class="page-header__item page-header__item--right">
        <slot name="right"></slot>
        <button class="button button--transparent">
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiDotsVertical"/>
        </span>
      </button>
      </div>
    </div>
  </div>
</template>
