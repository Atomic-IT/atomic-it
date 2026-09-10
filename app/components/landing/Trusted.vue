<script setup lang="ts">
const items = [
  { key: 'a', image: '/images/trusted/clinics.jpg', pos: '50% 35%' },
  { key: 'b', image: '/images/trusted/salons.jpg', pos: '50% 30%' },
  { key: 'c', image: '/images/trusted/workshops.jpg', pos: '50% 40%' },
  { key: 'd', image: '/images/trusted/law.jpg', pos: '50% 35%' },
  { key: 'e', image: '/images/trusted/local.jpg', pos: '50% 45%' },
  { key: 'f', image: '/images/trusted/restaurants.jpg', pos: '50% 40%' },
] as const

const { root } = useAnimeReveal({ y: 28, staggerMs: 75, threshold: 0.15 })
</script>

<template>
  <section ref="root" class="section trusted" aria-labelledby="trusted-title">
    <div class="container trusted-inner">
      <div class="trusted-head">
        <p class="section-eyebrow reveal">{{ $t('trusted.label') }}</p>
        <h2 id="trusted-title" class="section-title reveal">
          {{ $t('trusted.title') }}
        </h2>
        <p class="section-lead reveal">{{ $t('trusted.lead') }}</p>
      </div>

      <ul class="trusted-gallery" role="list">
        <li
          v-for="item in items"
          :key="item.key"
          class="trusted-card reveal"
          role="listitem"
        >
          <figure class="trusted-figure">
            <img
              class="trusted-photo"
              :src="item.image"
              alt=""
              loading="lazy"
              decoding="async"
              width="800"
              height="1000"
              :style="{ objectPosition: item.pos }"
            />
            <figcaption class="trusted-caption">
              {{ $t(`trusted.items.${item.key}.name`) }}
            </figcaption>
          </figure>
        </li>
      </ul>

      <p class="trusted-note reveal">{{ $t('trusted.note') }}</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.trusted {
  overflow: clip;
  background: linear-gradient(180deg, #fbfcfe 0%, #f3f5f8 100%);

  &-inner {
    display: grid;
    gap: $space-xl;
  }

  &-head {
    max-width: 34rem;
    text-align: left;

    .section-eyebrow,
    .section-title,
    .section-lead {
      margin: 0;
    }

    .section-title {
      margin-bottom: $space-md;
    }
  }

  &-gallery {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.85rem;
    margin: 0;
    padding: 0 0 0.15rem;
    list-style: none;

    @include breakpoint(md) {
      grid-template-columns: repeat(6, minmax(9.5rem, 1fr));
      gap: 1rem;
    }
  }

  &-card {
    min-width: 0;
  }

  &-figure {
    position: relative;
    margin: 0;
    overflow: hidden;
    aspect-ratio: 4 / 5;
    border-radius: 1.15rem;
    background: #dde4ef;
    box-shadow: 0 16px 36px rgb(7 11 20 / 10%);
    transition:
      transform 0.35s ease,
      box-shadow 0.35s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 22px 44px rgb(7 11 20 / 14%);

      .trusted-photo {
        transform: scale(1.05);
      }
    }
  }

  &-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.02);
    transition: transform 0.6s ease;
  }

  &-figure::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgb(7 11 20 / 0%) 35%,
      rgb(7 11 20 / 18%) 62%,
      rgb(7 11 20 / 72%) 100%
    );
    pointer-events: none;
  }

  &-caption {
    position: absolute;
    right: 0.85rem;
    bottom: 0.85rem;
    left: 0.85rem;
    z-index: 1;
    color: #fff;
    font-size: clamp(1rem, 2.8vw, 1.15rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
    text-shadow: 0 2px 16px rgb(0 0 0 / 35%);
  }

  &-note {
    margin: 0;
    max-width: 36rem;
    color: $color-fg-muted;
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.45;
  }
}
</style>
