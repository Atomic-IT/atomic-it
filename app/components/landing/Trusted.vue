<script setup lang="ts">
import { animate, stagger } from 'animejs'

const items = [
  { key: 'a', image: '/images/trusted/clinics.jpg' },
  { key: 'b', image: '/images/trusted/salons.jpg' },
  { key: 'c', image: '/images/trusted/workshops.jpg' },
  { key: 'd', image: '/images/trusted/law.jpg' },
  { key: 'e', image: '/images/trusted/local.jpg' },
] as const

const root = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!root.value) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const reveals = root.value.querySelectorAll<HTMLElement>('.reveal')
  const panels = root.value.querySelectorAll<HTMLElement>('.trusted-panel')

  if (reduce) {
    reveals.forEach((el) => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    })
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (!entry?.isIntersecting || !root.value) return

      animate(reveals, {
        opacity: [0, 1],
        translateY: [24, 0],
        delay: stagger(80),
        duration: 720,
        ease: 'outCubic',
      })

      animate(panels, {
        opacity: [0, 1],
        translateY: [36, 0],
        delay: stagger(90, { start: 120 }),
        duration: 820,
        ease: 'outCubic',
      })

      observer?.disconnect()
    },
    { threshold: 0.18 }
  )

  observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section ref="root" class="trusted" aria-labelledby="trusted-title">
    <div class="container trusted-intro">
      <p class="section-eyebrow reveal">{{ $t('trusted.label') }}</p>
      <h2 id="trusted-title" class="trusted-title reveal">
        {{ $t('trusted.title') }}
      </h2>
      <p class="trusted-lead reveal">{{ $t('trusted.lead') }}</p>
    </div>

    <div class="trusted-rail" role="list">
      <article
        v-for="item in items"
        :key="item.key"
        class="trusted-panel"
        role="listitem"
      >
        <img
          class="trusted-photo"
          :src="item.image"
          alt=""
          loading="lazy"
          decoding="async"
          width="900"
          height="1200"
        />
        <div class="trusted-shade" aria-hidden="true" />
        <div class="trusted-meta">
          <strong>{{ $t(`trusted.items.${item.key}.name`) }}</strong>
          <span>{{ $t(`trusted.items.${item.key}.hint`) }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.trusted {
  position: relative;
  overflow: clip;
  padding-block: $space-2xl 0;
  background: linear-gradient(180deg, #fbfcfe 0%, #eef3fb 55%, #e8eef8 100%);

  &-intro {
    max-width: 40rem;
    margin-bottom: $space-xl;
  }

  &-title,
  &-lead,
  .section-eyebrow {
    opacity: 0;
  }

  &-title {
    margin: 0 0 $space-md;
    font-size: clamp(2.2rem, 5vw, 3.4rem);
    font-weight: 800;
    letter-spacing: -0.05em;
    line-height: 1.02;
    color: $color-secondary;
  }

  &-lead {
    margin: 0;
    max-width: 34rem;
    color: $color-fg-muted;
    font-size: $font-size-lg;
    line-height: 1.55;
  }

  &-rail {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(15.5rem, 1fr);
    gap: 0;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    border-top: 1px solid rgb(15 23 42 / 10%);
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @include breakpoint(md) {
      grid-auto-flow: unset;
      grid-template-columns: repeat(5, 1fr);
      overflow: visible;
    }
  }

  &-panel {
    position: relative;
    display: grid;
    align-content: end;
    min-height: 22rem;
    padding: 1.35rem;
    overflow: hidden;
    border-right: 1px solid rgb(255 255 255 / 18%);
    scroll-snap-align: start;
    opacity: 0;
    isolation: isolate;

    &:last-child {
      border-right: 0;
    }

    &:hover .trusted-photo {
      transform: scale(1.08);
    }

    @include breakpoint(md) {
      min-height: 28rem;
      padding: 1.6rem;
    }
  }

  &-photo {
    position: absolute;
    inset: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.02);
    transition: transform 0.7s ease;
  }

  &-shade {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(
        180deg,
        rgb(7 11 20 / 8%) 0%,
        rgb(7 11 20 / 18%) 35%,
        rgb(7 11 20 / 78%) 100%
      ),
      linear-gradient(90deg, rgb(7 11 20 / 18%) 0%, transparent 40%);
    pointer-events: none;
  }

  &-meta {
    display: grid;
    gap: 0.3rem;

    strong {
      font-size: clamp(1.35rem, 2.2vw, 1.7rem);
      font-weight: 800;
      letter-spacing: -0.04em;
      color: #fff;
      text-shadow: 0 1px 12px rgb(0 0 0 / 25%);
    }

    span {
      color: rgb(255 255 255 / 82%);
      font-size: 0.95rem;
      font-weight: 600;
    }
  }
}
</style>
