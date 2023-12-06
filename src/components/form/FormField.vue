<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClose, mdiHelp, mdiHelpCircle } from '@mdi/js';
import { ref, computed, useSlots } from 'vue';
const $slots = useSlots()
const props = defineProps({
  label: {
    type: String
  },
  help: {
    type: String
  },
  horizontal: {
    type: Boolean,
    default: true
  },
  vertical: {
    type: Boolean,
    default: false
  },
  commandOptions: {
    type: [Object],
    default: () => {
      return {}
    }
  }
})

const hasHelp = computed(() => props.help && props.help.length > 0)
const hasLabel = computed(() => !!($slots.label || props.label))
const hasHelpPopup = computed(() => !!$slots.helpopup)
const fieldCssClasses = computed(() => {
  const cssClasses = ['field']
  if (props.vertical) {
    cssClasses.push('is-vertical')
  } else if (props.horizontal) {
    cssClasses.push('is-horizontal')
  }
  if (hasLabel.value) {
    cssClasses.push('has-label')
  }
  return cssClasses
})

const helpPopupEl = ref(null)
const helpIsOpen = ref(false)
const helpPopupEscapeKeyHandler = (event) => (event.keyCode === 27 ? closeHelpPopup() : undefined)
const helpPopupOutsideClickEventHandler = (event) => {
  if (!helpIsOpen.value) {
    return false
  }
  const $el = helpPopupEl.value
  if (event.target !== $el && !$el.contains(event.target)) {
    closeHelpPopup()
  }
}
const openHelpPopup = (evt) => {
  helpIsOpen.value = true
  setTimeout(() => {
    helpPopupEl.value = evt.target.closest('.field').querySelector('.field__help-popup__inner');
  }, 10);
  document.addEventListener('keyup', helpPopupEscapeKeyHandler, false)
  document.addEventListener('click', helpPopupOutsideClickEventHandler, false)
} 

const closeHelpPopup = () => {
  helpIsOpen.value = false
  helpPopupEl.value = null;
  document.removeEventListener('keyup', helpPopupEscapeKeyHandler)
  document.removeEventListener('click', helpPopupOutsideClickEventHandler)
}

</script>
<template>
  <div :class="fieldCssClasses">
    <div class="field__help-popup" v-if="helpIsOpen">
      <div class="field__help-popup__inner">
        <div class="field__help-popup__header">
          <h4>Help</h4>
          <button class="button button--close" @click.prevent="closeHelpPopup">
            <span class="icon">
              <SvgIcon type="mdi" :path="mdiClose"/>
            </span>
          </button>
        </div>
        <div class="field__help-popup__content">
          <slot name="helpopup"></slot>
        </div>
      </div>
    </div>
    <div v-if="hasLabel" class="field__label">
      <slot name="label">
        <span>{{ props.label }}</span>
      </slot>
      <template v-if="hasHelpPopup">
        <button class="button button--help" title="Show Field Help" @click.prevent="openHelpPopup">
          <span class="icon">
            <SvgIcon type="mdi" :path="mdiHelpCircle" />
          </span>
        </button>
      </template>
    </div>
    <div
      class="field__content"
      :class="{
        'has-pre': $slots.pre,
        'has-post': $slots.post,
        'has-help': hasHelp
      }"
    >
      <div v-if="$slots.pre" class="field__pre">
        <slot name="pre"></slot>
      </div>
      <div class="field__input" v-if="$slots.default">
        <slot name="default"></slot>
      </div>
      <div v-if="$slots.post" class="field__post">
        <slot name="post"></slot>
      </div>
      <p v-if="hasHelp" class="field__help">
        <span class="icon">
          <SvgIcon type="mdi" :path="mdiHelpCircle" />
        </span>
        <span v-html="props.help"></span>
      </p>
    </div>
  </div>
</template>
