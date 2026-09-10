<script setup lang="ts">
const config = useRuntimeConfig()
const { root } = useAnimeReveal()

const whatsappUrl = computed(() => config.public.whatsappUrl as string)
const points = ['a', 'b', 'c'] as const
</script>

<template>
  <section
    id="contact"
    ref="root"
    class="section cta"
    aria-labelledby="cta-title"
  >
    <div class="container cta-layout">
      <div class="cta-copy">
        <p class="section-eyebrow reveal">{{ $t('cta.eyebrow') }}</p>
        <h2 id="cta-title" class="section-title reveal">
          {{ $t('cta.title') }}
        </h2>
        <p class="section-lead reveal">{{ $t('cta.lead') }}</p>

        <ul class="cta-points">
          <li v-for="point in points" :key="point" class="reveal">
            <strong>{{ $t(`cta.points.${point}.title`) }}</strong>
            <span>{{ $t(`cta.points.${point}.text`) }}</span>
          </li>
        </ul>

        <div class="cta-actions reveal">
          <MagneticButton :href="whatsappUrl" variant="primary" external>
            <WhatsAppIcon />
            {{ $t('cta.whatsapp') }}
          </MagneticButton>
          <p class="cta-whatsapp-hint">{{ $t('cta.whatsappHint') }}</p>
          <a class="cta-pricing-link" href="#pricing">
            {{ $t('cta.pricingLink') }}
          </a>
        </div>
      </div>

      <ContactForm
        class="reveal"
        :title="$t('cta.or')"
        title-id="cta-form-title"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.cta {
  background:
    radial-gradient(circle at 0% 0%, rgb(24 73 214 / 10%), transparent 40%),
    #fff;

  &-layout {
    display: grid;
    gap: $space-xl;
    align-items: center;

    @include breakpoint(md) {
      grid-template-columns: 1fr 1fr;
      gap: $space-2xl;
    }
  }

  &-copy {
    display: grid;
    align-content: center;
    gap: $space-md;

    .section-eyebrow,
    .section-title,
    .section-lead {
      margin: 0;
    }
  }

  &-points {
    display: grid;
    gap: 0.85rem;
    margin: 0.25rem 0;
    padding: 0;
    list-style: none;

    li {
      display: grid;
      gap: 0.15rem;
      padding-left: 1rem;
      border-left: 3px solid $color-primary;
    }

    strong {
      font-weight: 800;
    }

    span {
      color: $color-fg-muted;
    }
  }

  &-actions {
    display: grid;
    justify-items: start;
    gap: 0.55rem;
    margin-top: 0.35rem;
  }

  &-whatsapp-hint {
    margin: 0;
    color: $color-fg-muted;
    font-size: 0.9rem;
    font-weight: 600;
  }

  &-pricing-link {
    color: $color-primary;
    font-size: 0.95rem;
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 0.18em;

    &:hover {
      color: $color-primary-hover;
    }
  }
}
</style>
