<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { Button } from '@/components/ui/button'
import ProductModal from '@/components/ProductModal.vue'

import { useGlobalLoader } from 'vue-global-loader'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

const { displayLoader, destroyLoader } = useGlobalLoader()

import productModal from '@/composables/useProductModal'
const { onOpen, isOpen } = productModal()

import { useCategoryStore } from '@/stores/categoryStore'
const categoryStore = useCategoryStore()
import { useProductStore } from '@/stores/productStore'
const productStore = useProductStore()

const products = computed(() => productStore.productsData.products)

const currentPage = ref(1)

const fetchCategories = async () => {
  try {
    await categoryStore.getCategories(1, 5)
  } catch (error) {
    console.log(error)
  }
}
const fetchProducts = async () => {
  try {
    await productStore.getProducts(currentPage.value, 2)
  } catch (error) {
    console.log(error)
  }
}
const initialSetup = async () => {
  try {
    displayLoader()
    await fetchCategories()
    await fetchProducts()
  } catch (error) {
    console.log(error)
  } finally {
    destroyLoader()
  }
}
onMounted(async () => {
  await initialSetup()
})
</script>
<template>
  <ProductModal v-if="isOpen" />
  <div class="mx-auto w-full max-w-4xl my-10">
    <div class="flex justify-between items-center">
      <h3 class="text-2xl font-bold">All Products</h3>
      <Button @click="onOpen">Add Product</Button>
    </div>
    <div class="w-full grid grid-cols-3 gap-4 my-10">
      <Card v-for="product in products" :key="product._id">
        <CardContent class="grid gap-4 p-4 pt-4">
          <div class="overflow-hidden rounded-md">
            <img
              :src="product.mainImage.url"
              :alt="product.name"
              class="h-auto w-full object-cover transition-all hover:scale-105"
            />
          </div>
          <h3 class="text-xl font-semibold">
            {{ product.name }}
          </h3>
          <p>
            {{ product.description }}
          </p>
        </CardContent>
        <CardFooter class="border-t p-4 pt-4 w-full justify-between">
          <p>{{ product.price }}$</p>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
