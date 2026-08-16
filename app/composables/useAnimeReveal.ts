import { animate, stagger } from 'animejs'

type RevealOptions = {
  y?: number
  duration?: number
  staggerMs?: number
  threshold?: number
}

export function useAnimeReveal(options: RevealOptions = {}) {
  const { y = 28, duration = 780, staggerMs = 90, threshold = 0.22 } = options

  const root = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!root.value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.value.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting || !root.value) return

        const targets = root.value.querySelectorAll<HTMLElement>('.reveal')
        if (!targets.length) return

        animate(targets, {
          opacity: [0, 1],
          translateY: [y, 0],
          delay: stagger(staggerMs),
          duration,
          ease: 'outCubic',
        })

        observer?.disconnect()
      },
      { threshold }
    )

    observer.observe(root.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { root }
}
