import { ref, watch, type Ref } from 'vue'

export const useDebounce = <T>(value: T, delay: number) => {
  const debouncedValue = ref(value) as Ref<T>
  let timeout: ReturnType<typeof setTimeout>

  watch(
    () => value,
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
