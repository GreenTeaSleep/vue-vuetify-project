<template>
  <v-sheet min-height="100vh" class="bg-deep-purple pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <div class="text-center">
        <v-avatar rounded="1" size="100" color="blue-darken-2">
          <!-- <v-icon icon="mdi-alarm"></v-icon> -->
          <v-avatar color="grey" size="150" rounded="0">
            <v-img cover src="https://static.zerochan.net/Yanfei.full.3333732.jpg"></v-img>
          </v-avatar>
        </v-avatar>
        <v-list-item class="text-white" title="Yanfei" subtitle="Pyro"></v-list-item>
      </div>

      <v-alert class="mb-5" v-if="err" type="error">{{ err }}</v-alert>

      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field v-model="username" :readonly="loading" :rules="[required]" class="mb-2" clearable
          label="Username"></v-text-field>

        <v-text-field v-model="password" :readonly="loading" :rules="[required]" type="password" clearable
          label="Password" placeholder="Enter your password"></v-text-field>

        <br />

        <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit" variant="elevated">
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script lang="ts">
import axios from "axios";

const AUTH_API = "http://localhost:3001";

export default {
  data: () => ({
    form: false,
    username: null,
    password: null,
    loading: false,
    err: "",
  }),

  methods: {
    async onSubmit() {
      if (!this.form) return;

      this.loading = true;

      const dataUser = {
        username: this.username,
        password: this.password,
      };

      axios
        .post(`${AUTH_API}/api/auth/users/login`, dataUser)
        .then((result) => {
          if (result.data.message) {
            this.err = result.data.message;
            this.loading = false;
          } else {
            this.err = "";
            localStorage.setItem("token", result.data.token);
            setTimeout(() => {
              this.loading = false;
              this.$router.push("/");
            }, 2000);
          }
        })
        .catch((err) => {
          alert(err);
          this.loading = false;
        });
    },
    required(v: any) {
      return !!v || "Field is required";
    },
  },

  mounted() {
    if (localStorage.getItem("token") != null) this.$router.push("/");
  },
};
</script>
