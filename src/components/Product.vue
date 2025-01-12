<script lang="ts" setup>
import type { Product } from '@/types/Product'
import { defineProps, type PropType } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
})

const router = useRouter()

const redirectToProduct = (id: number) => {
  router.push({ name: 'product', params: { id } })
}
</script>

<template>
  <div
    class="card bg-base-100 w-96 shadow-xl cursor-pointer"
    @click="redirectToProduct(product.id)"
  >
    <figure>
      <img :src="product.thumbnail" :alt="product.title" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        {{ product.title }}
        <div class="badge badge-secondary">NEW</div>
      </h2>
      <p>{{ product.description }}</p>
      <p class="text-sm text-gray-500">Price: ${{ product.price }}</p>
      <div class="justify-end">
        <div v-for="tag in product.tags" :key="tag" class="badge badge-outline">
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>
