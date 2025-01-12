<script lang="ts" setup>
import { useConfirmDialog } from '@/composables/useConfirmDialog'

const { isRevealed, reveal, confirm, cancel } = useConfirmDialog()

defineExpose({
  reveal,
  confirm,
  cancel,
})
</script>

<template>
  <dialog id="my_modal_1" class="modal" :open="isRevealed">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Confirm delete</h3>
      <p class="py-4">Are you sure you want to delete this item?</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn btn-active btn-neutral" @click="cancel" type="button">Cancel</button>
          <button class="btn btn-active ml-2" @click="confirm" type="button">Confirm</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
