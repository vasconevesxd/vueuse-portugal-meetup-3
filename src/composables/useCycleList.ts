import { ref, watch } from 'vue'

// Cycle list composable
export const useCycleList = (list: any[]) => {
  const state = ref(list[0] || null)
  const index = ref(0)

  const next = () => {
    if (list.length > 0) {
      index.value = (index.value + 1) % list.length
      state.value = list[index.value]
    }
  }

  const prev = () => {
    if (list.length > 0) {
      index.value = (index.value - 1 + list.length) % list.length
      state.value = list[index.value]
    }
  }

  watch(
    () => list,
    (newList) => {
      if (newList.length > 0) {
        state.value = newList[0]
        index.value = 0
      } else {
        state.value = null
        index.value = -1
      }
    },
    { immediate: true, deep: true },
  )

  return { state, index, next, prev }
}
