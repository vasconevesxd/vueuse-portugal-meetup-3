<script setup lang="ts">
import TopNavbar from '@/layouts/TopNavbar.vue'
import TopNavbarWithoutVueUse from '@/layouts/TopNavbarWithoutVueUse.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isVueUse = computed(
  () => !['productsWithoutVueUse', 'productWithoutVueUse'].includes(route.name),
)
</script>

<template>
  <div class="flex flex-col transition-[margin]">
    <TopNavbar v-if="isVueUse" />
    <TopNavbarWithoutVueUse v-else />
    <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
      <slot />
    </main>
  </div>
</template>
