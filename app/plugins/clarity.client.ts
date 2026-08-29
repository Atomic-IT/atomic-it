const CLARITY_ID = 'y9uk4i15qy'

export default defineNuxtPlugin(() => {
  if (document.querySelector(`script[src*="clarity.ms/tag/${CLARITY_ID}"]`)) {
    return
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`
  document.head.appendChild(script)
})
