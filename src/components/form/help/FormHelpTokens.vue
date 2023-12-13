<script setup>
const props = defineProps({
  commandOptions: {
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
      <template v-for="token in commandOptions.tokens" :key="token">
        <dt>
          <code>{{ token }}</code>
        </dt>
        <dd>
          {{ commandOptions.token_descriptions[token] }}
        </dd>
      </template>
    </dl>
  </div>
</template>
