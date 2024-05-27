<script setup lang="ts">
import { Button } from '@/components/ui/button'
import ProductModal from '@/components/ProductModal.vue'

import productModal from '@/composables/useProductModal'
const { onOpen, isOpen } = productModal()
</script>
<template>
  <ProductModal v-if="isOpen" />
  <div class="mx-auto w-full max-w-4xl my-10">
    <div class="flex justify-between items-center">
      <h3 class="text-2xl font-bold">All Products</h3>
      <Button @click="onOpen">Add Product</Button>
    </div>
  </div>
</template>
