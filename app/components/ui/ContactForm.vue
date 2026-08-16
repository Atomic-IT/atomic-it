<script setup lang="ts">
import { animate } from 'animejs'

const props = withDefaults(
  defineProps<{
    title: string
    titleId?: string
    rows?: number
  }>(),
  {
    titleId: 'contact-form-title',
    rows: 3,
  }
)

const { t } = useI18n()
const config = useRuntimeConfig()

const name = ref('')
const email = ref('')
const message = ref('')
const status = ref<'idle' | 'error' | 'success'>('idle')
const submitting = ref(false)
const formRef = ref<HTMLElement | null>(null)

const contactEmail = computed(() => config.public.contactEmail as string)

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function submitForm() {
  status.value = 'idle'
  if (
    !name.value.trim() ||
    !isValidEmail(email.value) ||
    !message.value.trim()
  ) {
    status.value = 'error'
    if (
      formRef.value &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      animate(formRef.value, {
        translateX: [0, -6, 6, -3, 3, 0],
        duration: 420,
        ease: 'outQuad',
      })
    }
    return
  }

  submitting.value = true
  const subject = encodeURIComponent(`Atomic IT — ${name.value.trim()}`)
  const body = encodeURIComponent(
    `${message.value.trim()}\n\n—\n${name.value.trim()}\n${email.value.trim()}`
  )
  window.location.href = `mailto:${contactEmail.value}?subject=${subject}&body=${body}`
  status.value = 'success'
  submitting.value = false
}
</script>

<template>
  <form
    ref="formRef"
    class="contact-form"
    :aria-labelledby="props.titleId"
    @submit.prevent="submitForm"
  >
    <p :id="props.titleId" class="contact-form-title">
      {{ props.title }}
    </p>

    <label class="contact-form-field">
      <span>{{ $t('cta.form.name') }}</span>
      <input
        v-model="name"
        type="text"
        name="name"
        autocomplete="name"
        required
      />
    </label>

    <label class="contact-form-field">
      <span>{{ $t('cta.form.email') }}</span>
      <input
        v-model="email"
        type="email"
        name="email"
        autocomplete="email"
        required
      />
    </label>

    <label class="contact-form-field">
      <span>{{ $t('cta.form.message') }}</span>
      <textarea v-model="message" name="message" :rows="props.rows" required />
    </label>

    <button class="contact-form-submit" type="submit">
      {{ submitting ? $t('cta.form.sending') : $t('cta.form.submit') }}
    </button>

    <p
      v-if="status === 'error'"
      class="contact-form-status contact-form-status-error"
      role="alert"
    >
      {{ t('cta.form.error') }}
    </p>
    <p
      v-if="status === 'success'"
      class="contact-form-status contact-form-status-success"
      role="status"
    >
      {{ t('cta.form.success') }}
    </p>
  </form>
</template>

<style lang="scss" scoped>
.contact-form {
  display: grid;
  gap: 0.95rem;
  padding: 1.35rem 1.4rem 1.5rem;
  border: 1px solid $color-border;
  border-radius: 1.4rem;
  background: #fff;
  box-shadow:
    0 40px 80px rgb(7 11 20 / 12%),
    0 1px 0 rgb(255 255 255 / 80%) inset;

  &-title {
    margin: 0 0 0.15rem;
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: $color-secondary;
  }

  &-field {
    display: grid;
    gap: 0.35rem;
    font-size: 0.9rem;
    font-weight: 700;
    color: $color-secondary;

    input,
    textarea {
      width: 100%;
      padding: 0.85rem 1rem;
      border: 1px solid $color-border;
      border-radius: $radius-sm;
      background: #f7f9fc;
      color: $color-secondary;
      font: inherit;
      font-weight: 500;

      &:focus {
        outline: 2px solid rgb(24 73 214 / 35%);
        outline-offset: 1px;
        border-color: $color-primary;
        background: #fff;
      }
    }

    textarea {
      resize: vertical;
      min-height: 5.5rem;
    }
  }

  &-submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 3.4rem;
    margin-top: 0.15rem;
    padding: 0.9rem 1.55rem;
    border: 0;
    border-radius: 999px;
    background: #1849d6;
    color: #fff;
    font-size: 1.05rem;
    font-weight: 700;
    line-height: 1;
    cursor: pointer;
    box-shadow: 0 16px 36px rgb(24 73 214 / 28%);
    transition:
      background-color 0.2s ease,
      transform 0.2s ease;

    &:hover {
      background: #1239b0;
      transform: translateY(-1px);
    }
  }

  &-status {
    margin: 0;
    font-size: $font-size-sm;
    font-weight: 600;

    &-error {
      color: $color-error;
    }

    &-success {
      color: $color-success;
    }
  }
}
</style>
