<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiLoading, mdiSkipNext, mdiStop } from '@mdi/js'
import { useWebsocketStore } from '../../stores/websocket'
import { ONE_SECOND, elapsedSeconds } from '../../util'
import { onMounted, reactive, ref } from 'vue'

const ws = useWebsocketStore()
const durationLeft = ref(0)
const statsState = reactive({
  loaded: false,
  data: {}
})
let durationId
const headerAndStats = {
  next() {
    ws.send('stats.next')
    this.update()
  },
  stop() {
    ws.send('stats.stop')
    clearTimeout(durationId)
    this.update()
  },
  update() {
    setTimeout(() => ws.send('stats.current'), ONE_SECOND)
  }
}

const updateDurationTimer = () => {
  const { duration, lastTimestamp } = statsState.data
  if (!duration) return

  const now = new Date().getTime()
  const ends = lastTimestamp + duration
  const elapsed = ends - now
  durationLeft.value = elapsedSeconds(elapsed / 1000)
  if (elapsed > 0) {
    durationTimer()
  }
}

const durationTimer = () => {
  clearTimeout(durationId)
  durationId = setTimeout(updateDurationTimer, ONE_SECOND)
}

ws.onMessage(({ event, payload }) => {
  if (event && event === 'stats.current') {
    statsState.data = { ...payload }
    statsState.loaded = true
    durationTimer()
  }
})

onMounted(() => {
  headerAndStats.update()
})
</script>
<template>
  <fieldset>
    <legend>Header &amp; Stats</legend>
    <div v-if="!statsState.loaded" class="icon is-spinner">
      <SvgIcon type="mdi" :path="mdiLoading" />
    </div>
    <template v-else>
      <div class="field">
        <dl>
          <dt>Group</dt>
          <dd>{{ statsState.data?.type }}</dd>
          <dt>Next</dt>
          <dd>{{ statsState.data?.nextGroup }}</dd>
          <dt>Duration</dt>
          <dd>{{ durationLeft }}</dd>
        </dl>
      </div>
      <div class="form-buttons">
        <button class="button" @click.prevent="headerAndStats.stop">
          <span class="icon"><SvgIcon type="mdi" :path="mdiStop" /></span>
          <span class="text">Stop</span>
        </button>
        <button class="button" @click.prevent="headerAndStats.next">
          <span class="text">Next</span>
          <span class="icon"><SvgIcon type="mdi" :path="mdiSkipNext" /></span>
        </button>
      </div>
    </template>
  </fieldset>
</template>
