<script setup lang="ts">
const items = ['new', 'refresh', 'care'] as const
const { root } = useAnimeReveal({ staggerMs: 80 })
const localePath = useLocalePath()
</script>

<template>
  <section
    id="services"
    ref="root"
    class="section services"
    aria-labelledby="services-title"
  >
    <div class="container">
      <div class="services-intro">
        <p class="section-eyebrow reveal">{{ $t('services.eyebrow') }}</p>
        <h2 id="services-title" class="section-title reveal">
          <span
            v-for="(line, index) in $t('services.title').split('\n')"
            :key="index"
            class="services-title-line"
          >
            {{ line }}
          </span>
        </h2>
        <p class="section-lead reveal">{{ $t('services.lead') }}</p>
      </div>

      <div class="services-list">
        <a
          v-for="(item, index) in items"
          :key="item"
          class="services-row reveal"
          :href="`${localePath('/')}#contact`"
        >
          <span class="services-index">0{{ index + 1 }}</span>
          <div class="services-copy">
            <h3>{{ $t(`services.items.${item}.title`) }}</h3>
            <p>{{ $t(`services.items.${item}.text`) }}</p>
          </div>
          <span class="services-cta">
            {{ $t(`services.items.${item}.cta`) }}
            <span aria-hidden="true">→</span>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.services {
  background: #fff;

  &-title-line {
    display: block;
  }

  &-intro {
    max-width: 44rem;
    margin-bottom: $space-xl;
  }

  &-list {
    display: grid;
    border-top: 1px solid $color-border;
  }

  &-row {
    display: grid;
    gap: $space-md;
    align-items: center;
    padding-block: 1.5rem;
    border-bottom: 1px solid $color-border;
    transition: background-color 0.2s ease;

    &:hover {
      background: $color-bg;
    }

    @include breakpoint(md) {
      grid-template-columns: 3.5rem 1fr auto;
    }
  }

  &-index {
    font-size: 0.9rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: $color-primary;
  }

  &-copy {
    h3 {
      margin: 0 0 0.35rem;
      font-size: clamp(1.35rem, 2.5vw, 1.8rem);
      font-weight: 800;
      letter-spacing: -0.03em;
    }

    p {
      margin: 0;
      color: $color-fg-muted;
    }
  }

  &-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-weight: 800;
    color: $color-primary;
  }
}
</style>
