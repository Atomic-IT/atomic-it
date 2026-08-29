<script setup lang="ts">
import { animate } from 'animejs'

const props = withDefaults(
  defineProps<{
    title: string
    titleId?: string
    embedded?: boolean
  }>(),
  {
    titleId: 'contact-form-title',
    embedded: false,
  }
)

const { t } = useI18n()

const email = ref('')
const siteType = ref('')
const status = ref<'idle' | 'error' | 'failed' | 'success'>('idle')
const submitting = ref(false)
const formRef = ref<HTMLElement | null>(null)
const selectOpen = ref(false)
const highlighted = ref(-1)
const selectRoot = ref<HTMLElement | null>(null)

const siteTypes = ['company', 'landing', 'refresh', 'help'] as const
const selectId = computed(() => `${props.titleId}-type`)
const listId = computed(() => `${props.titleId}-type-list`)
const { closeContactDialog } = useContactDialog()

const selectedLabel = computed(() =>
  siteType.value
    ? t(`cta.form.types.${siteType.value}`)
    : t('cta.form.siteTypePlaceholder')
)

const statusMessage = computed(() => {
  if (status.value === 'error') return t('cta.form.error')
  if (status.value === 'failed') return t('cta.form.failed')
  if (status.value === 'success') return t('cta.form.success')
  return ''
})

function shakeForm() {
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
}

function toggleSelect() {
  selectOpen.value = !selectOpen.value
  if (selectOpen.value) {
    highlighted.value = siteTypes.findIndex((type) => type === siteType.value)
  }
}

function chooseType(type: (typeof siteTypes)[number]) {
  siteType.value = type
  selectOpen.value = false
}

function onSelectKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    selectOpen.value = false
    return
  }

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    if (!selectOpen.value) {
      selectOpen.value = true
      highlighted.value = 0
      return
    }

    const delta = event.key === 'ArrowDown' ? 1 : -1
    const next = highlighted.value + delta
    highlighted.value = Math.min(siteTypes.length - 1, Math.max(0, next))
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (!selectOpen.value) {
      selectOpen.value = true
      return
    }

    const type = siteTypes[highlighted.value]
    if (type) chooseType(type)
  }
}

function onDocumentPointer(event: PointerEvent) {
  if (!selectRoot.value?.contains(event.target as Node)) {
    selectOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointer)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointer)
})

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

async function submitForm() {
  status.value = 'idle'
  if (!isValidEmail(email.value) || !siteType.value) {
    status.value = 'error'
    shakeForm()
    return
  }

  submitting.value = true

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        email: email.value.trim(),
        siteType: siteType.value,
      },
    })
    status.value = 'success'
    email.value = ''
    siteType.value = ''
    if (props.embedded) {
      window.setTimeout(() => closeContactDialog(), 1600)
    }
  } catch {
    status.value = 'failed'
    shakeForm()
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <form
    ref="formRef"
    class="contact-form"
    :class="{ 'contact-form-embedded': props.embedded }"
    :aria-labelledby="props.titleId"
    @submit.prevent="submitForm"
  >
    <p :id="props.titleId" class="contact-form-title">
      {{ props.title }}
    </p>

    <label class="contact-form-field">
      <span class="contact-form-label">
        <svg
          class="contact-form-icon"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-11Z"
            stroke="currentColor"
            stroke-width="1.8"
          />
          <path
            d="m5 7 7 6 7-6"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {{ $t('cta.form.email') }}
      </span>
      <input
        v-model="email"
        type="email"
        name="email"
        autocomplete="email"
        required
      />
    </label>

    <div class="contact-form-field">
      <span class="contact-form-label" :id="`${selectId}-label`">
        <svg
          class="contact-form-icon"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="3.5"
            y="4.5"
            width="17"
            height="15"
            rx="2"
            stroke="currentColor"
            stroke-width="1.8"
          />
          <path
            d="M3.5 9.5h17M8 4.5v15"
            stroke="currentColor"
            stroke-width="1.8"
          />
        </svg>
        {{ $t('cta.form.siteType') }}
      </span>
      <div ref="selectRoot" class="contact-form-select">
        <input type="hidden" name="siteType" :value="siteType" />
        <button
          :id="selectId"
          type="button"
          class="contact-form-trigger"
          :class="{
            'contact-form-trigger-open': selectOpen,
            'contact-form-trigger-empty': !siteType,
          }"
          :aria-expanded="selectOpen"
          aria-haspopup="listbox"
          :aria-controls="listId"
          :aria-labelledby="`${selectId}-label ${selectId}`"
          @click="toggleSelect"
          @keydown="onSelectKeydown"
        >
          <span>{{ selectedLabel }}</span>
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4 6.2 8 10l4-3.8"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <ul
          v-show="selectOpen"
          :id="listId"
          class="contact-form-menu"
          role="listbox"
          :aria-labelledby="`${selectId}-label`"
        >
          <li
            v-for="(type, index) in siteTypes"
            :key="type"
            role="option"
            :aria-selected="siteType === type"
            class="contact-form-option"
            :class="{
              'contact-form-option-active': highlighted === index,
              'contact-form-option-picked': siteType === type,
            }"
            @pointerenter="highlighted = index"
            @click="chooseType(type)"
          >
            {{ $t(`cta.form.types.${type}`) }}
          </li>
        </ul>
      </div>
    </div>

    <MagneticButton
      block
      type="submit"
      variant="primary"
      :disabled="submitting"
    >
      {{ submitting ? $t('cta.form.sending') : $t('cta.form.submit') }}
    </MagneticButton>

    <p
      v-if="status === 'error' || status === 'failed'"
      class="contact-form-status contact-form-status-error"
      role="alert"
    >
      {{ statusMessage }}
    </p>
    <p
      v-if="status === 'success'"
      class="contact-form-status contact-form-status-success"
      role="status"
    >
      {{ statusMessage }}
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

  &-embedded {
    padding: 1.35rem 1.4rem 1.5rem;
    border: 0;
    box-shadow: none;
    background: transparent;

    .contact-form-title {
      padding-right: 2.6rem;
    }

    .contact-form-field,
    .contact-form-select,
    .contact-form-trigger {
      width: 100%;
      min-width: 0;
    }
  }

  &-title {
    margin: 0 0 0.15rem;
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: $color-secondary;
  }

  &-label {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
  }

  &-icon {
    width: 1.05rem;
    height: 1.05rem;
    color: $color-primary;
    flex-shrink: 0;
  }

  &-field {
    display: grid;
    gap: 0.35rem;
    font-size: 0.9rem;
    font-weight: 700;
    color: $color-secondary;

    input {
      width: 100%;
      min-height: 3.05rem;
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
  }

  &-select {
    position: relative;
  }

  &-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
    width: 100%;
    min-height: 3.05rem;
    padding: 0.85rem 1rem;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    background: #f7f9fc;
    color: $color-secondary;
    font: inherit;
    font-weight: 500;
    text-align: left;
    cursor: pointer;

    svg {
      width: 1rem;
      height: 1rem;
      color: $color-primary;
      transition: transform 0.2s ease;
      flex-shrink: 0;
    }

    &-empty {
      color: $color-fg-muted;
    }

    &-open,
    &:focus-visible {
      outline: 2px solid rgb(24 73 214 / 35%);
      outline-offset: 1px;
      border-color: $color-primary;
      background: #fff;
    }

    &-open svg {
      transform: rotate(180deg);
    }
  }

  &-menu {
    position: absolute;
    top: calc(100% + 0.4rem);
    right: 0;
    left: 0;
    z-index: 8;
    display: grid;
    gap: 0.2rem;
    margin: 0;
    padding: 0.4rem;
    list-style: none;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    background: #fff;
    box-shadow: 0 18px 40px rgb(7 11 20 / 12%);
  }

  &-option {
    padding: 0.7rem 0.85rem;
    border-radius: 0.65rem;
    color: $color-secondary;
    font-weight: 600;
    line-height: 1.3;
    cursor: pointer;

    &-active {
      background: $color-primary-muted;
      color: $color-primary;
    }

    &-picked {
      color: $color-primary;
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
