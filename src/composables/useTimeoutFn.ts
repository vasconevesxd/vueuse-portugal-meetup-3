import { onUnmounted, ref } from 'vue'

/**
 * `useTimeoutFn` - A Vue composable for managing timeouts.
 * Provides `start` to set a timeout and `stop` to clear it,
 * with automatic cleanup on component unmount.
 */

export const useTimeoutFn = (callback: () => void, delay: number) => {
  // Holds the reference to the timeout
  const activeTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

  /**
   * Starts the timeout and executes the callback after the specified delay.
   * If a timeout is already active, it will be cleared before starting a new one.
   */
  const start = () => {
    stop() // Clear any existing timeout to avoid overlaps
    activeTimeout.value = setTimeout(() => {
      callback()
      activeTimeout.value = null // Reset the reference after execution
    }, delay)
  }

  /**
   * Stops the active timeout if it exists, preventing the callback from being executed.
   */
  const stop = () => {
    if (activeTimeout.value !== null) {
      clearTimeout(activeTimeout.value)
      activeTimeout.value = null // Reset the reference
    }
  }

  // Ensure any active timeout is cleared when the component is unmounted
  onUnmounted(stop)

  // Return the functions for managing the timeout
  return { start, stop }
}
