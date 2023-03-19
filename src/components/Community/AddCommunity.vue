<template>
  <v-container v-if="err">
    <v-alert type="error">{{ err }}</v-alert>
  </v-container>
  <v-container class="d-flex align-center">
    <v-row dense>
      <v-col cols="12" sm="12" md="6">
        <v-card width="90%" class="mx-auto" title="ข้อมูลผู้ใช้">
          <v-container>
            <v-text-field required v-model="username" color="primary" label="ชื่อผู้ใช้"
              variant="underlined"></v-text-field>

            <v-text-field v-model="password" color="primary" label="รหัสผ่าน" variant="underlined" type="password"
              @input="clearError"></v-text-field>

            <v-text-field v-model="cfPassword" color="primary" label="ยืนยันรหัสผ่าน" variant="underlined" type="password"
              @input="clearError"></v-text-field>

            <v-text-field v-model="full_name" color="primary" label="ชื่อเต็ม" variant="underlined"></v-text-field>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-card width="90%" class="mx-auto" title="ข้อมูลกลุ่มวิสาหกิจชุมชน">
          <v-container>
            <v-text-field v-model="name" color="primary" label="ชื่อวิสาหกิจชุมชน" variant="underlined"></v-text-field>

            <v-select v-model="selected_AMP" label="อำเภอ" :items="amp" variant="underlined" item-title="nameAMP"
              item-value="id" :return-object="true" :rules="[fetchAMP]"></v-select>

            <v-select v-model="selected_TAM" label="ตำบล" :items="tam" variant="underlined" item-title="nameTAM"
              item-value="id" :return-object="true" :rules="[fetchTAM]"></v-select>

            <v-text-field v-model="address" color="primary" label="ที่อยู่" variant="underlined"></v-text-field>

            <v-text-field v-model="mobile" color="primary" label="โทรศัพท์" variant="underlined"></v-text-field>

            <v-text-field v-model="regis_code" color="primary" label="รหัสทะเบียน" variant="underlined"></v-text-field>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container class="d-flex justify-end">
    <v-btn color="primary" @click="signUp"> เพิ่มข้อมูล </v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import axiosClient from "@/utils/axios"
import { getTambons, getAmphure } from '@/assets/functions/fetchAreaSongkhla.js'

export default defineComponent({
  props: ["val2"],
  data: () => ({
    username: "",
    password: "",
    cfPassword: "",
    full_name: "",
    name: "",
    address: "",
    selected_AMP: { id: "", nameAMP: "อำเภอ" },
    selected_TAM: { id: "", nameTAM: "ตำบล" },
    amp: [{ id: 0, nameAMP: "" }],
    tam: [{ id: 0, nameTAM: "" }],
    ampSelected: "",
    tamSelected: "",
    mobile: "",
    regis_code: "",

    err: "",
  }),
  methods: {
    async fetchAMP(v: any) {
      this.selected_TAM = { id: "", nameTAM: "ตำบล" }
      this.ampSelected = v.nameAMP
      this.tam = getTambons(v.id)
      return true
    },
    async fetchTAM(v: any) {
      this.tamSelected = v.nameTAM
      console.log({
        amp: this.ampSelected,
        tam: this.tamSelected,
      })
      return true
    },
    async signUp() {
      if (this.password != this.cfPassword) return (this.err = "รหัสผ่านไม่ตรงกัน")
      else if (this.tamSelected == 'ตำบล') return (this.err = "โปรดเลือกตำบล")

      const dataCommu = {
        username: this.username,
        password: this.password,
        full_name: this.full_name,

        name: this.name,
        address: this.address,
        mobile: this.mobile,
        regis_code: this.regis_code,
        amp: this.ampSelected,
        tam: this.tamSelected,
        confirm_status: 1,
      }
      const result = await axiosClient.post(`/auth/users-community`, dataCommu)
      console.log(result)
      this.$router.go(0)
    },
    clearError() {
      this.err = ""
    },
  },
  async mounted() {
    getAmphure().filter(item => {
      this.amp.push({
        id: item.id,
        nameAMP: item.name_th
      })
    })
    this.amp.shift()
    this.tam.shift()
  },
})
</script>
