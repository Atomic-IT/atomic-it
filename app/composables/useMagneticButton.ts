import { animate } from 'animejs'

export function useMagneticButton() {
  const el = ref<HTMLElement | null>(null)

  function onEnter() {
    if (!el.value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const shine = el.value.querySelector<HTMLElement>('.m-btn-shine')
    if (!shine) return

    animate(shine, {
      translateX: ['-120%', '120%'],
      duration: 700,
      ease: 'inOutSine',
    })
  }

  return { el, onEnter }
}
