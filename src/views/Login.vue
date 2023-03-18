<template>
  <v-sheet min-height="100vh" class="bg-deep-purple pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <div class="text-center">
        <v-avatar rounded="1" size="100" color="blue-darken-2">
          <v-avatar color="grey" size="150" rounded="0">
            <v-img cover src="https://static.zerochan.net/Yanfei.full.3333732.jpg"></v-img>
          </v-avatar>
        </v-avatar>
        <v-list-item class="text-white" title="Yanfei" subtitle="Pyro"></v-list-item>
      </div>

      <v-alert class="mb-5" v-if="err" type="error">{{ err }}</v-alert>

      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field @input="clearInput" v-model="username" :readonly="loading" :rules="[required]" class="mb-2"
          clearable label="ชื่อผู้ใช้"></v-text-field>

        <v-text-field v-model="password" :readonly="loading" :rules="[required]" type="password" clearable
          label="รหัสผ่าน" placeholder="ป้อนรหัสผ่านของคุณ"></v-text-field>

        <br />

        <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit" variant="elevated">
          ลงชื่อเข้าใช้
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script lang="ts">
import { useAuthStore } from '@/store'

export default {
  data: () => ({
    form: false,
    username: '',
    password: '',
    loading: false,
    err: "",
  }),

  methods: {

    async onSubmit() {
      if (!this.form) return

      this.loading = true

      const authStore = useAuthStore()
      try {
        const result = await authStore.login(this.username, this.password)
        setTimeout(() => {
          if (result) this.err = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
          this.loading = false
        }, 2000)
      } catch (err) {
        if (err) throw err
      }

    },
    required(v: any) {
      return !!v || "ต้องระบุฟิลด์"
    },
    clearInput() {
      this.err = ''
    },
    checkUser() {
      if (localStorage.getItem('user')) return this.$router.push('/')
    }
  },

  mounted() {
    this.checkUser()
  },
}
</script>
