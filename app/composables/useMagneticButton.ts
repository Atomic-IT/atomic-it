import { animate } from 'animejs'

export function useMagneticButton(strength = 18) {
  const el = ref<HTMLElement | null>(null)
  let moving = false

  function onMove(event: MouseEvent) {
    if (!el.value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = el.value.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2

    moving = true
    animate(el.value, {
      translateX: x / strength,
      translateY: y / strength,
      duration: 280,
      ease: 'outQuad',
    })
  }

  function onEnter() {
    if (!el.value) return
    const shine = el.value.querySelector<HTMLElement>('.m-btn-shine')
    if (!shine) return

    animate(shine, {
      translateX: ['-120%', '120%'],
      duration: 700,
      ease: 'inOutSine',
    })
  }

  function onLeave() {
    if (!el.value) return
    moving = false
    animate(el.value, {
      translateX: 0,
      translateY: 0,
      duration: 420,
      ease: 'outElastic(1, 0.6)',
    })
  }

  return { el, onMove, onEnter, onLeave, moving }
}
