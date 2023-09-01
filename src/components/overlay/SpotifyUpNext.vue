<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiSpotify } from '@mdi/js'
</script>

<template>
  <div class="spotify-up-next">
    <div class="spotify-up-next__container">
      <div class="spotify-up-next__header">
        <div><strong>!sr</strong> from</div>
        <div :class="{ marquee: true }">
          <span><em>AODEV</em> </span>
        </div>
      </div>
      <div class="spotify-up-next__content">
        <div class="spotify-up-next__label">
          <span class="icon">
            <SvgIcon type="mdi" :path="mdiSpotify" />
          </span>
        </div>
        <div class="spotify-up-next__track">
          <div class="spotify-up-next__title">
            <div :class="{ marquee: false }">
              <div>Some song name that's really long</div>
            </div>
          </div>
          <div class="spotify-up-next__artist">
            <div :class="{ marquee: false }">
              <div>Artist name</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.spotify-up-next {
  bottom: var(--o-spotify-bottom);
  right: calc(var(--o-spotify-width) + var(--o-gap));

  &__container::after {
    display: none;
  }

  &__header {
    display: flex;
    gap: 0.25em;
    font-size: var(--font-size-small);
    border-bottom: 0.0625em solid var(--black-alpha-30);
    padding: 0.4em 0.5em;
    background: var(--o-bg);
    font-weight: var(--o-font-weight-bold);

    > div {
      flex: 0 0 auto;
    }

    strong {
      text-transform: uppercase;
      color: var(--primary);
    }

    em {
      font-style: normal;
      color: var(--o-tertiary);
    }

    .marquee {
      display: inline-flex;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 3em auto;
    background: linear-gradient(13deg, var(--o-bg-bis) -125%, var(--o-bg) 100%);
  }

  &__label {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    background: var(--black-alpha-50);

    .icon {
      animation: jump 0.9s infinite linear;
      color: var(--spotify);
    }
  }

  &__title {
    padding-top: 0.3em;
    padding-bottom: 0.2em;
  }
}
</style>
