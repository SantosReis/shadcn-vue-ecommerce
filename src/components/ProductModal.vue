<template>
  <Modal :isOpen="isOpen" @on-close="onClose">
    <div class="overflow-y-auto h-[500px] max-h-[600px]">
      <form @submit.prevent="onSubmit" action="" class="grid gap-y-4">
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input id="name" type="text" placeholder="name" v-model="form.name" />
        </div>
        <div class="grid gap-2">
          <Label for="price">Price</Label>
          <Input id="price" type="number" placeholder="price" v-model="form.price" />
        </div>
        <div class="grid gap-2">
          <Label for="stock">Stock</Label>
          <Input id="stock" type="number" placeholder="stock" v-model="form.stock" />
        </div>
        <div class="grid gap-2">
          <Label for="description">Description</Label>
          <Input
            id="description"
            type="text"
            placeholder="description"
            v-model="form.description"
          />
        </div>
        <div class="grid gap-2">
          <Label for="category">Category</Label>
          <Select v-model="form.category" id="category">
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="category in categories" :value="category._id">
                  {{ category.name }}
                </SelectItem>
                <!-- <SelectItem value="ADMIN"> ADMIN </SelectItem> -->
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button class="w-full" type="submit"> Create Product </Button>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
//modal call
import Modal from '@/components/ui/Modal.vue'

import productModal from '@/composables/useProductModal'
const { isOpen, onClose } = productModal()
import { computed, ref } from 'vue'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

//form setup
import { useGlobalLoader } from 'vue-global-loader'
const { displayLoader, destroyLoader } = useGlobalLoader()

type PAYLOAD = {
  name: string
  price: number
  stock: number
  mainImage: File | undefined
  subImages: File[] | undefined
  description: string
  category: string | undefined
}
const form = ref<PAYLOAD>({
  name: 'Product',
  price: 10,
  stock: 10,
  mainImage: undefined,
  subImages: undefined,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos accusamus tenetur saepe expedita nisi, dolorum doloremque eligendi. Alias, dolorem perferendis?',
  category: undefined
})

//category setup
import { useCategoryStore } from '@/stores/categoryStore'
const categoryStore = useCategoryStore()
const categories = computed(() => categoryStore.categoriesData.categories)
</script>

<style scoped></style>
