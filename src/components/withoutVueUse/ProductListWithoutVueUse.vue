<script lang="ts" setup>
import { defineProps, type PropType } from 'vue'
import type { Product as ProductType } from '@/types/Product'
import ProductWithoutVueUse from './ProductWithoutVueUse.vue'

defineProps({
  products: {
    type: Array as PropType<Array<ProductType>>,
    required: true,
  },
})
</script>

<template>
  <ProductWithoutVueUse v-for="product in products" :key="product.id" :product="product" />
</template>
