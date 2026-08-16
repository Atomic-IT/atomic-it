<script setup lang="ts">
const items = ['a', 'b', 'c'] as const
const { root } = useAnimeReveal({ staggerMs: 90 })
</script>

<template>
  <section
    id="work"
    ref="root"
    class="section work"
    aria-labelledby="work-title"
  >
    <div class="container">
      <p class="section-eyebrow reveal">{{ $t('work.eyebrow') }}</p>
      <h2 id="work-title" class="section-title reveal">
        <span
          v-for="(line, index) in $t('work.title').split('\n')"
          :key="index"
          class="work-title-line"
        >
          {{ line }}
        </span>
      </h2>
      <p class="section-lead reveal">{{ $t('work.lead') }}</p>

      <div class="work-grid">
        <article
          v-for="(item, index) in items"
          :key="item"
          class="work-card reveal"
        >
          <div
            class="work-visual"
            :class="`work-visual-${index + 1}`"
            aria-hidden="true"
          >
            <div class="work-chrome">
              <span /><span /><span />
            </div>
            <div class="work-preview">
              <div class="work-line work-line-a" />
              <div class="work-line work-line-b" />
              <div class="work-btn" />
              <div class="work-blocks">
                <i /><i /><i />
              </div>
            </div>
          </div>
          <div class="work-body">
            <p class="work-tag">{{ $t(`work.items.${item}.tag`) }}</p>
            <h3>{{ $t(`work.items.${item}.title`) }}</h3>
            <p>{{ $t(`work.items.${item}.text`) }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.work {
  background: $color-bg;

  &-title-line {
    display: block;
  }

  &-grid {
    display: grid;
    gap: $space-md;
    margin-top: $space-xl;

    @include breakpoint(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &-card {
    overflow: hidden;
    border: 1px solid $color-border;
    border-radius: $radius-lg;
    background: #fff;
    box-shadow: 0 18px 40px rgb(7 11 20 / 5%);
  }

  &-visual {
    padding: 1rem;

    &-1 {
      background: linear-gradient(160deg, #dbe7ff, #f4f7fc);
    }

    &-2 {
      background: linear-gradient(160deg, #e4e0ff, #f7f5ff);
    }

    &-3 {
      background: linear-gradient(160deg, #d9f3ea, #f3fbf8);
    }
  }

  &-chrome {
    display: flex;
    gap: 0.35rem;
    margin-bottom: 0.7rem;

    span {
      width: 0.45rem;
      height: 0.45rem;
      border-radius: 50%;
      background: rgb(15 23 42 / 18%);
    }
  }

  &-preview {
    display: grid;
    gap: 0.55rem;
    min-height: 8.5rem;
    padding: 1rem;
    border-radius: 0.9rem;
    background: #fff;
    border: 1px solid rgb(15 23 42 / 8%);
  }

  &-line {
    height: 0.55rem;
    border-radius: 999px;
    background: #d7deea;

    &-a {
      width: 70%;
      height: 0.8rem;
      background: $color-secondary;
    }

    &-b {
      width: 52%;
    }
  }

  &-btn {
    width: 5.5rem;
    height: 1.5rem;
    border-radius: 999px;
    background: $color-primary;
  }

  &-blocks {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.4rem;
    margin-top: 0.2rem;

    i {
      display: block;
      height: 2.2rem;
      border-radius: 0.45rem;
      background: #eef2f7;
    }
  }

  &-body {
    padding: 0 1.25rem 1.35rem;

    h3 {
      margin: 0 0 0.4rem;
      font-size: 1.3rem;
      font-weight: 800;
      letter-spacing: -0.03em;
    }

    p {
      margin: 0;
      color: $color-fg-muted;
    }
  }

  &-tag {
    margin: 0 0 0.35rem;
    color: $color-primary;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
}
</style>
