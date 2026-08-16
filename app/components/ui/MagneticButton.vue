<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    href?: string
    type?: 'button' | 'submit'
    variant?: 'primary' | 'ghost' | 'soft' | 'dark'
    external?: boolean
  }>(),
  {
    href: undefined,
    type: 'button',
    variant: 'primary',
    external: false,
  }
)

const { el, onMove, onEnter, onLeave } = useMagneticButton(14)
const classes = computed(() => ['m-btn', `m-btn-${props.variant}`])
</script>

<template>
  <a
    v-if="href"
    ref="el"
    :class="classes"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    @mousemove="onMove"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <span class="m-btn-shine" aria-hidden="true" />
    <span class="m-btn-label"><slot /></span>
  </a>
  <button
    v-else
    ref="el"
    :class="classes"
    :type="type"
    @mousemove="onMove"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <span class="m-btn-shine" aria-hidden="true" />
    <span class="m-btn-label"><slot /></span>
  </button>
</template>

<style lang="scss" scoped>
.m-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: 3.4rem;
  padding: 0.9rem 1.55rem;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: 999px;
  font-family: inherit;
  font-size: 1.02rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1;
  text-decoration: none !important;
  cursor: pointer;
  isolation: isolate;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &-label {
    position: relative;
    z-index: 1;
  }

  &-shine {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: linear-gradient(
      110deg,
      transparent 18%,
      rgb(255 255 255 / 35%) 48%,
      transparent 72%
    );
    transform: translateX(-130%);
    pointer-events: none;
  }

  &-primary {
    background: #1849d6;
    color: #fff !important;
    box-shadow: 0 16px 36px rgb(24 73 214 / 28%);

    &:hover {
      background: #1239b0;
    }
  }

  &-ghost {
    background: #fff;
    border-color: #94a3b8;
    color: #070b14 !important;
    box-shadow: 0 10px 24px rgb(10 15 26 / 8%);

    &:hover {
      border-color: #1849d6;
      color: #1849d6 !important;
    }
  }

  &-soft {
    background: #e8efff;
    color: #1849d6 !important;
  }

  &-dark {
    background: #070b14;
    color: #fff !important;

    &:hover {
      background: #151b2b;
    }
  }
}
</style>
