<template>
  <Modal :isOpen="isOpen" @on-close="onClose">
    <div>Product Modal</div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/ui/Modal.vue'

import productModal from '@/composables/useProductModal'
const { isOpen, onClose } = productModal()
</script>

<style scoped></style>
