<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import AlertError from '@/components/AlertError.vue'
import { useFetchData } from '@/composables/useFetch'
import { useCycleList } from '@/composables/useCycleList'

const route = useRoute()

// URL for fetching product data
const url = ref(`https://dummyjson.com/product/${route.params.id}`)

// Fetch product data
const { data, isFetching, error, execute } = useFetchData()
execute(url.value)
// Computed property for images
const images = computed(() => data.value?.images || [])

// Initialize cycle list for images
const { state, index: imageIndex, next, prev } = useCycleList(images.value)
</script>

<template>
  <div>
    <div v-if="error">
      <AlertError :error="error" />
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="isFetching" key="loading" class="flex justify-center items-center w-full h-screen">
        <span class="loading loading-spinner loading-lg"></span>
      </div>

      <!-- Valid Data State -->
      <div
        v-else-if="data && Object.keys(data).length > 0"
        key="results"
        class="container mx-auto px-4 md:px-8"
      >
        <!-- Product Image and Carousel -->
        <div class="flex flex-wrap lg:flex-nowrap gap-6">
          <div class="w-full lg:w-1/2">
            <div class="carousel w-full" v-if="state">
              <div class="carousel-item relative w-full">
                <transition>
                  <img
                    :src="typeof state === 'string' ? state : ''"
                    :key="imageIndex"
                    class="rounded-lg"
                  />
                </transition>
                <div
                  class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
                >
                  <button class="btn btn-circle" @click="prev">❮</button>
                  <button class="btn btn-circle" @click="next">❯</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Details -->
          <div class="w-full lg:w-1/2 space-y-6">
            <h2 class="text-2xl font-bold">{{ data.title }}</h2>
            <p class="text-gray-600">{{ data.description }}</p>

            <div class="border-t border-gray-200 pt-4 space-y-2">
              <p>
                <strong>Price:</strong> ${{ data.price }}
                <span class="text-sm text-gray-500">({{ data.discountPercentage }}% off)</span>
              </p>
              <p><strong>Rating:</strong> {{ data.rating }} / 5</p>
              <p><strong>Stock:</strong> {{ data.availabilityStatus }}</p>
              <p><strong>Brand:</strong> {{ data.brand }}</p>
            </div>

            <div class="border-t border-gray-200 pt-4">
              <p>
                <strong>Dimensions:</strong> {{ data.dimensions.width }} x
                {{ data.dimensions.height }} x {{ data.dimensions.depth }} cm
              </p>
              <p><strong>Weight:</strong> {{ data.weight }}g</p>
            </div>

            <div class="border-t border-gray-200 pt-4 space-y-2">
              <p><strong>Warranty:</strong> {{ data.warrantyInformation }}</p>
              <p><strong>Shipping:</strong> {{ data.shippingInformation }}</p>
              <p><strong>Return Policy:</strong> {{ data.returnPolicy }}</p>
            </div>

            <div class="mt-6 flex gap-4 flex-wrap">
              <button class="btn btn-primary w-fit">Add to Cart</button>
              <button class="btn btn-secondary w-fit">Buy Now</button>
            </div>
          </div>
        </div>

        <!-- Features Section -->
        <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in data.features"
            :key="index"
            class="bg-base-100 p-6 rounded-lg shadow-md"
          >
            <h3 class="text-lg font-semibold">{{ feature.title }}</h3>
            <p class="text-gray-600 mt-2">{{ feature.description }}</p>
          </div>
        </div>

        <!-- Reviews Section -->
        <div class="mt-12">
          <h3 class="text-xl font-bold mb-4">Customer Reviews</h3>
          <div v-if="data.reviews.length > 0" class="space-y-4">
            <div v-for="review in data.reviews" :key="review.reviewerEmail" class="alert shadow-lg">
              <div>
                <div>
                  <strong>{{ review.reviewerName }}</strong> rated it {{ review.rating }} / 5
                </div>
                <p class="text-gray-600">{{ review.comment }}</p>
                <p class="text-xs text-gray-500">
                  {{ new Date(review.date).toLocaleDateString() }}
                </p>
              </div>
            </div>
          </div>
          <p v-else class="text-gray-500">No reviews yet.</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.carousel {
  position: relative;
  height: 200px;
  top: 50%;
  transform: translateY(-50%);
}
.carousel img {
  width: 100%;
  position: absolute;
  height: 200px;
  object-fit: contain;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
