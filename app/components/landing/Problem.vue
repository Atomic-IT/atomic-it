<script setup lang="ts">
const bad = ['a', 'b', 'c', 'd'] as const
const good = ['a', 'b', 'c', 'd'] as const
const { root } = useAnimeReveal({ y: 26, staggerMs: 75 })
</script>

<template>
  <section ref="root" class="section problem" aria-labelledby="problem-title">
    <div class="container">
      <div class="problem-intro">
        <p class="section-eyebrow reveal">{{ $t('problem.eyebrow') }}</p>
        <h2 id="problem-title" class="section-title reveal">
          <span
            v-for="(line, index) in $t('problem.title').split('\n')"
            :key="index"
            class="problem-title-line"
          >
            {{ line }}
          </span>
        </h2>
        <p class="section-lead reveal">{{ $t('problem.lead') }}</p>
      </div>

      <div class="problem-story">
        <article class="problem-side reveal">
          <div class="problem-media">
            <img
              src="/images/problem/before.jpg"
              alt=""
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
            />
            <span class="problem-badge problem-badge-bad"
              >{{ $t('problem.beforeLabel') }}</span
            >
          </div>
          <h3>{{ $t('problem.badTitle') }}</h3>
          <p class="problem-caption">{{ $t('problem.beforeCaption') }}</p>
          <ul>
            <li v-for="item in bad" :key="item">
              {{ $t(`problem.bad.${item}`) }}
            </li>
          </ul>
        </article>

        <div class="problem-bridge reveal" aria-hidden="true">
          <span>{{ $t('problem.bridge') }}</span>
        </div>

        <article class="problem-side problem-side-good reveal">
          <div class="problem-media">
            <img
              src="/images/problem/after.jpg"
              alt=""
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
            />
            <span class="problem-badge problem-badge-good"
              >{{ $t('problem.afterLabel') }}</span
            >
          </div>
          <h3>{{ $t('problem.goodTitle') }}</h3>
          <p class="problem-caption">{{ $t('problem.afterCaption') }}</p>
          <ul>
            <li v-for="item in good" :key="item">
              {{ $t(`problem.good.${item}`) }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.problem {
  background:
    radial-gradient(circle at 100% 0%, rgb(24 73 214 / 8%), transparent 36%),
    #fff;

  &-title-line {
    display: block;
  }

  &-intro {
    max-width: 42rem;
    margin-bottom: $space-xl;
  }

  &-story {
    display: grid;
    gap: $space-lg;
    align-items: stretch;

    @include breakpoint(md) {
      grid-template-columns: 1fr auto 1fr;
      gap: $space-md;
      align-items: start;
    }
  }

  &-side {
    display: grid;
    gap: 0.85rem;
    align-content: start;

    &:hover .problem-media img {
      transform: scale(1.04);
    }

    &-good {
      .problem-media img {
        filter: none;
      }

      li::before {
        background: $color-success;
      }
    }

    h3 {
      margin: 0.2rem 0 0;
      font-size: 1.45rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: $color-secondary;
    }

    ul {
      display: grid;
      gap: 0.55rem;
      margin: 0.35rem 0 0;
      padding: 0;
      list-style: none;
    }

    li {
      position: relative;
      padding-left: 1.35rem;
      color: $color-fg;
      font-weight: 600;
      line-height: 1.4;

      &::before {
        content: '';
        position: absolute;
        top: 0.55rem;
        left: 0;
        width: 0.55rem;
        height: 0.55rem;
        border-radius: 50%;
        background: $color-error;
      }
    }
  }

  &-media {
    position: relative;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    border-radius: 1.2rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: saturate(0.92);
      transition: transform 0.6s ease;
    }
  }

  &-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding: 0.45rem 0.8rem;
    border-radius: 0.55rem;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    backdrop-filter: blur(8px);

    &-bad {
      background: rgb(255 241 242 / 92%);
      color: $color-error;
    }

    &-good {
      background: rgb(236 253 245 / 94%);
      color: $color-success;
    }
  }

  &-caption {
    margin: 0;
    color: $color-fg-muted;
    font-size: 1.02rem;
    line-height: 1.5;
  }

  &-bridge {
    display: none;
    align-items: center;
    justify-content: center;

    span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 3.4rem;
      height: 3.4rem;
      border-radius: 50%;
      background: $color-primary;
      color: #fff;
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      box-shadow: 0 14px 32px rgb(24 73 214 / 28%);
    }

    @include breakpoint(md) {
      display: flex;
      align-self: center;
      margin-top: 7rem;
    }
  }
}
</style>
