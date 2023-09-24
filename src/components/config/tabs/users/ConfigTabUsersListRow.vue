<script setup>
import AvatarImage from '../../../AvatarImage.vue'
import { ref } from 'vue'
import { popupWindowCenter } from '../../../../util'
import { useAccountsStore } from '../../../../stores/accounts'
const accounts = useAccountsStore()
const hover = ref(false)
const props = defineProps({
  row: {
    type: Object,
    required: true
  }
})

const openModCard = async () => {
  popupWindowCenter({
    url: `https://twitch.tv/popout/${accounts.broadcaster.username}/viewercard/${props.row.username}?popout=`
  })
}
</script>

<template>
  <div class="table__row" :class="{ 'table__row--hovered': hover }">
    <div class="table__cell cb"><input type="checkbox" /></div>
    <div class="table__cell">
      <div class="table__cell-content">
        <div class="chatter-inline">
          <AvatarImage :src="row.profile_image_url" class="chatter-inline__avatar" />
          <div class="chatter-inline__name">
            <h4 class="title">{{ row.display_name }}</h4>
            <p class="is-id">{{ row.twitch_id }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="table__cell">
      <p class="is-id">{{ row.username }}</p>
    </div>
    <div class="table__cell">
      <p>Affiliate</p>
    </div>
    <div class="table__cell actions right">
      <button class="button" @click.prevent="() => openModCard()">
        <span class="text">Mod Card</span>
      </button>
    </div>
  </div>
</template>
