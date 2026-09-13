<script setup lang="ts">
const localePath = useLocalePath()
const { openContactDialog } = useContactDialog()
const { open: menuOpen, toggleMobileNav, closeMobileNav } = useMobileNav()
const compact = ref(false)

const links = computed(() => [
  { href: `${localePath('/')}#process`, label: 'nav.process' },
  { href: `${localePath('/')}#pricing`, label: 'nav.pricing' },
  { href: `${localePath('/')}#work`, label: 'nav.work' },
  { href: `${localePath('/')}#contact`, label: 'nav.contact' },
])

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMobileNav()
}

watch(menuOpen, (isOpen) => {
  if (!import.meta.client) return
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

onMounted(() => {
  const onScroll = () => {
    compact.value = window.scrollY > 10
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('keydown', onKeydown)
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
  })
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

        <button
          type="button"
          class="header-menu"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          :aria-label="menuOpen ? $t('nav.menuClose') : $t('nav.menu')"
          @click="toggleMobileNav"
        >
          <span :class="{ 'header-menu-open': menuOpen }" aria-hidden="true" />
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="menuOpen" class="header-drawer">
        <button
          type="button"
          class="header-drawer-backdrop"
          :aria-label="$t('nav.menuClose')"
          @click="closeMobileNav"
        />
        <nav
          id="mobile-nav"
          class="header-drawer-panel"
          :aria-label="$t('nav.menu')"
        >
          <a
            v-for="link in links"
            :key="link.label"
            class="header-drawer-link"
            :href="link.href"
            @click="closeMobileNav"
          >
            {{ $t(link.label) }}
          </a>
          <MagneticButton
            block
            variant="dark"
            @click="
              closeMobileNav()
              openContactDialog()
            "
          >
            {{ $t('nav.quote') }}
          </MagneticButton>
        </nav>
      </div>
    </Teleport>
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
    gap: 0.55rem;
    margin-left: auto;

    @include breakpoint(md) {
      gap: 0.8rem;
      margin-left: 0;
    }
  }

  &-cta {
    @media (width < 420px) {
      display: none;
    }
  }

  &-menu {
    display: grid;
    place-items: center;
    width: 2.6rem;
    height: 2.6rem;
    padding: 0;
    border: 1px solid rgb(15 23 42 / 12%);
    border-radius: 0.75rem;
    background: rgb(255 255 255 / 70%);
    cursor: pointer;

    @include breakpoint(md) {
      display: none;
    }

    span,
    span::before,
    span::after {
      display: block;
      width: 1.05rem;
      height: 2px;
      border-radius: 99px;
      background: $color-secondary;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }

    span {
      position: relative;

      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 0;
      }

      &::before {
        top: -5px;
      }

      &::after {
        top: 5px;
      }
    }

    &-open {
      background: transparent;

      &::before {
        top: 0;
        transform: rotate(45deg);
      }

      &::after {
        top: 0;
        transform: rotate(-45deg);
      }
    }
  }
}

.header-drawer {
  position: fixed;
  inset: 0;
  z-index: 90;

  @include breakpoint(md) {
    display: none;
  }

  &-backdrop {
    position: absolute;
    inset: 0;
    border: 0;
    background: rgb(7 11 20 / 42%);
    cursor: pointer;
  }

  &-panel {
    position: absolute;
    top: 4.6rem;
    right: 0.75rem;
    left: 0.75rem;
    display: grid;
    gap: 0.35rem;
    padding: 1rem 1.1rem 1.15rem;
    border: 1px solid $color-border;
    border-radius: 1.2rem;
    background: #fff;
    box-shadow: 0 24px 48px rgb(7 11 20 / 18%);
  }

  &-link {
    padding: 0.85rem 0.35rem;
    border-bottom: 1px solid rgb(15 23 42 / 6%);
    color: $color-secondary;
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: -0.03em;

    &:last-of-type {
      margin-bottom: 0.45rem;
      border-bottom: 0;
    }
  }
}
</style>
