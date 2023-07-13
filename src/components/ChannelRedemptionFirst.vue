<script setup>
import url from 'url';
import { storeToRefs } from 'pinia';
import { useRedeemablesStore } from '../stores/redeemables';
import { useSoundsStore } from '../stores/sounds';
import { watch, ref } from 'vue';
const redeemablesStore = useRedeemablesStore();
const { firstToChat } = storeToRefs(redeemablesStore);

const hiddenCheer = ref(false);
const animateIn = ref(false);
const animateOut = ref(false);

const showMessage = async () => {
  const soundsStore = useSoundsStore();
  const soundFx = url.pathToFileURL('@/assets/autio/confetti-poppers.mp3');
  hiddenCheer.value = false;
  animateIn.value = true;
  animateOut.value = false;
  soundsStore.play(soundFx);

  console.log('confetti');
  // @TODO add confetti

  setTimeout(() => {
    console.log('confetti done');
    animateOut.value = true;
    animateIn.value = false;

    // @TODO remove confetti
  });
}

watch(firstToChat, (value) => { 
  if (value !== null) showMessage();
});
</script>
<template>
  {{ firstToChat }}
</template>