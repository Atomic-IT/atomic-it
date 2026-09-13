export function useMobileNav() {
  const open = useState('mobile-nav-open', () => false)

  function openMobileNav() {
    open.value = true
  }

  function closeMobileNav() {
    open.value = false
  }

  function toggleMobileNav() {
    open.value = !open.value
  }

  return { open, openMobileNav, closeMobileNav, toggleMobileNav }
}
