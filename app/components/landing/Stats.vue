<script setup lang="ts">
const items = ['a', 'b', 'c', 'd'] as const
const { root } = useAnimeReveal({ staggerMs: 70 })
</script>

<template>
  <section ref="root" class="stats">
    <div class="container stats-grid">
      <article v-for="item in items" :key="item" class="stats-item reveal">
        <p class="stats-value">{{ $t(`stats.items.${item}.value`) }}</p>
        <p class="stats-label">{{ $t(`stats.items.${item}.label`) }}</p>
      </article>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.stats {
  padding-block: $space-xl;
  background: #fff;
  border-bottom: 1px solid $color-border;

  &-grid {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: repeat(2, 1fr);

    @include breakpoint(md) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &-item {
    padding: 1.25rem;
    border-radius: $radius-md;
    background: $color-bg;
    border: 1px solid $color-border;
  }

  &-value {
    margin: 0 0 0.35rem;
    font-size: clamp(2.6rem, 5vw, 3.6rem);
    font-weight: 800;
    letter-spacing: -0.06em;
    line-height: 1;
    color: $color-primary;
  }

  &-label {
    margin: 0;
    color: $color-fg-muted;
    font-weight: 600;
  }
}
</style>
