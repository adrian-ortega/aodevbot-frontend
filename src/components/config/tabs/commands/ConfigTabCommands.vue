<script setup>
import { useCommandsStore } from '../../../../stores/commands'
import ConfigTabs from '../../ConfigTabs.vue'
import FormLoadingOverlay from '../../../form/FormLoadingOverlay.vue'
import InlineNotification from '../../../InlineNotification.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useLocalStore } from '../../../../stores/local'
const route = useRoute()
const cs = useCommandsStore()
const ls = useLocalStore()
const showCustomNotification = ref(ls.get('cmd:notice', true))
const hideCustomNotification = () => {
  showCustomNotification.value = false
}
const hideCustomNotificationPermanently = () => {
  hideCustomNotification()
  ls.save('cmd:notice', false)
}
</script>

<template>
  <div class="config-view">
    <FormLoadingOverlay v-if="cs.fetching" />
    <ConfigTabs base-route="config.commands" />
    <InlineNotification
      v-if="showCustomNotification && route.name === 'config.commands.list.custom'"
      is-info
    >
      <p>
        Custom commands are created in code, you can turn them off and on or edit their options
        where available
      </p>
      <div class="form-buttons">
        <a href="#" @click.prevent="hideCustomNotification">OK</a>
        <a href="#" @click.prevent="hideCustomNotificationPermanently">Don't show me again</a>
      </div>
    </InlineNotification>
    <RouterView />
  </div>
</template>
