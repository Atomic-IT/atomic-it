<script setup lang="ts">
const noItems = ['a', 'b', 'c'] as const
const yesItems = ['a', 'b', 'c'] as const
const { root } = useAnimeReveal({ y: 24, staggerMs: 80 })
</script>

<template>
  <section ref="root" class="section fit" aria-labelledby="fit-title">
    <div class="container">
      <div class="fit-intro">
        <p class="section-eyebrow reveal">{{ $t('fit.eyebrow') }}</p>
        <h2 id="fit-title" class="section-title reveal">
          <span
            v-for="(line, index) in $t('fit.title').split('\n')"
            :key="index"
            class="fit-title-line"
          >
            {{ line }}
          </span>
        </h2>
        <p class="section-lead reveal">{{ $t('fit.lead') }}</p>
      </div>

      <div class="fit-grid">
        <div class="fit-col fit-col-no reveal">
          <p class="fit-label">
            <span>{{ $t('fit.noBadge') }}</span>
          </p>
          <h3>{{ $t('fit.noTitle') }}</h3>
          <ul>
            <li v-for="item in noItems" :key="item">
              <span class="fit-mark" aria-hidden="true">✕</span>
              <span>{{ $t(`fit.no.${item}`) }}</span>
            </li>
          </ul>
        </div>

        <div class="fit-col fit-col-yes reveal">
          <p class="fit-label">
            <span>{{ $t('fit.yesBadge') }}</span>
          </p>
          <h3>{{ $t('fit.yesTitle') }}</h3>
          <ul>
            <li v-for="item in yesItems" :key="item">
              <span class="fit-mark" aria-hidden="true">✓</span>
              <span>{{ $t(`fit.yes.${item}`) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.fit {
  background:
    radial-gradient(circle at 100% 0%, rgb(24 73 214 / 10%), transparent 38%),
    #f3f5f8;

  &-title-line {
    display: block;
  }

  &-intro {
    max-width: 40rem;
  }

  &-grid {
    display: grid;
    gap: $space-md;
    margin-top: $space-xl;

    @include breakpoint(md) {
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
    }
  }

  &-col {
    display: grid;
    gap: 1rem;
    padding: 1.6rem 1.5rem 1.7rem;
    border-radius: 1.25rem;
    color: #fff;
    box-shadow: 0 24px 48px rgb(7 11 20 / 14%);

    @include breakpoint(md) {
      padding: 1.9rem 1.75rem 2rem;
      min-height: 100%;
    }

    h3 {
      margin: 0;
      font-size: clamp(1.45rem, 2.4vw, 1.85rem);
      font-weight: 800;
      letter-spacing: -0.035em;
      line-height: 1.15;
      color: #fff;
    }

    ul {
      display: grid;
      gap: 0;
      margin: 0.25rem 0 0;
      padding: 0;
      list-style: none;
    }

    li {
      display: grid;
      grid-template-columns: 1.4rem 1fr;
      gap: 0.75rem;
      align-items: start;
      padding-block: 0.95rem;
      border-top: 1px solid rgb(255 255 255 / 18%);
      color: rgb(255 255 255 / 92%);
      font-size: 1.05rem;
      font-weight: 600;
      line-height: 1.4;

      &:last-child {
        padding-bottom: 0;
      }
    }

    &-no {
      background:
        radial-gradient(circle at 12% 0%, rgb(225 29 72 / 35%), transparent 42%),
        #1a0b10;
      border: 1px solid rgb(255 255 255 / 10%);

      .fit-label span {
        background: #e11d48;
        color: #fff;
      }

      .fit-mark {
        color: #fb7185;
      }
    }

    &-yes {
      background:
        radial-gradient(circle at 88% 0%, rgb(255 255 255 / 18%), transparent 40%),
        #1239b0;
      border: 1px solid rgb(255 255 255 / 14%);

      .fit-label span {
        background: #fff;
        color: #1239b0;
      }

      .fit-mark {
        color: #bfdbfe;
      }
    }
  }

  &-label {
    margin: 0;

    span {
      display: inline-flex;
      align-items: center;
      min-height: 2rem;
      padding: 0.35rem 0.75rem;
      border-radius: 0.45rem;
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
  }

  &-mark {
    margin-top: 0.1rem;
    font-size: 0.95rem;
    font-weight: 800;
    line-height: 1.2;
  }
}
</style>
