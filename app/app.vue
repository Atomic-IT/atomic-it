<script setup lang="ts">
import { animate } from 'animejs'

const titleRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!titleRef.value) return

  animate(titleRef.value, {
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 900,
    ease: 'outQuad',
  })
})
</script>

<template>
  <main class="page">
    <h1 ref="titleRef" class="page__title">atomic-it</h1>
    <p class="page__subtitle">Nuxt 4 · TypeScript · SCSS · anime.js</p>
  </main>
</template>

<style lang="scss" scoped>
.page {
	display: grid;
	place-content: center;
	min-height: 100vh;
	padding: $space-md;
	text-align: center;
}

.page__title {
	margin: 0;
	font-size: clamp(2.5rem, 8vw, 4.5rem);
	font-weight: 700;
	letter-spacing: -0.04em;
	color: $color-accent;
	opacity: 0;
}

.page__subtitle {
	margin: $space-md 0 0;
	opacity: 0.7;
}
</style>
