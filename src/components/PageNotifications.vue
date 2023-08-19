<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAlert, mdiClose, mdiExclamation, mdiInformation } from '@mdi/js'
import { useNotificationsStore } from '../stores/notifications'
const ns = useNotificationsStore()
const getIconPath = ({ type }) => {
  switch (type) {
    case ns.types.warning:
      return mdiAlert
    case ns.types.info:
      return mdiInformation
    default:
      return mdiExclamation
  }
}
</script>

<template>
  <div class="page-notifications" v-if="ns.hasItems">
    <div
      v-for="notification in ns.items"
      :key="notification.id"
      class="notification"
      :id="`n-${notification.id}`"
      :class="{
        'is-info': notification.type === ns.types.info,
        'is-warning': notification.type === ns.types.warning,
        'is-error': notification.type === ns.types.error,
        'is-success': notification.type === ns.types.success
      }"
    >
      <div class="notification__icon">
        <SvgIcon type="mdi" :path="getIconPath(notification)" />
      </div>
      <div class="notification__content">
        <p v-html="notification.text"></p>
      </div>
      <div class="notification__button">
        <button class="button button--transparent" @click.prevent="ns.dismiss(notification.id)">
          <span class="icon">
            <SvgIcon type="mdi" :path="mdiClose" />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
