// composables/useColorMode.ts
import { ref, watch, onMounted } from 'vue'

export const useColorMode = ({
  attribute = 'data-theme',
  storageKey = 'theme',
  modes = {},
}: {
  attribute: string
  storageKey: string
  modes: Record<string, string>
}) => {
  const colorMode = ref(localStorage.getItem(storageKey) || Object.keys(modes)[0])

  const updateThemeAttribute = () => {
    document.documentElement.setAttribute(attribute, colorMode.value)
  }

  watch(colorMode, (newMode) => {
    localStorage.setItem(storageKey, newMode)
    updateThemeAttribute()
  })

  onMounted(() => {
    updateThemeAttribute()
  })

  return colorMode
}
