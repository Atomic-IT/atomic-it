<script setup lang="ts">
const { open, closeContactDialog } = useContactDialog()
const { t } = useI18n()
const panelRef = ref<HTMLElement | null>(null)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeContactDialog()
}

watch(open, (isOpen) => {
  if (!import.meta.client) return

  if (isOpen) {
    document.body.style.overflow = 'hidden'
    nextTick(() => {
      const focusable = panelRef.value?.querySelector<HTMLElement>(
        'input, button, [href], [tabindex]:not([tabindex="-1"])'
      )
      focusable?.focus()
    })
    return
  }

  document.body.style.overflow = ''
})

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="contact-dialog" @keydown="onKeydown">
      <button
        type="button"
        class="contact-dialog-backdrop"
        :aria-label="t('cta.dialogClose')"
        @click="closeContactDialog"
      />

      <div
        ref="panelRef"
        class="contact-dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-dialog-form-title"
      >
        <button
          type="button"
          class="contact-dialog-close"
          :aria-label="t('cta.dialogClose')"
          @click="closeContactDialog"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>

        <ContactForm
          embedded
          :title="t('hero.formTitle')"
          title-id="contact-dialog-form-title"
        />
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.contact-dialog {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: grid;
  place-items: center;
  padding: 1rem;

  &-backdrop {
    position: absolute;
    inset: 0;
    border: 0;
    background: rgb(7 11 20 / 52%);
    backdrop-filter: blur(6px);
    cursor: pointer;
  }

  &-panel {
    position: relative;
    z-index: 1;
    width: min(100%, 28rem);
    max-height: min(92vh, 44rem);
    overflow: auto;
    border: 1px solid $color-border;
    border-radius: 1.4rem;
    background: #fff;
    box-shadow: 0 40px 80px rgb(7 11 20 / 22%);
  }

  &-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 2;
    display: grid;
    place-items: center;
    width: 2.2rem;
    height: 2.2rem;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: #f1f5f9;
    color: $color-secondary;
    cursor: pointer;

    svg {
      width: 1rem;
      height: 1rem;
    }

    &:hover {
      background: #e2e8f0;
    }
  }
}
</style>
