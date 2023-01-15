<template>
  <v-navigation-drawer :model-value="drawer" class="bg-deep-purple" theme="dark" permanent>
    <v-list color="transparent">
      <div class="text-center">
        <v-avatar rounded="1" size="100" color="blue-darken-2">
          <!-- <v-icon icon="mdi-alarm"></v-icon> -->
          <v-avatar color="grey" size="150" rounded="0">
            <v-img cover src="https://static.zerochan.net/Yanfei.full.3333732.jpg"></v-img>
          </v-avatar>
        </v-avatar>
        <v-list-item class="text-white" title="Yanfei" subtitle="Pyro"></v-list-item>
      </div>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home" to="/"></v-list-item>
        <v-list-item prepend-icon="mdi-forum" title="ประเภทผลิตภัณฑ์" value="about" to="/about"></v-list-item>
        <v-list-item prepend-icon="mdi-forum" title="กลุ่มวิสาหกิจชุมชน" value="community"
          to="/community"></v-list-item>
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
import { defineComponent } from "vue";

export default defineComponent({
  props: ["drawer"],
  data: () => ({
    loading: false,
  }),
  methods: {
    logout() {
      if (confirm("คุณต้องการออกจากระบบ ?") == true) {
        this.loading = true;

        setTimeout(() => {
          this.loading = false;
          localStorage.removeItem("token");
          this.$router.push("/login");
        }, 500);
      }
    },
  },
});
</script>
