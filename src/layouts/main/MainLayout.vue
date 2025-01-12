<script setup lang="ts">
import TopNavbar from '../TopNavbar.vue'
</script>

<template>
  <div class="flex flex-col transition-[margin]">
    <TopNavbar />
    <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
      <slot />
    </main>
  </div>
</template>
