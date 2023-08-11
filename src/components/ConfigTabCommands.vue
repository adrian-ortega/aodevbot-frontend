<script setup>
import ConfigTabs from './ConfigTabs.vue'
import InlineNotification from './InlineNotification.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="config-view">
    <ConfigTabs base-route="config.commands" />
    <InlineNotification v-if="route.name === 'config.commands.list.custom'" is-info>
      <p>
        Custom commands are created in code, you can turn them off and on or edit their options
        where available
      </p>
    </InlineNotification>
    <RouterView />
  </div>
</template>
