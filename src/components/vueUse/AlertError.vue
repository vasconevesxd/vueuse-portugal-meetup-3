<script lang="ts" setup>
import { useTimeoutFn } from '@vueuse/core'
import { ref } from 'vue'

defineProps({
  error: {
    type: String,
    required: true,
  },
})

const showAlert = ref(true)
const { start, stop } = useTimeoutFn(() => {
  showAlert.value = false
}, 3000)
</script>

<template>
  <transition appear>
    <div
      v-if="showAlert"
      role="alert"
      class="alert alert-error"
      @mouseenter="stop"
      @mouseout="start"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ error }}</span>
      <div>
        <button class="btn btn-sm btn-ghost" @click="showAlert = !showAlert">X</button>
      </div>
    </div>
  </transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
