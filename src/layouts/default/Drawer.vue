<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-navigation-drawer v-model="drawer" class="bg-deep-purple" theme="dark" permanent>
    <v-list color="transparent">
      <div class="text-center">
        <v-avatar rounded="1" size="100" color="blue-darken-2">
          <v-avatar @click="imageTo" color="grey" size="150" rounded="0">
            <v-img cover src="https://static.zerochan.net/Yanfei.full.3333732.jpg"></v-img>
          </v-avatar>
        </v-avatar>
        <v-list-item class="text-white" :title="dataUser" subtitle="Admin"></v-list-item>
      </div>

      <v-divider></v-divider>

      <v-list nav> <!-- density="compact" -->
        <v-list-item @click="toggle(item.path)" v-for="item in items" :key="item.icon" :prepend-icon="item.icon"
          :title="item.title" :value="item.value" :to="item.path"></v-list-item>
      </v-list>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn @click="logout" :loading="loading" variant="elevated" block>
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useAuthStore } from '@/store'

export default defineComponent({
  props: ["drawer"],
  data: () => ({
    loading: false,
    items: [
      { icon: "mdi-view-dashboard", title: "Home", value: "home", path: "/" },
      {
        icon: "mdi-basket-outline",
        title: "ผลิตภัณฑ์",
        value: "product",
        path: "/product",
      },
      {
        icon: "mdi-file-document-outline",
        title: "ประเภทผลิตภัณฑ์",
        value: "category",
        path: "/category",
      },
      {
        icon: "mdi-account-group",
        title: "กลุ่มวิสาหกิจชุมชน",
        value: "community",
        path: "/community",
      },
    ],
    dataUser: '',
  }),
  mounted() {
    this.toggle(this.$route.fullPath)
    this.dataUser = JSON.parse(localStorage.getItem('user')!).data.full_name
  },
  methods: {
    imageTo() {
      window.open('https://github.com/GreenTeaSleep/FE-Songkhla-Community-E-Commerce-Vuetify', '_blank')
    },
    toggle(v: any) {
      let arr = Array.from(document.querySelectorAll(".v-list-item"))
      arr.shift()
      if (v != "/") {
        arr[0].classList.remove("v-list-item--active")
        return
      } else {
        arr[0].classList.add("v-list-item--active")
      }
    },
    logout() {
      if (confirm("คุณต้องการออกจากระบบ ?") == true) {
        useAuthStore().logout()
        this.loading = true

        setTimeout(() => {
          this.loading = false
          localStorage.removeItem("token")
          this.$router.push("/login")
        }, 500)
      }
    },
  },
})
</script>
