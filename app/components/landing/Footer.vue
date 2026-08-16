<script setup lang="ts">
const year = new Date().getFullYear()
const config = useRuntimeConfig()
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div>
        <p class="footer-brand">Atomic IT</p>
        <p class="footer-tagline">{{ $t('footer.tagline') }}</p>
      </div>
      <div class="footer-meta">
        <a :href="`mailto:${config.public.contactEmail}`">
          {{ config.public.contactEmail }}
        </a>
        <p>© {{ year }} Atomic IT. {{ $t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  padding-block: $space-xl;
  background: $color-secondary;
  color: #e2e8f0;

  &-inner {
    display: grid;
    gap: $space-lg;

    @include breakpoint(md) {
      grid-template-columns: 1fr auto;
      align-items: end;
    }
  }

  &-brand {
    margin: 0 0 0.4rem;
    font-size: 1.4rem;
    font-weight: 800;
    color: #fff;
  }

  &-tagline {
    margin: 0;
    max-width: 28rem;
    color: rgb(226 232 240 / 72%);
  }

  &-meta {
    display: grid;
    gap: 0.5rem;

    a {
      font-weight: 800;
      color: #fff;
      text-decoration: none;
    }

    p {
      margin: 0;
      color: rgb(226 232 240 / 55%);
      font-size: $font-size-sm;
    }

    @include breakpoint(md) {
      text-align: right;
    }
  }
}
</style>
