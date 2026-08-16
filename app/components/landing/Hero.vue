<script setup lang="ts">
import { createTimeline, stagger } from 'animejs'

const config = useRuntimeConfig()
const brandRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const leadRef = ref<HTMLElement | null>(null)
const actionsRef = ref<HTMLElement | null>(null)
const stageRef = ref<HTMLElement | null>(null)

const calendlyUrl = computed(() => config.public.calendlyUrl as string)
const whatsappUrl = computed(() => config.public.whatsappUrl as string)

onMounted(() => {
  const nodes = [
    brandRef.value,
    titleRef.value,
    leadRef.value,
    actionsRef.value,
    stageRef.value,
  ]

  const show = () => {
    nodes.forEach((node) => {
      if (node) {
        node.style.opacity = '1'
        node.style.transform = 'none'
      }
    })
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    show()
    return
  }

  const lines = titleRef.value?.querySelectorAll('.hero-line') ?? []
  const timeline = createTimeline({ defaults: { ease: 'outCubic' } })

  if (brandRef.value) {
    timeline.add(brandRef.value, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 500,
    })
  }

  if (lines.length) {
    timeline.add(
      lines,
      {
        opacity: [0, 1],
        translateY: [40, 0],
        delay: stagger(100),
        duration: 720,
      },
      '-=280'
    )
  }

  const outro = [leadRef.value, actionsRef.value].filter(
    (node): node is HTMLElement => Boolean(node)
  )

  if (outro.length) {
    timeline.add(
      outro,
      {
        opacity: [0, 1],
        translateY: [18, 0],
        delay: stagger(70),
        duration: 560,
      },
      '-=420'
    )
  }

  if (stageRef.value) {
    timeline.add(
      stageRef.value,
      {
        opacity: [0, 1],
        translateY: [48, 0],
        duration: 900,
      },
      '-=700'
    )
  }

  window.setTimeout(show, 1800)
})
</script>

<template>
  <section class="hero">
    <div class="hero-glow" aria-hidden="true" />
    <div class="container hero-grid">
      <div class="hero-copy">
        <p ref="brandRef" class="hero-badge">{{ $t('hero.badge') }}</p>

        <h1 ref="titleRef" class="hero-title">
          <span class="hero-line">{{ $t('hero.titleLine1') }}</span>
          <span class="hero-line hero-line-accent">
            {{ $t('hero.titleLine2') }}
          </span>
        </h1>

        <p ref="leadRef" class="hero-lead">{{ $t('hero.lead') }}</p>

        <div ref="actionsRef" class="hero-actions">
          <a
            class="hero-btn hero-btn-primary"
            :href="calendlyUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ $t('hero.ctaPrimary') }}
          </a>
          <a
            class="hero-btn hero-btn-ghost"
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ $t('hero.ctaSecondary') }}
          </a>
        </div>
      </div>

      <div ref="stageRef" class="hero-stage">
        <ContactForm :title="$t('hero.formTitle')" title-id="hero-form-title" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  overflow: clip;
  padding-block: 4.5rem $space-xl;
  background:
    radial-gradient(circle at 88% 8%, rgb(24 73 214 / 18%) 0%, transparent 34%),
    linear-gradient(180deg, #fbfcfe 0%, $color-bg 100%);

  &-glow {
    position: absolute;
    inset: auto -10% -20% 40%;
    height: 50%;
    background: radial-gradient(
      circle,
      rgb(24 73 214 / 12%) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  &-grid {
    position: relative;
    z-index: 1;
    display: grid;
    gap: $space-xl;
    align-items: center;

    @include breakpoint(md) {
      grid-template-columns: 1.05fr 0.95fr;
      gap: $space-2xl;
    }
  }

  &-badge,
  &-line,
  &-lead,
  &-actions,
  &-stage {
    opacity: 0;
  }

  &-badge {
    display: inline-flex;
    margin: 0 0 $space-md;
    padding: 0.5rem 0.95rem;
    border-radius: 999px;
    background: $color-primary-muted;
    color: $color-primary;
    font-size: 0.84rem;
    font-weight: 700;
  }

  &-title {
    margin: 0 0 $space-md;
    font-size: $font-size-hero;
    font-weight: 800;
    letter-spacing: -0.05em;
    line-height: 0.95;
    color: $color-secondary;
  }

  &-line {
    display: block;

    &-accent {
      color: $color-primary;
    }
  }

  &-lead {
    margin: 0 0 $space-lg;
    max-width: 34rem;
    color: #334155;
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    font-weight: 500;
  }

  &-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    margin-bottom: $space-md;
  }

  &-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3.4rem;
    padding: 0.9rem 1.55rem;
    border: 1.5px solid transparent;
    border-radius: 999px;
    font-size: 1.05rem;
    font-weight: 700;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;

    &:hover {
      transform: translateY(-1px);
    }

    &-primary {
      background: #1849d6;
      color: #fff;
      box-shadow: 0 16px 36px rgb(24 73 214 / 28%);

      &:hover {
        background: #1239b0;
        color: #fff;
      }
    }

    &-ghost {
      background: #fff;
      border-color: #64748b;
      color: #070b14;
      box-shadow: 0 10px 24px rgb(10 15 26 / 8%);

      &:hover {
        border-color: #1849d6;
        color: #1849d6;
      }
    }
  }

  &-stage {
    position: relative;
    justify-self: stretch;
  }
}
</style>
