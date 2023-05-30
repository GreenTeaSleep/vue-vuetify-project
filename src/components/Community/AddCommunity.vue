<template>
  <v-form @submit.prevent="signUp">
    <v-container v-if="err == '58'">
      <v-alert type="error">{{ err }}</v-alert>
    </v-container>
    <v-container class="d-flex align-center">
      <v-row dense>
        <v-col cols="12" sm="12" md="6">
          <v-card title="ข้อมูลผู้ใช้">
            <v-container>

              <v-text-field v-model="username" color="primary" label="ชื่อผู้ใช้ (จำเป็น)" variant="underlined"
                @input="clearError" :rules="rules" :counter="60" required></v-text-field>

              <v-text-field v-model="password" color="primary" label="รหัสผ่าน (จำเป็น)" variant="underlined"
                type="password" @input="clearError" :rules="rules" required></v-text-field>

              <v-text-field v-model="cfPassword" color="primary" label="ยืนยันรหัสผ่าน (จำเป็น)" variant="underlined"
                type="password" @input="clearError" :rules="rules" required></v-text-field>

              <v-text-field v-model="full_name" color="primary" label="ชื่อเต็ม (จำเป็น)" variant="underlined"
                @input="clearError" :rules="rules" :counter="100"></v-text-field>
              <v-text-field v-model="person" color="primary" label="ผู้มีอำนาจทำการแทน" @input="clearError"
                variant="underlined" :counter="100"></v-text-field>

            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-card title="ข้อมูลกลุ่มวิสาหกิจชุมชน">
            <v-container>
              <v-text-field v-model="name" color="primary" label="ชื่อวิสาหกิจชุมชน (จำเป็น)" variant="underlined"
                :rules="rules" :counter="100"></v-text-field>

              <v-select v-model="selected_AMP" label="อำเภอ (จำเป็น)" :items="amp" variant="underlined"
                item-title="nameAMP" item-value="id" :return-object="true" :rules="[fetchAMP]" required></v-select>

              <v-select v-model="selected_TAM" label="ตำบล (จำเป็น)" :items="tam" variant="underlined"
                item-title="nameTAM" item-value="id" :return-object="true" :rules="[fetchTAM]" required></v-select>

              <v-text-field v-model="address" color="primary" label="ที่อยู่ (จำเป็น)" variant="underlined" :rules="rules"
                :counter="200"></v-text-field>

              <!-- add @input="acceptNumberMobile" -->
              <v-text-field v-model="acceptMobile" color="primary" label="โทรศัพท์ (จำเป็น)" variant="underlined"
                :rules="rules" @input="acceptNumberMobile"></v-text-field>

              <v-text-field v-model="acceptRegisCode" color="primary" label="รหัสทะเบียน (จำเป็น)" variant="underlined"
                :rules="rules" @input="acceptNumberRegisCode"></v-text-field>
            </v-container>
          </v-card>

        </v-col>

      </v-row>
    </v-container>
    <v-container class="d-flex justify-end">
      <v-btn type="submit" color="primary"> เพิ่มข้อมูล </v-btn>
    </v-container>
  </v-form>
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
    person: "",
    name: "",
    address: "",
    selected_AMP: { id: "", nameAMP: "อำเภอ" },
    selected_TAM: { id: "", nameTAM: "ตำบล" },
    amp: [{ id: 0, nameAMP: "" }],
    tam: [{ id: 0, nameTAM: "" }],
    ampSelected: "",
    tamSelected: "",
    mobile: "",
    acceptMobile: "",
    regis_code: "",
    acceptRegisCode: "",

    err: "",
    rules: [
      (value: any) => {
        if (value) return true
        return ''
      },
    ],
  }),
  methods: {
    acceptNumberMobile() {
      let x: any = this.acceptMobile.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)

      this.acceptMobile = !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '')

      this.mobile = (this.acceptMobile).replace(/[^0-9.]+/g, "")
    },
    acceptNumberRegisCode() {
      let x: any = this.acceptRegisCode.replace(/\D/g, '').match(/(\d{0,1})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,1})(\d{0,4})/)
      this.acceptRegisCode = !x[1] ? x[2] : x[1] + '-' + x[2] + '-' + x[3] + '-' + x[4] + '/' + x[5] + (x[6] ? '-' + x[6] : '')

      this.regis_code = this.acceptRegisCode
      // console.log(this.regis_code)
    },
    async fetchAMP(v: any) {
      this.selected_TAM = { id: "", nameTAM: "ตำบล" }
      this.ampSelected = v.nameAMP
      this.tam = getTambons(v.id)
      if (v && this.selected_AMP.nameAMP != "อำเภอ") return true
      return ''
    },
    async fetchTAM(v: any) {
      this.tamSelected = v.nameTAM
      if (v && this.selected_TAM.nameTAM != "ตำบล") return true
      return ''
    },
    async signUp() {
      if (this.checkInput() == 0) {
        alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน')
        return this.err = 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน'
      }
      this.err = ''
      if (this.password != this.cfPassword) return (this.err = "รหัสผ่านไม่ตรงกัน")

      const dataCommu = {
        username: this.username,
        password: this.password,
        full_name: this.full_name,

        person: this.person,
        name: this.name,
        address: this.address,
        mobile: this.mobile,
        regis_code: this.regis_code,
        amp: this.ampSelected,
        tam: this.tamSelected,
        confirm_status: 1,
      }

      try {
        const result = await axiosClient.post(`/auth/users-community`, dataCommu)
        console.log(result)
        this.$router.go(0)
      } catch (error: any) {
        console.log(error.response.data)
        if (error.response.data.err == 'This commu already exists.') {
          alert('ผู้ชื่อวิสาหกิจชุมชนนี้มีอยู่แล้ว')
          return this.err = 'ผู้ชื่อวิสาหกิจชุมชนนี้มีอยู่แล้ว'
        }
        if (error.response.data.err == 'This user commu already exists.') {
          alert('ผู้ใช้นี้มีอยู่แล้ว')
          return this.err = 'ผู้ใช้นี้มีอยู่แล้ว'
        }
      }
    },
    clearError() {
      this.err = ""
    },
    checkInput() {
      let inputs = this.username && this.password && this.cfPassword && this.full_name && this.name && this.tam && (this.tamSelected != 'ตำบล') && this.amp && (this.ampSelected != 'อำเภอ') && this.address && this.acceptMobile && this.acceptRegisCode
      if (inputs) return 1
      return 0
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