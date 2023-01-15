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
                <tr v-for="({ category_id, name }, index) in desserts" :key="category_id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ name }}</td>
                  <td>
                    <v-dialog transition="dialog-top-transition">
                      <template v-slot:activator="{ props }">
                        <v-btn class="ma-2" @click="editData(name)" v-bind="props">
                          <v-icon color="green" icon="mdi-pencil-box"></v-icon></v-btn>
                      </template>
                      <template v-slot:default="{ isActive }">
                        <v-container class="d-flex align-center flex-column">
                          <v-col lg="6">
                            <v-card>
                              <v-toolbar color="primary" title="แก้ไขข้อมูลประเภทผลิตภัณฑ์"></v-toolbar>
                              <v-card-text>
                                <div class="text-h2">
                                  <v-container class="d-flex align-center flex-column">
                                    <v-col cols="12">
                                      <v-text-field label="Legal middle name"
                                        hint="example of helper text only on focus" v-model="eName" :counter="50"
                                        :rules="nameRules"></v-text-field>
                                    </v-col>
                                  </v-container>
                                </div>
                              </v-card-text>
                              <v-card-actions class="justify-end">
                                <v-btn variant="text" @click="
  {
                                    (isActive.value = false),
  saveEditData(category_id);
                                  }
                                ">Save</v-btn>
                                <v-btn variant="text" @click="isActive.value = false">Close</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-col>
                        </v-container>
                      </template>
                    </v-dialog>
                    <v-btn @click="deleteData(category_id)" class="ma-2">
                      <v-icon color="red" icon="mdi-delete"></v-icon></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-window-item>

          <v-window-item value="two" class="my-9">
            <v-card class="mx-auto" prepend-icon="mdi-pencil-plus">
              <template v-slot:title> เพิ่มประเภทผลิตภัณฑ์ </template>

              <v-form v-model="form" @submit.prevent="onSubmit">
                <v-container>
                  <v-text-field v-model="name" :rules="nameRules" :readonly="loading" :counter="50"
                    label="ประเภทผลิตภัณฑ์" clearable required></v-text-field>
                  <v-row class="d-flex align-center flex-column ma-1 pa-1">
                    <v-col cols="12" md="4"><v-btn :disabled="!form" :loading="loading" block color="success"
                        size="large" type="submit" variant="elevated" rounded="pill">
                        เพิ่มข้อมูล
                      </v-btn></v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosClient from "@/utils/axios";

export default defineComponent({
  methods: {
    async getDessrts() {
      const { data } = await axiosClient.get('/category')
      this.desserts = data;
    },

    async deleteData(id: any) {
      if (confirm("You want to delete the data right?") === true) {
        await axiosClient.delete(`category/${id.toString()}`)

        await this.getDessrts()
      }
    },
    editData(name: any) {
      this.eName = name;
    },
    async saveEditData(_id: any) {
      await axiosClient.put(`/category/${_id}`, {
        name: this.eName
      })

      await this.getDessrts()
    },
    async onSubmit() {
      if (!this.form) return;

      this.loading = true;

      await axiosClient.post('/category', {
        name: this.name,
      })

      await this.getDessrts()

      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  },
  async mounted() {
    await this.getDessrts()
  },
  data: () => ({
    dialog: false,
    tab: "",
    desserts: [],
    name: "",
    eName: "",
    lastname: "",
    loading: false,
    form: false,
    nameRules: [
      (v: any) => !!v || "Name is required",
      (v: string | any[]) =>
        v.length <= 50 || "Name must be less than 50 characters",
    ],
    email: "",
    emailRules: [
      (v: any) => !!v || "E-mail is required",
      (v: string) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),
});
</script>
