<script setup>
import { useCommandsStore } from '../stores/commands'
import ConfigTabs from './ConfigTabs.vue'
import FormLoadingOverlay from './FormLoadingOverlay.vue'
import InlineNotification from './InlineNotification.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const cs = useCommandsStore()
</script>

<template>
  <div class="config-view">
    <FormLoadingOverlay v-if="cs.fetching" />
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
