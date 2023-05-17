import axiosClient from '@/utils/axios'
import { defineStore } from 'pinia'
import router from '@/router'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')!),
        returnUrl: ''
    }),

    actions: {
        async login(username: string, password: string) {
            const user = await axiosClient.post('/auth/auth-admin', {
                username,
                password
            })
            console.log(axiosClient.getUri())

            if (user.data.msg) return user.data.msg

            this.user = user

            localStorage.setItem('user', JSON.stringify(user))
            setTimeout(() => {
                router.push(this.returnUrl || '/')
            }, 1500)

            return user
        },
        logout() {
            this.user = null
            localStorage.removeItem('user')
            router.push('/login')
        }
    }

})