<script setup lang="ts">
const year = new Date().getFullYear()
const config = useRuntimeConfig()
const localePath = useLocalePath()

const company = {
  legalName: 'Atomic IT Sp. z o.o.',
  street: 'ul. Gospodarcza 24 lok. 25',
  city: '20-213 Lublin',
  nip: '9462749033',
  regon: '540612452',
  krs: '0001147827',
} as const

const links = computed(() => [
  { href: `${localePath('/')}#process`, label: 'nav.process' },
  { href: `${localePath('/')}#work`, label: 'nav.work' },
  { href: `${localePath('/')}#contact`, label: 'nav.contact' },
])

const identifiers = computed(() => [
  { label: 'footer.nip', value: company.nip },
  { label: 'footer.regon', value: company.regon },
  { label: 'footer.krs', value: company.krs },
])
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand-block">
        <p class="footer-brand">Atomic IT</p>
        <p class="footer-legal-name">{{ company.legalName }}</p>
        <p class="footer-tagline">{{ $t('footer.tagline') }}</p>
      </div>

      <nav class="footer-nav" :aria-label="$t('footer.navLabel')">
        <p class="footer-heading">{{ $t('footer.navHeading') }}</p>
        <ul>
          <li v-for="link in links" :key="link.label">
            <a :href="link.href">{{ $t(link.label) }}</a>
          </li>
        </ul>
      </nav>

      <div class="footer-contact">
        <p class="footer-heading">{{ $t('footer.contactHeading') }}</p>
        <ul>
          <li>
            <a :href="`mailto:${config.public.contactEmail}`">
              {{ config.public.contactEmail }}
            </a>
          </li>
          <li>
            <a
              :href="config.public.whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </li>
        </ul>
      </div>

      <div class="footer-company">
        <p class="footer-heading">{{ $t('footer.companyHeading') }}</p>
        <address>
          <span>{{ company.street }}</span>
          <span>{{ company.city }}</span>
        </address>
        <dl class="footer-ids">
          <div v-for="item in identifiers" :key="item.label">
            <dt>{{ $t(item.label) }}</dt>
            <dd>{{ item.value }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="footer-bar">
      <div class="container footer-bar-inner">
        <p>© {{ year }} {{ company.legalName }}</p>
        <p>{{ $t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background:
    linear-gradient(180deg, rgb(24 73 214 / 12%) 0%, transparent 28%),
    $color-secondary;
  color: #e2e8f0;

  &-inner {
    display: grid;
    gap: $space-xl;
    padding-block: $space-2xl $space-xl;

    @include breakpoint(sm) {
      grid-template-columns: 1fr 1fr;
    }

    @include breakpoint(lg) {
      grid-template-columns: 1.4fr 0.7fr 0.9fr 1.2fr;
      gap: $space-2xl;
      align-items: start;
    }
  }

  &-brand {
    margin: 0 0 0.35rem;
    font-size: 1.45rem;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: #fff;
  }

  &-legal-name {
    margin: 0 0 0.85rem;
    color: rgb(226 232 240 / 55%);
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  &-tagline {
    margin: 0;
    max-width: 22rem;
    color: rgb(226 232 240 / 72%);
    font-size: 0.98rem;
    line-height: 1.55;
  }

  &-heading {
    margin: 0 0 0.85rem;
    color: #9db6ff;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  &-nav,
  &-contact {
    ul {
      display: grid;
      gap: 0.55rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    a {
      color: rgb(226 232 240 / 88%);
      font-weight: 600;
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: #fff;
      }
    }
  }

  &-company {
    address {
      display: grid;
      gap: 0.15rem;
      margin: 0 0 1rem;
      color: rgb(226 232 240 / 82%);
      font-style: normal;
      font-weight: 600;
      line-height: 1.45;
    }
  }

  &-ids {
    display: grid;
    gap: 0.45rem;
    margin: 0;

    div {
      display: grid;
      grid-template-columns: 3.6rem 1fr;
      gap: 0.55rem;
      align-items: baseline;
    }

    dt {
      color: rgb(226 232 240 / 48%);
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    dd {
      margin: 0;
      color: rgb(226 232 240 / 88%);
      font-size: 0.92rem;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.02em;
    }
  }

  &-bar {
    border-top: 1px solid rgb(255 255 255 / 8%);
  }

  &-bar-inner {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.25rem;
    justify-content: space-between;
    padding-block: 1.1rem;
    color: rgb(226 232 240 / 42%);
    font-size: 0.82rem;

    p {
      margin: 0;
    }
  }
}
</style>
