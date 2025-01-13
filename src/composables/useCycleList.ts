import { ref, computed, toRef, type Ref, type MaybeRefOrGetter } from 'vue'

// Define the configuration interface for useCycleList
export interface useCycleListConfig {
  fallbackIndex?: number // Optional index to fall back to when an invalid index is accessed
  fallbackValue?: any // Optional value to fall back to when an invalid value is set
}

// Default configuration for useCycleList
export const useCycleListConfigDefaults: useCycleListConfig = {
  fallbackIndex: undefined,
  fallbackValue: undefined,
}

// Main function to cycle through the list, with optional config
export const useCycleList = <T>(list: MaybeRefOrGetter<T[]>, config?: useCycleListConfig) => {
  // Merge the provided config with the default values
  const _config = {
    ...useCycleListConfigDefaults,
    ...config,
  }

  // Ref to track the index of the active item in the list
  const activeIndex = ref(0)

  // Convert the list to a reactive reference (support for MaybeRefOrGetter types)
  const _list = toRef(list) as Ref<T[]>

  // Computed property for getting and setting the active list item based on the index
  const state = computed({
    // Getter: Return the active item from the list
    get() {
      return _list.value[activeIndex.value]
    },
    // Setter: Set the active item by value, adjusting the index if necessary
    set(value) {
      const foundIndex = _list.value.indexOf(value)

      // If the value is found in the list, set the active index to its position
      if (foundIndex >= 0) {
        activeIndex.value = foundIndex
      } else {
        // If the value is not found, fall back to a configured value or raise an error
        const foundFallbackValueIndex = _list.value.indexOf(_config.fallbackValue)
        if (foundFallbackValueIndex === -1) {
          throw Error(
            `${value} is not found in the useCycleList list and cannot be set with state.value = ''`,
          )
        } else {
          activeIndex.value = foundFallbackValueIndex
        }
      }
    },
  })

  // Function to move to the next item in the list, cycling back to the start if necessary
  function next() {
    if (activeIndex.value === _list.value.length - 1) {
      activeIndex.value = 0
    } else {
      activeIndex.value++
    }
  }

  // Function to move to the previous item in the list, cycling back to the end if necessary
  function prev() {
    if (activeIndex.value === 0) {
      activeIndex.value = _list.value.length - 1
    } else {
      activeIndex.value--
    }
  }

  // Function to jump to a specific index in the list, with optional fallback logic
  function go(index: number) {
    if (index >= _list.value.length) {
      // If the index is out of bounds, use the fallback index or throw an error
      if (typeof _config.fallbackIndex !== 'undefined') {
        activeIndex.value = _config.fallbackIndex
      } else {
        throw new Error(
          `Cannot go to index ${index}. The list provided to useCycleList is not that long.`,
        )
      }
    } else {
      activeIndex.value = index
    }
  }

  // Return the reactive state and the control functions (next, prev, go)
  return {
    state,
    prev,
    next,
    go,
  }
}
