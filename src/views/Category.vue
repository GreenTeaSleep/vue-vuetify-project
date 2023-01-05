<template>
  <v-container class="fill-height">
    <v-card>
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="one">ประเภทผลิตภัณฑ์</v-tab>
        <v-tab value="two">เพิ่มประเภทผลิตภัณฑ์</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <v-table fixed-header height="80vh">
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">ชื่อประเภท</th>
                  <th class="text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="({ category_id, name }, index) in desserts">
                  <td>{{ index + 1 }}</td>
                  <td>{{ name }}</td>
                  <td>
                    <v-btn class="mr-1">
                      <v-icon color="green" icon="mdi-pencil-box"></v-icon
                    ></v-btn>
                    <v-btn class="ml-1">
                      <v-icon
                        @click="deleteData(category_id)"
                        color="red"
                        icon="mdi-delete"
                      ></v-icon
                    ></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-window-item>

          <v-window-item value="two"> Two </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  methods: {
    search() {
      console.log("search");
    },
    async deleteData(id: any) {
      if (confirm("You want to delete the data right?") === true) {
        console.log(id);
        const result = await axios.delete(
          "http://localhost:3001/api/category/" + id.toString()
        );
        this.$router.go(0);
      }
    },
  },
  async created() {
    const result = await axios.get("http://localhost:3001/api/category");
    this.desserts = result.data;
  },
  data: () => ({
    tab: null,
    desserts: [],
  }),
});
</script>
