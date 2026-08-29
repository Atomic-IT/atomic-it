export function useContactDialog() {
  const open = useState('contact-dialog-open', () => false)

  function openContactDialog() {
    open.value = true
  }

  function closeContactDialog() {
    open.value = false
  }

  return { open, openContactDialog, closeContactDialog }
}
