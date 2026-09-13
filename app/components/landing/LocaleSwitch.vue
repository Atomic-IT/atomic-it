<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const options = computed(() =>
  (locales.value as Array<{ code: 'pl' | 'en'; name: string }>).map((item) => ({
    code: item.code,
    name: item.name,
    to: switchLocalePath(item.code),
  }))
)
</script>

<template>
  <nav class="locale-switch" :aria-label="$t('nav.language')">
    <NuxtLink
      v-for="item in options"
      :key="item.code"
      :to="item.to"
      class="locale-switch-link"
      :class="{ 'locale-switch-active': locale === item.code }"
      :aria-current="locale === item.code ? 'page' : undefined"
    >
      {{ item.code.toUpperCase() }}
    </NuxtLink>
  </nav>
</template>

<style lang="scss" scoped>
.locale-switch {
  display: inline-flex;
  align-items: center;
  gap: 0.15rem;
  padding: 0.15rem;
  border: 1px solid rgb(15 23 42 / 10%);
  border-radius: 999px;
  background: rgb(255 255 255 / 62%);

  &-link {
    min-width: 2.05rem;
    padding: 0.32rem 0.45rem;
    border-radius: 999px;
    color: $color-fg-muted;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-align: center;
  }

  &-active {
    background: $color-secondary;
    color: #fff;
  }
}
</style>
