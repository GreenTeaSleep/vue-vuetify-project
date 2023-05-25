<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container class="fill-height">
    <v-card>
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab prepend-icon="mdi-file-document-outline" value="one">ประเภทผลิตภัณฑ์</v-tab>
        <v-tab prepend-icon="mdi-file-document-plus-outline" value="two">เพิ่มประเภทผลิตภัณฑ์</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">

          <v-window-item value="one">
            <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="desserts" item-value="name"
              :search="search" class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-card-text>
                    <v-text-field v-model="search" density="compact" variant="solo" label="ค้นหา"
                      append-inner-icon="mdi-magnify" single-line hide-details></v-text-field>
                  </v-card-text>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-dialog transition="dialog-top-transition">
                  <template v-slot:activator="{ props }">
                    <v-btn class="ma-2" @click="editData(item.raw.name)" v-bind="props">
                      <v-icon color="green" icon="mdi-pencil-box"></v-icon></v-btn>
                  </template>
                  <template v-slot:default="{ isActive }">
                    <v-container class="d-flex align-center flex-column">
                      <v-col lg="6">
                        <v-card>
                          <v-toolbar color="primary" title="แก้ไขข้อมูลประเภทผลิตภัณฑ์"></v-toolbar>
                          <v-form v-model="form">
                            <v-card-text>
                              <div class="text-h2">
                                <v-container class="d-flex align-center flex-column">
                                  <v-col cols="12">
                                    <v-text-field label="ประเภทผลิตภัณฑ์" hint="อักษรไม่เกิน 50 ตัว" v-model="eName"
                                      :counter="50" :rules="nameRules"></v-text-field>
                                  </v-col>
                                </v-container>
                              </div>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                              <v-btn variant="text" :disabled="!form"
                                @click="(isActive.value = false), saveEditData(item.raw.category_id)">
                                บันทึก
                              </v-btn>
                              <v-btn variant="text" @click="isActive.value = false">ปิด</v-btn>
                            </v-card-actions>
                          </v-form>
                        </v-card>
                      </v-col>
                    </v-container>
                  </template>
                </v-dialog>
                <v-btn @click="deleteData(item.raw.category_id, item.raw.name)" class="ma-2">
                  <v-icon color="red" icon="mdi-delete"></v-icon>
                </v-btn>
              </template></v-data-table>
          </v-window-item>

          <v-window-item value="two">
            <v-card class="mx-auto" prepend-icon="mdi-pencil-plus">
              <template v-slot:title> เพิ่มประเภทผลิตภัณฑ์ </template>

              <v-form v-model="form" @submit.prevent="onSubmit">
                <v-container>
                  <v-text-field v-model="name" :rules="nameRules" :readonly="loading" :counter="50"
                    label="ประเภทผลิตภัณฑ์" clearable required></v-text-field>
                  <v-row class="d-flex align-center flex-column ma-1 pa-1">
                    <v-col cols="12" md="4">
                      <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit"
                        variant="elevated" rounded="pill">
                        เพิ่มข้อมูล
                      </v-btn>
                    </v-col>
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
import { defineComponent } from "vue"
import axiosClient from "@/utils/axios"

export default defineComponent({
  data: () => ({
    search: '',
    itemsPerPage: 10,
    dialog: false,
    tab: "",
    headers: [
      {
        title: 'ลำดับ',
        align: 'start',
        sortable: true,
        key: 'index',
      },
      { title: 'ชื่อประเภท', align: 'start', key: 'name' },
      { title: '', align: 'start', key: 'actions', sortable: false },
    ],
    desserts: [{ index: 0, category_id: 0, name: '' }],
    name: "",
    eName: "",
    lastname: "",
    loading: false,
    form: false,
    nameRules: [
      (v: any) => !!v || "ต้องระบุประเภทผลิตภัณฑ์",
      (v: string | any[]) =>
        v.length <= 50 || "ชื่อต้องมีความยาวน้อยกว่า 50 อักขระ",
    ],
  }),
  methods: {

    async getDessrts() {
      this.desserts = [{ index: 0, category_id: 0, name: '' }]
      this.desserts.shift()
      const { data } = await axiosClient.get("/category")
      data.filter(async (item: any, index: any) => {
        this.desserts.push({
          index: index + 1,
          category_id: item.category_id,
          name: item.name
        })
      })
    },

    async deleteData(id: any, name: any) {
      if (confirm(`คุณต้องการลบข้อมูล "${name}" ใช่ไหม`) === true) {
        let res = await axiosClient.get(`/products`)
        let resCategory = await axiosClient.get(`/category/${id.toString()}`)
        let cData = 0
        res.data.map((e: any) => {
          if (resCategory.data.category_id == e.category_id) {
            cData = 1
          }
        })
        if (cData == 0) {
          alert('ลบประเภทข้อมูลเรียบร้อยแล้ว');
          (async () => {
            await axiosClient.delete(`/category/${id.toString()}`)
            await this.getDessrts()
          })()
        } else {
          alert('ไม่สามารถลบได้: มีข้อมูลสินค้าที่ใช้ประเภทนี้อยู่.')
        }
      }
    },
    editData(name: any) {
      this.eName = name
    },
    async saveEditData(_id: any) {
      try {
        await axiosClient.put(`/category/${_id}`, {
          name: this.eName,
        })
        await this.getDessrts()
      } catch (error: any) {
        console.log(error.response.data)
        alert('ไม่สามารถแก้ไขได้ ชื่อประเภทนี้มีอยู่แล้ว')
      }
    },
    async onSubmit() {
      if (!this.form) return

      this.loading = true

      try {
        await axiosClient.post("/category", {
          name: this.name,
        })
        await this.getDessrts()

        setTimeout(() => {
          alert('เพิ่มข้อมูลประเภทสำเร็จ')
          this.loading = false
          this.tab = "one"
        }, 1000)

      } catch (error: any) {
        console.log(error.response.data)
        alert('ชื่อประเภทนี้มีอยู่แล้ว')
        this.loading = false
      }
    },
  },
  async mounted() {
    this.desserts.shift()
    await this.getDessrts()
  },

})
</script>
