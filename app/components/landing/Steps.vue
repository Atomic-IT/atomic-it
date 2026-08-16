<script setup lang="ts">
const localePath = useLocalePath()

const items = [
  { key: 'talk', image: '/images/steps/talk.jpg' },
  { key: 'build', image: '/images/steps/build.jpg' },
  { key: 'live', image: '/images/steps/launch.jpg' },
] as const

const { root } = useAnimeReveal({ y: 28, staggerMs: 90 })
</script>

<template>
  <section
    id="process"
    ref="root"
    class="section steps"
    aria-labelledby="steps-title"
  >
    <div class="container">
      <div class="steps-intro">
        <p class="section-eyebrow reveal">{{ $t('steps.eyebrow') }}</p>
        <h2 id="steps-title" class="section-title reveal">
          <span
            v-for="(line, index) in $t('steps.title').split('\n')"
            :key="index"
            class="steps-title-line"
          >
            {{ line }}
          </span>
        </h2>
        <p class="section-lead reveal">{{ $t('steps.lead') }}</p>
      </div>

      <ol class="steps-track">
        <li
          v-for="(item, index) in items"
          :key="item.key"
          class="steps-step reveal"
        >
          <div class="steps-index" aria-hidden="true">
            <span>{{ $t(`steps.items.${item.key}.step`) }}</span>
            <i v-if="index < items.length - 1" class="steps-line" />
          </div>

          <div class="steps-body">
            <div class="steps-media">
              <img
                :src="item.image"
                alt=""
                width="1000"
                height="800"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p class="steps-time">{{ $t(`steps.items.${item.key}.time`) }}</p>
            <h3>{{ $t(`steps.items.${item.key}.title`) }}</h3>
            <p class="steps-text">{{ $t(`steps.items.${item.key}.text`) }}</p>
          </div>
        </li>
      </ol>

      <div class="steps-cta reveal">
        <a class="steps-btn" :href="`${localePath('/')}#contact`">
          {{ $t('nav.quote') }}
        </a>
        <p>{{ $t('steps.ctaHint') }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.steps {
  background:
    radial-gradient(circle at 0% 10%, rgb(24 73 214 / 10%), transparent 34%),
    linear-gradient(180deg, #eef3fb 0%, #f7f9fc 100%);

  &-title-line {
    display: block;
  }

  &-intro {
    max-width: 40rem;
    margin-bottom: $space-xl;
  }

  &-track {
    display: grid;
    gap: $space-xl;
    margin: 0;
    padding: 0;
    list-style: none;

    @include breakpoint(md) {
      grid-template-columns: repeat(3, 1fr);
      gap: $space-md;
    }
  }

  &-step {
    display: grid;
    gap: 1rem;

    &:hover .steps-media img {
      transform: scale(1.05);
    }
  }

  &-index {
    display: flex;
    align-items: center;
    gap: 0.85rem;

    span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 2.7rem;
      height: 2.7rem;
      padding-inline: 0.55rem;
      border-radius: 999px;
      background: $color-primary;
      color: #fff;
      font-size: 0.85rem;
      font-weight: 800;
      letter-spacing: 0.06em;
    }
  }

  &-line {
    display: none;
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, $color-primary, rgb(24 73 214 / 15%));

    @include breakpoint(md) {
      display: block;
    }
  }

  &-body {
    display: grid;
    gap: 0.55rem;

    h3 {
      margin: 0;
      font-size: clamp(1.45rem, 2.4vw, 1.8rem);
      font-weight: 800;
      letter-spacing: -0.035em;
      color: $color-secondary;
    }
  }

  &-media {
    overflow: hidden;
    aspect-ratio: 5 / 3.4;
    border-radius: 1.15rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.65s ease;
    }

    @include breakpoint(md) {
      aspect-ratio: 4 / 3.2;
    }
  }

  &-time {
    margin: 0.35rem 0 0;
    color: $color-primary;
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &-text {
    margin: 0;
    max-width: 28rem;
    color: $color-fg-muted;
    font-size: 1.05rem;
    line-height: 1.55;
  }

  &-cta {
    display: grid;
    gap: 0.7rem;
    justify-items: start;
    margin-top: $space-xl;

    p {
      margin: 0;
      color: $color-fg-muted;
      font-weight: 600;
    }
  }

  &-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3.4rem;
    padding: 0.9rem 1.55rem;
    border-radius: 999px;
    background: #1849d6;
    color: #fff;
    font-size: 1.05rem;
    font-weight: 700;
    box-shadow: 0 16px 36px rgb(24 73 214 / 28%);
    transition:
      background-color 0.2s ease,
      transform 0.2s ease;

    &:hover {
      background: #1239b0;
      transform: translateY(-1px);
    }
  }
}
</style>
