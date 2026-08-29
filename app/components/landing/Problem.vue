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
          {{ $t('problem.title') }}
        </h2>
        <p class="section-lead reveal">{{ $t('problem.lead') }}</p>
      </div>

      <div class="problem-story">
        <article class="problem-side problem-side-bad reveal">
          <div class="problem-media">
            <img
              src="/images/problem/before.jpg"
              alt=""
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
            />
            <span class="problem-badge">{{ $t('problem.beforeLabel') }}</span>
          </div>
          <div class="problem-body">
            <h3>{{ $t('problem.badTitle') }}</h3>
            <p class="problem-caption">{{ $t('problem.beforeCaption') }}</p>
            <ul>
              <li v-for="item in bad" :key="item">
                <span class="problem-mark" aria-hidden="true">✕</span>
                <span>{{ $t(`problem.bad.${item}`) }}</span>
              </li>
            </ul>
          </div>
        </article>

        <div class="problem-bridge" aria-hidden="true">
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
            <span class="problem-badge">{{ $t('problem.afterLabel') }}</span>
          </div>
          <div class="problem-body">
            <h3>{{ $t('problem.goodTitle') }}</h3>
            <p class="problem-caption">{{ $t('problem.afterCaption') }}</p>
            <ul>
              <li v-for="item in good" :key="item">
                <span class="problem-mark" aria-hidden="true">✓</span>
                <span>{{ $t(`problem.good.${item}`) }}</span>
              </li>
            </ul>
          </div>
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

  &-intro {
    margin-bottom: $space-xl;
  }

  &-story {
    position: relative;
    display: grid;
    gap: $space-md;

    @include breakpoint(md) {
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      align-items: stretch;
    }
  }

  &-side {
    display: grid;
    grid-template-rows: auto 1fr;
    overflow: hidden;
    border-radius: 1.4rem;
    border: 1px solid $color-border;
    background: #fff;
    box-shadow: 0 18px 40px rgb(7 11 20 / 6%);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 28px 56px rgb(7 11 20 / 10%);
    }

    &:hover .problem-media img {
      transform: scale(1.05);
    }

    &-bad {
      background: linear-gradient(180deg, #fff 68%, #fff5f6 100%);
      border-color: rgb(225 29 72 / 22%);

      .problem-badge {
        background: #fff1f2;
        color: $color-error;
      }

      .problem-mark {
        color: $color-error;
        background: rgb(225 29 72 / 12%);
      }

      .problem-media img {
        filter: grayscale(0.35) saturate(0.7);
      }
    }

    &-good {
      background: linear-gradient(180deg, #fff 62%, #eef6ff 100%);
      border-color: rgb(24 73 214 / 28%);
      box-shadow:
        0 22px 48px rgb(24 73 214 / 12%),
        0 0 0 1px rgb(24 73 214 / 8%);

      .problem-badge {
        background: $color-primary;
        color: #fff;
      }

      .problem-mark {
        color: $color-primary;
        background: $color-primary-muted;
      }
    }
  }

  &-media {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 10;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease, filter 0.4s ease;
    }
  }

  &-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &-body {
    display: grid;
    gap: 0.7rem;
    align-content: start;
    padding: 1.25rem 1.3rem 1.4rem;
  }

  &-side h3 {
    margin: 0;
    font-size: 1.45rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: $color-secondary;
  }

  &-caption {
    margin: 0;
    color: $color-fg-muted;
    font-size: 1.02rem;
    line-height: 1.5;
  }

  &-side ul {
    display: grid;
    gap: 0.45rem;
    margin: 0.35rem 0 0;
    padding: 0;
    list-style: none;
  }

  &-side li {
    display: grid;
    grid-template-columns: 1.55rem 1fr;
    gap: 0.7rem;
    align-items: start;
    color: $color-fg;
    font-weight: 600;
    line-height: 1.4;
  }

  &-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.45rem;
    height: 1.45rem;
    margin-top: 0.05rem;
    border-radius: 50%;
    font-size: 0.72rem;
    font-weight: 800;
    line-height: 1;
  }

  &-bridge {
    display: none;
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 3.2rem;
      height: 3.2rem;
      border: 4px solid #fff;
      border-radius: 50%;
      background: $color-primary;
      color: #fff;
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      box-shadow: 0 14px 32px rgb(24 73 214 / 32%);
      transform: translate(-50%, -50%);
    }

    @include breakpoint(md) {
      display: block;
    }
  }
}
</style>
