<script setup lang="ts">
import { createTimeline, stagger } from 'animejs'

const config = useRuntimeConfig()
const brandRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const leadRef = ref<HTMLElement | null>(null)
const actionsRef = ref<HTMLElement | null>(null)
const stageRef = ref<HTMLElement | null>(null)

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
    <div class="hero-bg" aria-hidden="true">
      <span class="hero-glow hero-glow-a" />
      <span class="hero-glow hero-glow-b" />
      <span class="hero-glow hero-glow-c" />
      <span class="hero-dots" />
      <div class="hero-atom">
        <div class="hero-shell hero-shell-a">
          <span class="hero-ring" />
          <span class="hero-electron" />
        </div>
        <div class="hero-shell hero-shell-b">
          <span class="hero-ring" />
          <span class="hero-electron" />
        </div>
        <div class="hero-shell hero-shell-c">
          <span class="hero-ring" />
        </div>
        <span class="hero-core" />
      </div>
      <span class="hero-horizon" />
      <span class="hero-noise" />
    </div>
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
          <MagneticButton :href="whatsappUrl" variant="primary" external>
            <WhatsAppIcon />
            {{ $t('hero.ctaSecondary') }}
          </MagneticButton>
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
  padding-block: 5rem $space-xl;
  background:
    radial-gradient(ellipse 55% 42% at 92% -8%, rgb(24 73 214 / 28%) 0%, transparent 62%),
    radial-gradient(ellipse 48% 38% at 6% 18%, rgb(90 140 255 / 34%) 0%, transparent 58%),
    linear-gradient(165deg, #dbe6ff 0%, #edf2fb 38%, #f5f7fb 72%, $color-bg 100%);

  &-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }

  &-glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(8px);

    &-a {
      top: -12rem;
      right: -8rem;
      width: 40rem;
      height: 40rem;
      background: radial-gradient(
        circle,
        rgb(24 73 214 / 36%) 0%,
        rgb(157 182 255 / 22%) 38%,
        transparent 68%
      );
      animation: hero-drift 18s ease-in-out infinite alternate;
    }

    &-b {
      top: 8%;
      left: -12rem;
      width: 30rem;
      height: 30rem;
      background: radial-gradient(
        circle,
        rgb(120 160 255 / 40%) 0%,
        transparent 70%
      );
      animation: hero-drift 22s ease-in-out infinite alternate-reverse;
    }

    &-c {
      right: 22%;
      bottom: -16rem;
      width: 34rem;
      height: 24rem;
      background: radial-gradient(
        circle,
        rgb(180 205 255 / 80%) 0%,
        transparent 72%
      );
      animation: hero-drift 26s ease-in-out infinite alternate;
    }
  }

  &-dots {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      circle,
      rgb(24 73 214 / 22%) 1.1px,
      transparent 1.4px
    );
    background-size: 1.45rem 1.45rem;
    mask-image: radial-gradient(
      ellipse 80% 70% at 28% 36%,
      #000 8%,
      transparent 68%
    );
    opacity: 0.7;
  }

  &-atom {
    position: absolute;
    top: -6%;
    left: -4%;
    width: min(52vw, 36rem);
    aspect-ratio: 1;
    opacity: 0.38;

    @include breakpoint(md) {
      top: -2%;
      left: 4%;
      opacity: 0.9;
    }
  }

  &-shell {
    position: absolute;

    &-a {
      inset: 12%;

      .hero-ring {
        border-color: rgb(24 73 214 / 22%);
      }

      .hero-electron {
        animation-duration: 22s;
      }
    }

    &-b {
      inset: 22%;

      .hero-ring {
        border-style: dashed;
        border-color: rgb(24 73 214 / 18%);
      }

      .hero-electron {
        width: 0.48rem;
        height: 0.48rem;
        background: #1849d6;
        animation-duration: 15s;
        animation-direction: reverse;
        animation-delay: -4s;
      }
    }

    &-c {
      inset: 34%;

      .hero-ring {
        border-color: rgb(24 73 214 / 12%);
      }
    }
  }

  &-ring {
    position: absolute;
    inset: 0;
    border: 1.5px solid rgb(24 73 214 / 16%);
    border-radius: 50%;
  }

  &-core {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.85rem;
    height: 0.85rem;
    border-radius: 50%;
    background: $color-primary;
    box-shadow:
      0 0 0 6px rgb(24 73 214 / 12%),
      0 0 28px rgb(24 73 214 / 55%);
    transform: translate(-50%, -50%);
  }

  &-electron {
    position: absolute;
    top: 0;
    left: 0;
    width: 0.62rem;
    height: 0.62rem;
    border-radius: 50%;
    background: #4f7cff;
    box-shadow: 0 0 16px rgb(24 73 214 / 80%);
    offset-path: circle(50% at 50% 50%);
    offset-anchor: center;
    offset-rotate: 0deg;
    animation: hero-orbit-travel 22s linear infinite;
  }

  &-horizon {
    position: absolute;
    left: -18%;
    right: -18%;
    bottom: -42%;
    height: 78%;
    background-image:
      linear-gradient(rgb(24 73 214 / 13%) 1px, transparent 1px),
      linear-gradient(90deg, rgb(24 73 214 / 13%) 1px, transparent 1px);
    background-size: 3.4rem 3.4rem;
    transform: perspective(28rem) rotateX(58deg);
    transform-origin: center bottom;
    mask-image: linear-gradient(
      to top,
      rgb(0 0 0 / 55%) 0%,
      transparent 78%
    );
  }

  &-noise {
    position: absolute;
    inset: 0;
    opacity: 0.28;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
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
    border: 1px solid rgb(24 73 214 / 16%);
    border-radius: 999px;
    background: rgb(255 255 255 / 62%);
    color: $color-primary;
    font-size: 0.84rem;
    font-weight: 700;
    box-shadow: 0 8px 24px rgb(24 73 214 / 8%);
    backdrop-filter: blur(10px);
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
      background: linear-gradient(105deg, #1239b0 0%, #1849d6 42%, #5b86ff 100%);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 10px 18px rgb(24 73 214 / 22%));
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

  &-stage {
    position: relative;
    justify-self: stretch;

    &::before {
      content: '';
      position: absolute;
      inset: 8% -12% auto;
      z-index: -1;
      height: 70%;
      background: radial-gradient(
        circle,
        rgb(24 73 214 / 22%) 0%,
        transparent 72%
      );
      filter: blur(12px);
    }
  }
}

@keyframes hero-orbit-travel {
  from {
    offset-distance: 0%;
  }

  to {
    offset-distance: 100%;
  }
}

@keyframes hero-drift {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }

  to {
    transform: translate3d(4%, 5%, 0) scale(1.07);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-glow,
  .hero-electron {
    animation: none;
  }
}
</style>
