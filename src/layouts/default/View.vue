<template>
  <v-main>
    <router-view />
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      user: null,
      token: localStorage.getItem("token"),
    };
  },
  created() {
    if (localStorage.getItem("token") === null) this.$router.push("/login");
  },
});
</script>