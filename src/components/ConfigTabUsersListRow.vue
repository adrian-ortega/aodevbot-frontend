<script setup>
import { ref } from 'vue'

const hover = ref(false)
const props = defineProps({
  row: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="table__row" :class="{ 'table__row--hovered': hover }">
    <div class="table__cell cb"><input type="checkbox" /></div>
    <div class="table__cell">
      <div class="table__cell-content">
        <h4 class="title">{{ row.display_name }}</h4>
      </div>
    </div>
    <div class="table__cell">
      <p>{{ row.username }}</p>
    </div>
    <div class="table__cell">
      <p>Affiliate</p>
    </div>
    <div class="table__cellactions right">
      <button class="button">
        <span class="text">Mod Card</span>
      </button>
    </div>
  </div>
</template>
