<script setup>
defineProps({
  src: {
    type: String
  }
});
</script>

<template>
  <span class="avatar">
    <span class="avatar__bg" :style="{backgroundImage: `url(${src})`}"></span>
    <img :src="src" alt="User Avatar"/>
  </span>
</template>
