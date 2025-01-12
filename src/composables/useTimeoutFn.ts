// composables/useColorMode.ts

import { onUnmounted, ref } from 'vue'

export const useTimeoutFn = (callback: () => void, delay: number) => {
  const timeoutId = ref<number | null>(null)

  const start = () => {
    stop() // Clear any existing timeout
    timeoutId.value = window.setTimeout(callback, delay)
  }

  const stop = () => {
    if (timeoutId.value !== null) {
      clearTimeout(timeoutId.value)
      timeoutId.value = null
    }
  }

  // Cleanup on unmount
  onUnmounted(stop)

  return { start, stop }
}
