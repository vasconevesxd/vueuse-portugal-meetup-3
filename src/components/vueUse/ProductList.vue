<script lang="ts" setup>
import { defineProps, type PropType } from 'vue'
import type { Product as ProductType } from '@/types/Product'
import Product from './Product.vue'

defineProps({
  products: {
    type: Array as PropType<Array<ProductType>>,
    required: true,
  },
})
</script>

<template>
  <Product v-for="product in products" :key="product.id" :product="product" />
</template>
