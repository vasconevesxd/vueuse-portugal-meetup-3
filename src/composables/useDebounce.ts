import { ref, watch, type Ref, type ComputedRef } from 'vue'

export const useDebounce = <T>(value: Ref<T> | ComputedRef<T>, delay: number) => {
  const debouncedValue = ref<T>(value.value)
  let timeout: ReturnType<typeof setTimeout>

  watch(
    value,
    (newValue) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        debouncedValue.value = newValue
      }, delay)
    },
    { immediate: true },
  )

  return debouncedValue
}
