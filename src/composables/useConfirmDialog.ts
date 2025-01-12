import { ref } from 'vue'

// Fetch product data composable
export const useConfirmDialog = () => {
  const isRevealed = ref(false)
  let resolvePromise: (value: boolean) => void

  const reveal = (): Promise<boolean> => {
    isRevealed.value = true
    return new Promise((resolve) => {
      resolvePromise = resolve
    })
  }

  const confirm = () => {
    isRevealed.value = false
    if (resolvePromise) resolvePromise(true)
  }

  const cancel = () => {
    isRevealed.value = false
    if (resolvePromise) resolvePromise(false)
  }

  return {
    isRevealed,
    reveal,
    confirm,
    cancel,
  }
}
