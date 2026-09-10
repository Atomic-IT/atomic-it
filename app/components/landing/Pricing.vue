<script setup lang="ts">
const localePath = useLocalePath()
const { openContactDialog } = useContactDialog()
const { root } = useAnimeReveal({ y: 24, staggerMs: 70 })

const packages = ['landing', 'company'] as const
const faqs = ['a', 'b', 'c'] as const
const openFaq = ref<string | null>('a')

function toggleFaq(key: string) {
  openFaq.value = openFaq.value === key ? null : key
}
</script>

<template>
  <section
    id="pricing"
    ref="root"
    class="section pricing"
    aria-labelledby="pricing-title"
  >
    <div class="container">
      <div class="pricing-intro">
        <p class="section-eyebrow reveal">{{ $t('pricing.eyebrow') }}</p>
        <h2 id="pricing-title" class="section-title reveal">
          {{ $t('pricing.title') }}
        </h2>
        <p class="section-lead reveal">{{ $t('pricing.lead') }}</p>
      </div>

      <div class="pricing-grid">
        <article
          v-for="pack in packages"
          :key="pack"
          class="pricing-card reveal"
          :class="{ 'pricing-card-featured': pack === 'company' }"
        >
          <p class="pricing-card-label">
            {{ $t(`pricing.packages.${pack}.label`) }}
          </p>
          <h3>{{ $t(`pricing.packages.${pack}.name`) }}</h3>
          <p class="pricing-price">
            <span>{{ $t(`pricing.packages.${pack}.price`) }}</span>
            <small>{{ $t('pricing.net') }}</small>
          </p>
          <p class="pricing-for">{{ $t(`pricing.packages.${pack}.for`) }}</p>
          <ul>
            <li v-for="item in (['a', 'b', 'c', 'd'] as const)" :key="item">
              {{ $t(`pricing.packages.${pack}.items.${item}`) }}
            </li>
          </ul>
        </article>
      </div>

      <p class="pricing-note reveal">{{ $t('pricing.note') }}</p>

      <div class="pricing-cta reveal">
        <MagneticButton variant="primary" @click="openContactDialog">
          {{ $t('pricing.cta') }}
        </MagneticButton>
        <a class="pricing-link" :href="`${localePath('/')}#contact`">
          {{ $t('pricing.ctaAlt') }}
        </a>
      </div>

      <div class="pricing-faq">
        <h3 class="reveal">{{ $t('pricing.faqTitle') }}</h3>
        <div v-for="key in faqs" :key="key" class="pricing-faq-item reveal">
          <button
            type="button"
            class="pricing-faq-q"
            :aria-expanded="openFaq === key"
            @click="toggleFaq(key)"
          >
            {{ $t(`pricing.faq.${key}.q`) }}
            <span aria-hidden="true">{{ openFaq === key ? '−' : '+' }}</span>
          </button>
          <p v-show="openFaq === key" class="pricing-faq-a">
            {{ $t(`pricing.faq.${key}.a`) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.pricing {
  background:
    radial-gradient(circle at 100% 0%, rgb(24 73 214 / 10%), transparent 40%),
    #fff;

  &-intro {
    max-width: 40rem;
    margin-bottom: $space-xl;
  }

  &-grid {
    display: grid;
    gap: $space-md;

    @include breakpoint(md) {
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
    }
  }

  &-card {
    display: grid;
    gap: 0.65rem;
    align-content: start;
    padding: 1.4rem 1.45rem 1.5rem;
    border: 1px solid $color-border;
    border-radius: 1.35rem;
    background: #fbfcfe;
    box-shadow: 0 16px 40px rgb(7 11 20 / 5%);

    &-featured {
      border-color: rgb(24 73 214 / 30%);
      background: linear-gradient(180deg, #fff 40%, #eef4ff 100%);
      box-shadow: 0 22px 48px rgb(24 73 214 / 12%);
    }

    h3 {
      margin: 0;
      color: $color-secondary;
      font-size: 1.45rem;
      font-weight: 800;
      letter-spacing: -0.03em;
    }

    ul {
      display: grid;
      gap: 0.45rem;
      margin: 0.45rem 0 0;
      padding: 0;
      list-style: none;
    }

    li {
      position: relative;
      padding-left: 1.15rem;
      color: $color-fg;
      font-size: 0.95rem;
      font-weight: 600;
      line-height: 1.4;

      &::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: $color-primary;
        font-weight: 800;
      }
    }
  }

  &-card-label {
    margin: 0;
    color: $color-primary;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  &-price {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    align-items: baseline;
    margin: 0.15rem 0 0;

    span {
      color: $color-secondary;
      font-size: clamp(1.8rem, 4vw, 2.2rem);
      font-weight: 800;
      letter-spacing: -0.04em;
    }

    small {
      color: $color-fg-muted;
      font-size: 0.9rem;
      font-weight: 600;
    }
  }

  &-for {
    margin: 0;
    color: $color-fg-muted;
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.45;
  }

  &-note {
    margin: 1.15rem 0 0;
    color: $color-fg-muted;
    font-size: 0.92rem;
    font-weight: 600;
  }

  &-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    align-items: center;
    margin-top: 1.35rem;
  }

  &-link {
    color: $color-primary;
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 0.15em;
  }

  &-faq {
    margin-top: $space-xl;
    max-width: 40rem;

    h3 {
      margin: 0 0 0.85rem;
      color: $color-secondary;
      font-size: 1.15rem;
      font-weight: 800;
      letter-spacing: -0.03em;
    }
  }

  &-faq-item {
    border-top: 1px solid rgb(15 23 42 / 10%);

    &:last-child {
      border-bottom: 1px solid rgb(15 23 42 / 10%);
    }
  }

  &-faq-q {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 1rem 0;
    border: 0;
    background: transparent;
    color: $color-secondary;
    font: inherit;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
  }

  &-faq-a {
    margin: 0 0 1rem;
    color: $color-fg-muted;
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.5;
  }
}
</style>
