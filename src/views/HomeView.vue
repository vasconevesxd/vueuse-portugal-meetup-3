<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFetch } from '@vueuse/core'
import AlertError from '@/components/AlertError.vue'
import ProductList from '@/components/ProductList.vue'
import Filter from '@/components/Filter.vue'

// Base URL for fetching products
const baseUrl = 'https://dummyjson.com/products'
const url = ref(baseUrl)
const searchQuery = ref('') // Reactive searchQuery for filtering products

// Fetch products
const { isFetching, error, data, execute } = useFetch(url, {
  immediate: true, // Fetch on initialization
})
  .get()
  .json()

// Function to fetch filtered products
const getFilterProducts = async () => {
  if (searchQuery.value.trim()) {
    // Update URL with the searchQuery for filtering
    url.value = `${baseUrl}/search?q=${searchQuery.value}`
  } else {
    // Reset to the default URL if searchQuery is empty
    url.value = baseUrl
  }
  await execute() // Execute the fetch with the updated URL
}

// Watch `searchQuery` and refetch products when it changes
watch(searchQuery, getFilterProducts)

const handleSearch = (query: string) => {
  searchQuery.value = query
}
</script>

<template>
  <main>
    <div class="flex justify-end mb-4">
      <Filter @update-search="handleSearch" />
    </div>

    <!-- Show an error alert if there's an error -->
    <div v-if="error">
      <AlertError :error="error" />
    </div>

    <!-- Smooth transition between loading and results -->
    <transition name="fade" mode="out-in">
      <!-- Show a loading spinner if data is being fetched -->
      <div v-if="isFetching" key="loading" class="flex justify-center w-full h-full">
        <span class="loading loading-spinner loading-lg"></span>
      </div>

      <!-- Show the product list if data is available -->
      <div
        v-else-if="data?.products?.length"
        key="results"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <ProductList :products="data.products" />
      </div>

      <!-- Show a 'No products available' message if there are no products -->
      <div v-else key="no-products" class="flex justify-center items-center w-full h-64">
        <p class="text-gray-500 text-lg">No products available</p>
      </div>
    </transition>
  </main>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-300;
}
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
.fade-enter-to,
.fade-leave-from {
  @apply opacity-100;
}
</style>
