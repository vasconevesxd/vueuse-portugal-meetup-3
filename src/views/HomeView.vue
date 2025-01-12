<script setup lang="ts"></script>

<template>
  <main class="flex justify-center items-start min-h-screen from-blue-50 via-white to-blue-100 p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <router-link
        to="/products"
        aria-label="Navigate to VueUse page"
        class="card w-80 bg-white shadow-xl rounded-lg transition-transform transform hover:scale-105 hover:-rotate-1 hover:shadow-2xl focus:ring-4 focus:ring-blue-200 focus:outline-none"
      >
        <div class="card-body p-6">
          <h2 class="card-title text-xl font-semibold text-gray-800">With VueUse</h2>
          <p class="text-gray-600 mt-2">Explore how VueUse simplifies common Vue.js patterns.</p>
        </div>
      </router-link>

      <router-link
        to="/productsWithoutVueUse"
        aria-label="Navigate to page without VueUse"
        class="card w-80 bg-white shadow-xl rounded-lg transition-transform transform hover:scale-105 hover:rotate-1 hover:shadow-2xl focus:ring-4 focus:ring-blue-200 focus:outline-none"
      >
        <div class="card-body p-6">
          <h2 class="card-title text-xl font-semibold text-gray-800">Without VueUse</h2>
          <p class="text-gray-600 mt-2">See how tasks are managed without VueUse utilities.</p>
        </div>
      </router-link>
    </div>
  </main>
</template>
