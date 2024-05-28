import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import type { APIResponse, Product, Products } from '@/types/index'

export const useProductStore = defineStore('ProductStore', {
  state: () => ({
    productsData: {} as Products
  }),

  actions: {
    async createProduct(form: Record<string, any>) {
      return new Promise<Product>(async (resolve, reject) => {
        try {
          const formData = new FormData()
          formData.append('name', form.name)
          formData.append('price', form.price)
          formData.append('stock', form.stock)
          formData.append('mainImage', form.mainImage)
          formData.append('description', form.description)
          formData.append('category', form.category)
          for (let i = 0; i < form.subImages.length; i++) {
            formData.append('subImages', form.subImages[i])
          }
          const { data } = await axios.post<APIResponse<Product>>('/ecommerce/products', formData)
          console.log('products', data.data)
          resolve(data.data)
        } catch (error) {
          reject(error)
        }
      })
    },
    async getProducts(page: number, limit: number) {
      return new Promise<Products>(async (resolve, reject) => {
        try {
          const { data } = await axios.get<APIResponse<Products>>(
            `/ecommerce/products?page=${page}&limit=${limit}`
          )
          console.log('products', data.data)
          this.productsData = data.data
          resolve(data.data)
        } catch (error) {
          reject(error)
        }
      })
    },
    async deleteProduct(productId: string) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await axios.delete(`/ecommerce/products/${productId}`)
          console.log('products', data.data)
          await this.getProducts(1, 2)
          resolve(data.data)
        } catch (error) {
          reject(error)
        }
      })
    },
    async getProduct(productId: string) {
      return new Promise<Product>(async (resolve, reject) => {
        try {
          const { data } = await axios.get<APIResponse<Product>>(`/ecommerce/products/${productId}`)
          console.log('product', data.data)
          resolve(data.data)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
})
