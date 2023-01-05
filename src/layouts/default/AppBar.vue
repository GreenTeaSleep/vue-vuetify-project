<template>
  <v-app-bar color="primary" density="compact" flat>
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />
      Base Preset
    </v-app-bar-title>
  </v-app-bar>
  <DefaultDrawer :drawer="drawer" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultDrawer from "./Drawer.vue";

export default defineComponent({
  components: {
    DefaultDrawer,
  },

  data: () => ({
    drawer: true,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },

  created() {
    window.addEventListener("resize", this.myEventHandler);
    this.checkWidth(screen.width);
  },

  methods: {
    myEventHandler(e: any) {
      const toS = e.currentTarget.innerWidth;
      this.checkWidth(toS);
    },
    checkWidth(toS: any) {
      if (toS < 960) {
        this.drawer = false;
      } else {
        this.drawer = true;
      }
    },
  },
});
</script>
