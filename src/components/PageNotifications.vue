<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import {
  mdiAlert,
  mdiClose,
  mdiExclamation,
  mdiInformation,
  mdiProgressCheck,
  mdiProgressClock
} from '@mdi/js'
import { useNotificationsStore } from '../stores/notifications'
const ns = useNotificationsStore()
const getIconPath = ({ type, percentage }) => {
  switch (type) {
    case ns.types.progress:
      return percentage >= 100 ? mdiProgressCheck : mdiProgressClock
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
        'is-progress': notification.type === ns.types.progress,
        'is-info':
          notification.type === ns.types.info ||
          (notification.type === ns.types.progress && notification.percentage < 100),
        'is-warning': notification.type === ns.types.warning,
        'is-error': notification.type === ns.types.error,
        'is-success':
          notification.type === ns.types.success ||
          (notification.type === ns.types.progress && notification.percentage >= 100)
      }"
    >
      <div class="notification__icon">
        <SvgIcon type="mdi" :path="getIconPath(notification)" />
      </div>
      <div class="notification__content">
        <template v-if="notification.type === ns.types.progress">
          <h4 v-html="notification.title"></h4>
          <div class="notification__progress">
            <div>
              <div :style="{ width: `${notification.percentage}%` }">
                <span v-if="notification.percentage > 5 && notification.percentage < 100"
                  >{{ notification.percentage }}%</span
                >
              </div>
            </div>
          </div>
        </template>
        <p v-if="notification.text" v-html="notification.text"></p>
      </div>
      <div
        class="notification__button"
        v-if="notification.type !== ns.types.progress || notification.percentage >= 100"
      >
        <button class="button button--transparent" @click.prevent="ns.dismiss(notification.id)">
          <span class="icon">
            <SvgIcon type="mdi" :path="mdiClose" />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
