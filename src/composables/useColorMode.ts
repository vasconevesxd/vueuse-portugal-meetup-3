import { ref, watch, onMounted } from 'vue'

// Interface for customizable options when using the color mode composable
interface UseColorModeOptions {
  attribute?: string // The HTML attribute used to set the theme (e.g., "data-theme" for daisyUI)
  storageKey?: string // The key used to store the current theme in localStorage
  modes?: Record<string, string> // A map of theme names to their corresponding values
}

// Function to manage and persist a color mode (e.g., light/dark themes)
export const useColorMode = ({
  attribute = 'data-theme', // Default attribute is "data-theme" for daisyUI themes
  storageKey = 'theme', // Default storage key for localStorage
  modes = { light: 'light', dark: 'dark' }, // Default themes: light and dark
}: UseColorModeOptions = {}) => {
  // Reactive variable to store the current color mode
  // Initialized from localStorage or defaults to the first mode
  const colorMode = ref<string>(localStorage.getItem(storageKey) || Object.keys(modes)[0])

  // Function to update the HTML attribute with the current theme
  const updateThemeAttribute = () => {
    if (colorMode.value) {
      // Set the attribute on the <html> tag based on the current color mode
      document.documentElement.setAttribute(attribute, modes[colorMode.value] || colorMode.value)
    }
  }

  // Watcher to respond to changes in the colorMode reactive variable
  // Updates localStorage and the HTML attribute whenever the mode changes
  watch(colorMode, (newMode) => {
    if (newMode) {
      localStorage.setItem(storageKey, newMode) // Save the new mode in localStorage
      updateThemeAttribute() // Update the theme attribute on the document
    }
  })

  // Lifecycle hook to initialize the theme when the component is mounted
  onMounted(() => {
    updateThemeAttribute() // Apply the theme stored in colorMode on mount
  })

  // Return the reactive colorMode variable to allow usage in components
  return colorMode
}
