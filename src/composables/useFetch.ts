import { ref } from 'vue'

/**
 * useFetch is a Vue composable that provides a reusable way to fetch data from an API.
 * It manages the fetching state, the fetched data, and any errors that occur during the request.
 *
 * Intended use case:
 * - Simplifying API calls in Vue components by encapsulating the logic.
 * - Providing reactive state for data fetching.
 */
export const useFetch = () => {
  const data = ref(null) // Holds the fetched data.
  const isFetching = ref(false) // Indicates whether a fetch request is in progress.
  const error = ref<string | null>(null) // Stores any errors encountered during the fetch.

  /**
   * Executes the fetch request to the given URL.
   * @param {string} fetchUrl - The URL to fetch data from.
   */
  const execute = async (fetchUrl: string) => {
    isFetching.value = true
    error.value = null
    try {
      const response = await fetch(fetchUrl)
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`)
      }
      data.value = await response.json() // Parse and store the JSON response.
    } catch (err) {
      error.value = err as Error // Capture and store any errors.
    } finally {
      isFetching.value = false // Reset fetching state after completion.
    }
  }

  return { data, isFetching, error, execute } // Expose reactive state and the execute function.
}
