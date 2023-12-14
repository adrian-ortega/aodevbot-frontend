<script setup>
const props = defineProps({
  tokens: {
    type: [Object],
    default: () => {
      return {}
    }
  }
})
</script>
<template>
  <div class="help-content">
    <h4>Tokens</h4>
    <p>Use these placeholder tokens as such <code>{token_name}</code></p>
    <dl class="token-descriptions">
      <template v-for="(description, token) in props.tokens" :key="token">
        <dt>
          <code>{{ token }}</code>
        </dt>
        <dd>{{ description }}</dd>
      </template>
    </dl>
  </div>
</template>
