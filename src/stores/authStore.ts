import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useAuthStore = defineStore('AuthStore', {
  actions: {
    async registerUser(form: Record<string, string>) {
      return new Promise<number>(async (resolve, reject) => {
        try {
          const { data } = await axios.post('/users/register', {
            ...form
          })
          console.log('REGISTER', data.data)

          resolve(1)
          // resolve(data.data.user)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
})
