<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import PageContent from '../components/page/PageContent.vue'
import PageHeader from '../components/page/PageHeader.vue'
import FormField from '../components/form/FormField.vue'
import FormFieldSelect from '../components/form/FormFieldSelect.vue'
import InlineNotification from '../components/InlineNotification.vue'
import FormFieldAliases from '../components/form/FormFieldAliases.vue'
import FormLoadingOverlay from '../components/form/FormLoadingOverlay.vue'

import {
  mdiExclamationThick,
  mdiFolderEdit,
  mdiSkipNext,
  mdiFolderQuestion,
  mdiSend,
  mdiLink,
  mdiDotsHorizontal,
  mdiUsb,
  mdiPanHorizontal,
  mdiArrowUpDown,
  mdiArrowLeftRight
} from '@mdi/js'
import { ref, reactive } from 'vue'
import { ONE_SECOND } from '../util'

const formVertical = ref(false)
const formHorizontal = ref(true)
const toggleFormDirection = () => {
  formHorizontal.value = !formHorizontal.value
  formVertical.value = !formVertical.value
}
const formSelectOptions = ref([
  { label: 'Option One', value: 1 },
  { label: 'Another Option', value: 2 },
  { label: 'Alternative', value: 3 },
  { label: 'Dropdown Option', value: 4 }
])
const formSelected = reactive({
  simple: 1,
  aliases: ['alias', 'alias-one'],
  tab: 'Accounts',
  showLoading: false,
  showLoadingCountdown: 0
})

const showLoadingOverlayDuration = 5
const showLoadingOverlay = () => {
  let countdownId
  let lastTimestamp
  formSelected.showLoading = true
  formSelected.showLoadingCountdown = showLoadingOverlayDuration

  const updateCountdown = (ts) => {
    countdownId = window.requestAnimationFrame(updateCountdown)

    if (formSelected.showLoadingCountdown <= 0) {
      cancelAnimationFrame(countdownId)
    }

    if (ts - lastTimestamp > ONE_SECOND) {
      lastTimestamp = ts
      formSelected.showLoadingCountdown -= 1
    }
  }

  countdownId = window.requestAnimationFrame((ts) => {
    lastTimestamp = ts
    countdownId = window.requestAnimationFrame(updateCountdown)
  })
  setTimeout(() => {
    formSelected.showLoading = false
  }, showLoadingOverlayDuration * 1000)
}
</script>

<template>
  <PageHeader title="Components" />
  <PageContent>
    <div class="content">
      <!-- Buttons -->
      <fieldset>
        <legend>Buttons</legend>
        <fieldset>
          <legend>Default</legend>
          <div class="form-buttons">
            <button class="button">
              <span class="text">Regular</span>
            </button>
            <button class="button button--primary">
              <span class="text">Primary</span>
            </button>
            <button class="button button--danger">
              <span class="text">Danger</span>
            </button>
            <button class="button button--warning">
              <span class="text">Warning</span>
            </button>
            <button class="button button--success">
              <span class="text">Success</span>
            </button>
            <button class="button button--transparent">
              <span class="text">Transparent</span>
            </button>
          </div>
        </fieldset>
        <fieldset>
          <legend>With Icons</legend>
          <div class="form-buttons">
            <button class="button">
              <span class="text">Regular</span>
              <span class="icon">
                <SvgIcon type="mdi" :path="mdiFolderEdit" />
              </span>
            </button>
            <button class="button button--primary">
              <span class="text">Primary</span>
              <span class="icon">
                <SvgIcon type="mdi" :path="mdiSkipNext" />
              </span>
            </button>
            <button class="button button--danger">
              <span class="text">Danger</span>
              <span class="icon">
                <SvgIcon type="mdi" :path="mdiExclamationThick" />
              </span>
            </button>
            <button class="button button--warning">
              <span class="text">Warning</span>
              <span class="icon">
                <SvgIcon type="mdi" :path="mdiFolderQuestion" />
              </span>
            </button>
            <button class="button button--success">
              <span class="text">Success</span>
              <span class="icon">
                <SvgIcon type="mdi" :path="mdiSend" />
              </span>
            </button>
            <button class="button button--transparent">
              <span class="text">Transparent</span>
              <span class="icon">
                <SvgIcon type="mdi" :path="mdiLink" />
              </span>
            </button>
          </div>
          <div class="form-buttons">
            <button class="button">
              <span class="icon">
                <SvgIcon type="mdi" :path="mdiFolderEdit" />
              </span>
              <span class="text">Regular</span>
            </button>
            <button class="button button--primary">
              <span class="icon">
                <SvgIcon type="mdi" :path="mdiSkipNext" />
              </span>
              <span class="text">Primary</span>
            </button>
            <button class="button button--danger">
              <span class="icon">
                <SvgIcon type="mdi" :path="mdiExclamationThick" />
              </span>
              <span class="text">Danger</span>
            </button>
            <button class="button button--warning">
              <span class="icon">
                <SvgIcon type="mdi" :path="mdiFolderQuestion" />
              </span>
              <span class="text">Warning</span>
            </button>
            <button class="button button--success">
              <span class="icon">
                <SvgIcon type="mdi" :path="mdiSend" />
              </span>
              <span class="text">Success</span>
            </button>
            <button class="button button--transparent">
              <span class="icon">
                <SvgIcon type="mdi" :path="mdiLink" />
              </span>
              <span class="text">Transparent</span>
            </button>
          </div>
        </fieldset>
        <fieldset>
          <legend>Only Icons</legend>
          <div class="form-buttons">
            <button class="button button--icon">
              <span class="icon">
                <SvgIcon type="mdi" :path="mdiFolderEdit" />
              </span>
            </button>
            <button class="button button--icon button--primary">
              <span class="icon">
                <SvgIcon type="mdi" :path="mdiSkipNext" />
              </span>
            </button>
            <button class="button button--icon button--danger">
              <span class="icon">
                <SvgIcon type="mdi" :path="mdiExclamationThick" />
              </span>
            </button>
            <button class="button button--icon button--warning">
              <span class="icon">
                <SvgIcon type="mdi" :path="mdiFolderQuestion" />
              </span>
            </button>
            <button class="button button--icon button--success">
              <span class="icon">
                <SvgIcon type="mdi" :path="mdiSend" />
              </span>
            </button>
            <button class="button button--icon button--transparent">
              <span class="icon">
                <SvgIcon type="mdi" :path="mdiLink" />
              </span>
            </button>
          </div>
        </fieldset>

        <fieldset>
          <legend>Full Width</legend>
          <div class="form-buttons form-buttons--fw">
            <button class="button button--fw">
              <span class="text">Regular</span>
            </button>
            <button class="button button--primary">
              <span class="text">Primary</span>
            </button>
            <button class="button button--danger">
              <span class="text">Danger</span>
            </button>
            <button class="button button--warning">
              <span class="text">Warning</span>
            </button>
            <button class="button button--success">
              <span class="text">Success</span>
            </button>
            <button class="button button--fw button--transparent">
              <span class="text">Transparent</span>
            </button>
          </div>
        </fieldset>
      </fieldset>

      <!-- Form -->
      <fieldset>
        <legend>Form Items</legend>
        <fieldset>
          <legend>Default</legend>
          <FormField label="Style">
            <div class="form-buttons">
              <button class="button" @click.prevent="toggleFormDirection">
                <span class="icon">
                  <SvgIcon type="mdi" :path="formVertical ? mdiArrowLeftRight : mdiArrowUpDown" />
                </span>
                <span class="text">
                  <template v-if="formVertical">Horizontal</template>
                  <template v-if="formHorizontal">Vertical</template>
                </span>
              </button>
            </div>
          </FormField>

          <div class="edit-form">
            <FormField label="Simple" :horizontal="formHorizontal" :vertical="formVertical">
              <input type="text" />
            </FormField>

            <FormField
              label="With Pre and Post"
              :horizontal="formHorizontal"
              :vertical="formVertical"
            >
              <template v-slot:pre>
                <span class="icon">
                  <SvgIcon type="mdi" :path="mdiUsb" />
                </span>
              </template>
              <input type="text" />

              <template v-slot:post>
                <button class="button button--icon">
                  <span class="icon">
                    <SvgIcon type="mdi" :path="mdiDotsHorizontal" />
                  </span>
                </button>
              </template>
            </FormField>

            <FormField
              label="Everything"
              :horizontal="formHorizontal"
              :vertical="formVertical"
              help="This is a help text and is passed by attribute to the FormField component."
            >
              <template v-slot:pre>
                <span class="icon">
                  <SvgIcon type="mdi" :path="mdiUsb" />
                </span>
              </template>
              <input type="text" />
              <template v-slot:post>
                <button class="button button--icon">
                  <span class="icon">
                    <SvgIcon type="mdi" :path="mdiDotsHorizontal" />
                  </span>
                </button>
              </template>
            </FormField>

            <FormFieldAliases
              label="Aliases"
              :horizontal="formHorizontal"
              :vertical="formVertical"
              :value="formSelected.aliases"
              @input="(value) => (formSelected.aliases = [...formSelected.aliases, value])"
            />

            <FormField
              label="Textarea"
              :horizontal="formHorizontal"
              :vertical="formVertical"
              help="Textareas are useful for multi line content."
            >
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </FormField>

            <FormFieldSelect
              label="Select Dropdown"
              :options="formSelectOptions"
              :horizontal="formHorizontal"
              :vertical="formVertical"
              :value="formSelected.simple"
            />

            <FormFieldSelect
              label="Has Search"
              has-search
              :options="formSelectOptions"
              :horizontal="formHorizontal"
              :vertical="formVertical"
              :value="formSelected.simple"
            />
          </div>
        </fieldset>
      </fieldset>

      <!-- Notifications -->
      <fieldset>
        <legend>Notifications</legend>
        <fieldset>
          <legend>Default</legend>
          <InlineNotification>
            <p>No style, normal inline-notification</p>
          </InlineNotification>
          <InlineNotification is-info>
            <p>Information message</p>
          </InlineNotification>
          <InlineNotification is-success>
            <p>Success message</p>
          </InlineNotification>
          <InlineNotification is-warning>
            <p>Warning message</p>
          </InlineNotification>
          <InlineNotification is-error>
            <p>Error message</p>
          </InlineNotification>
        </fieldset>
      </fieldset>

      <!-- Tabs -->
      <fieldset>
        <legend>Tabs</legend>
        <fieldset>
          <legend>Default</legend>
          <nav class="tabs">
            <a
              href="#"
              class="tabs__trigger"
              v-for="tab in ['General', 'Accounts', 'Configuration', 'Debug', 'Testing']"
              :class="{
                'is-current': tab === formSelected.tab,
                'is-active': tab === formSelected.tab
              }"
              :key="tab"
              @click.prevent="() => (formSelected.tab = tab)"
            >
              <span class="text">{{ tab }}</span>
              <span class="tabs__trigger-bb"></span>
            </a>
          </nav>
          <div class="tabs__content">
            Showing content for the
            <strong class="is-primary-text">{{ formSelected.tab }}</strong> Tab
          </div>
        </fieldset>
      </fieldset>
      <fieldset>
        <legend>Misc</legend>
        <fieldset>
          <legend>User Interface Misc</legend>
          <div class="edit-form">
            <FormField label="Show Loading">
              <button class="button" @click.prevent="showLoadingOverlay">
                <span class="text">Show Loading a few secs</span>
              </button>
            </FormField>
          </div>
        </fieldset>
      </fieldset>
    </div>
    <FormLoadingOverlay v-if="formSelected.showLoading" full-page>
      <p>
        This is an <strong>example</strong> and will disappear in
        <code>{{ formSelected.showLoadingCountdown }} secs</code>
      </p>
    </FormLoadingOverlay>
  </PageContent>
</template>
