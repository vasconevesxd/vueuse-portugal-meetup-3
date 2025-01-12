<script setup lang="ts">
import { onMounted } from 'vue'
import { useColorMode } from '@/composables/useColorMode'

const themes = ['light', 'dark', 'cupcake'] as const

const modes = {
  light: 'light',
  dark: 'dark',
  cupcake: 'cupcake',
}

// Use the custom composable to manage the theme
const colorMode = useColorMode({
  attribute: 'data-theme',
  storageKey: 'theme', // localStorage key
  modes,
})

// Ensure a default theme if none is set
onMounted(() => {
  if (!colorMode.value) {
    colorMode.value = themes[0]
  }
})
</script>

<template>
  <nav class="navbar bg-base-100 shadow-md">
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost normal-case text-xl">Shop</RouterLink>
    </div>
    <div class="flex-none">
      <select v-model="colorMode" class="select select-bordered max-w-xs">
        <option v-for="theme in themes" :key="theme" :value="theme">
          {{ theme }}
        </option>
      </select>
    </div>
  </nav>
</template>
