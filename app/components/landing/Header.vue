<script setup lang="ts">
const localePath = useLocalePath()
const { openContactDialog } = useContactDialog()
const compact = ref(false)

const links = computed(() => [
  { href: `${localePath('/')}#process`, label: 'nav.process' },
  { href: `${localePath('/')}#work`, label: 'nav.work' },
  { href: `${localePath('/')}#contact`, label: 'nav.contact' },
])

onMounted(() => {
  const onScroll = () => {
    compact.value = window.scrollY > 10
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
})
</script>

<template>
  <header class="header" :class="{ 'header-compact': compact }">
    <div class="container header-inner">
      <a class="header-brand" :href="localePath('/')">Atomic IT</a>

      <nav class="header-nav" aria-label="Main">
        <a
          v-for="link in links"
          :key="link.label"
          class="header-link"
          :href="link.href"
        >
          {{ $t(link.label) }}
        </a>
      </nav>

      <div class="header-actions">
        <MagneticButton
          compact
          class="header-cta"
          variant="dark"
          @click="openContactDialog"
        >
          {{ $t('nav.quote') }}
        </MagneticButton>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgb(219 230 255 / 72%);
  backdrop-filter: blur(16px);

  &-compact {
    box-shadow: 0 1px 0 $color-border;
  }

  &-inner {
    display: flex;
    align-items: center;
    gap: $space-md;
    min-height: 4.4rem;
  }

  &-brand {
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: $color-secondary;
  }

  &-nav {
    display: none;
    gap: 1.35rem;
    margin-left: auto;

    @include breakpoint(md) {
      display: flex;
    }
  }

  &-link {
    color: #1e293b;
    font-weight: 700;

    &:hover {
      color: #1849d6;
    }
  }

  &-actions {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-left: auto;

    @include breakpoint(md) {
      margin-left: 0;
    }
  }
}
</style>
