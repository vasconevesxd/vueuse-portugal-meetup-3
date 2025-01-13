// Import necessary Vue functions and types
import { watch, onUnmounted, type Ref, type MaybeRefOrGetter, toRef } from 'vue'

// Define an interface for options that can be passed to the debounced Ref
export interface RefDebouncedOptions {
  delay?: number // Optional delay in milliseconds for debouncing
}

// Define default options for the debounced Ref
export const useDebouncedOptions: RefDebouncedOptions = {
  delay: 0, // Default delay is set to 0 milliseconds (no debouncing)
}

// Main utility function to create a debounced Ref
export const refDebounced = <T>(
  value: MaybeRefOrGetter<T>, // Input value that can be a Ref, a Getter, or a static value
  options: RefDebouncedOptions = {}, // Options to customize the behavior, such as delay
): Ref<T> => {
  // Merge default options with user-provided options
  const _options = {
    ...useDebouncedOptions, // Default options
    ...options, // User-provided options
  }

  // Extract the delay from the merged options
  const { delay } = _options

  // Normalize the input value to a Ref using toRef for consistent behavior
  const _debouncedValue = toRef(value) as Ref<T>
  let timeout: ReturnType<typeof setTimeout> | null = null // Timeout ID for managing debounce

  // Set up a watcher to observe changes in the input value
  const stopWatch = watch(
    toRef(value) as Ref<T>, // Pass the normalized Ref to the watcher
    (newValue) => {
      // Clear the existing timeout, if any
      if (timeout) clearTimeout(timeout)
      // Set a new timeout to update the debounced value after the specified delay
      timeout = setTimeout(() => {
        _debouncedValue.value = newValue // Update the debounced value
      }, delay)
    },
  )

  // Cleanup logic to clear the timeout and stop the watcher when the component is unmounted
  onUnmounted(() => {
    if (timeout) clearTimeout(timeout) // Clear the timeout if it exists
    stopWatch() // Stop the watcher to prevent memory leaks
  })

  // Return the debounced Ref for use in the component or application
  return _debouncedValue
}
