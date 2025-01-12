import { ref } from 'vue'

export const useFetchData = () => {
  const data = ref(null)
  const isFetching = ref(false)
  const error = ref<string | null>(null)

  const execute = async (fetchUrl: string) => {
    isFetching.value = true
    error.value = null
    try {
      const response = await fetch(fetchUrl)
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`)
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err as Error
    } finally {
      isFetching.value = false
    }
  }

  return { data, isFetching, error, execute }
}
