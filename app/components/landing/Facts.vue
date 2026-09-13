<script setup lang="ts">
const items = ['a', 'b', 'c', 'd'] as const
</script>

<template>
  <section class="facts" :aria-label="$t('facts.aria')">
    <div class="container facts-inner">
      <ul>
        <li v-for="item in items" :key="item">
          {{ $t(`facts.items.${item}`) }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.facts {
  border-block: 1px solid rgb(24 73 214 / 10%);
  background: #eef3fb;

  &-inner {
    padding-block: 0.85rem;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem 1.15rem;
    justify-content: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    position: relative;
    color: $color-secondary;
    font-size: 0.86rem;
    font-weight: 800;
    letter-spacing: -0.02em;

    &:not(:last-child)::after {
      content: '·';
      position: absolute;
      right: -0.75rem;
      color: $color-primary;
    }
  }
}
</style>
