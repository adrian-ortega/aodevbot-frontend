<script setup>
import MenuDropdown from '../MenuDropdown.vue'
import FormField from '../FormField.vue'
import ChatUserSelector from '../ChatUserSelector.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiChevronDown, mdiSend } from '@mdi/js'
import { useRedeemablesStore } from '../../stores/redeemables'
import { useWebsocketStore } from '../../stores/websocket'
import { computed, onMounted, reactive, ref } from 'vue'
import { useChatStore } from '../../stores/chat'

const rs = useRedeemablesStore()
const ws = useWebsocketStore()
const cs = useChatStore()
const selected = reactive({ data: {} })
const selectedReward = computed(() => selected.data)
const chatMessage = ref('')

onMounted(async () => {
  await rs.fetchRewards()
  selected.data = { ...rs.rewards[0] }
})

const menuDdLabel = computed(() => selected.data?.title)
const onMenuDdToggle = ({ toggleMenu }) => {
  toggleMenu()
}
const onRewardSelect = ({ closeMenu, openMenu, reward }) => {
  selected.data = { ...reward }
  closeMenu()
}

const sendRedemption = () => {
  ws.send('debug.redeemable', {
    data: { ...selected.data },
    chatter_id: cs.chatter.chatter_id,
    twitch_id: cs.chatter.twitch_id,
    message: chatMessage.value
  })
}
</script>

<template>
  <fieldset class="overlay-control overlay-control--redemptions">
    <legend>Redemptions</legend>
    <div class="field">
      <MenuDropdown
        :trigger-label="menuDdLabel"
        :trigger-icon="mdiChevronDown"
        :trigger-handler="onMenuDdToggle"
        class="channel-point-rewards-selector"
      >
        <template v-slot:default="{ closeMenu, openMenu }">
          <div v-for="reward in rs.rewards" :key="reward.id">
            <div
              class="channel-point-reward"
              @click.prevent="onRewardSelect({ closeMenu, openMenu, reward })"
            >
              <div class="channel-point-reward__image">
                <figure :style="{ backgroundColor: reward.background_color }">
                  <img
                    :src="reward.image ? reward.image.url_1x : reward.default_image.url_1x"
                    alt=""
                  />
                </figure>
              </div>
              <div class="channel-point-reward__info">
                <p>{{ reward.title }}</p>
              </div>
            </div>
          </div>
        </template>
      </MenuDropdown>
    </div>
    <div class="field">
      <div class="channel-point-reward">
        <div class="channel-point-reward__image">
          <figure :style="{ backgroundColor: selectedReward.background_color }">
            <img
              v-if="selectedReward.default_image"
              :src="
                selectedReward.image
                  ? selectedReward.image.url_1x
                  : selectedReward.default_image.url_1x
              "
              alt=""
            />
          </figure>
        </div>
        <div class="channel-point-reward__info">
          <h4>{{ selectedReward.title }}</h4>
          <p>{{ selectedReward.prompt }}</p>
          <p>
            <strong>{{ parseInt(selectedReward.cost).toLocaleString() }}</strong> 🪙
          </p>
        </div>
      </div>
    </div>
    <FormField label="Chat message" vertical>
      <template v-slot:pre>
        <ChatUserSelector />
      </template>
      <input type="text" v-model="chatMessage" @keyup.enter.prevent="sendRedemption" />
      <template v-slot:post>
        <button class="button button--primary" @click.prevent="sendRedemption">
          <span class="icon">
            <SvgIcon type="mdi" :path="mdiSend" />
          </span>
        </button>
      </template>
    </FormField>
  </fieldset>
</template>
