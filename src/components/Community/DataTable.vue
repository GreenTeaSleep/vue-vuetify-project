<!-- <style>
tr {
  height: 64px;
}

tr:hover {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
}
</style> -->

<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container v-if="err">
    <v-alert class="mb-5" type="error">{{ err }}</v-alert>
    <v-btn color="primary" @click="initialize"> Reset </v-btn>
  </v-container>
  <v-card>
    <v-data-table :headers="headers" :items="desserts" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <v-card-text>
            <v-text-field v-model="search" density="compact" variant="solo" label="ค้นหา" append-inner-icon="mdi-magnify"
              single-line hide-details></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-select v-model="selected_AMP" density="compact" :items="amp" variant="solo" item-title="nameAMP"
              item-value="id" :return-object="true" :rules="[selectAMP]" hide-details
              prepend-inner-icon="mdi-map-marker"></v-select>
          </v-card-text>

          <v-dialog v-model="dialog" max-width="960px">
            <v-card>
              <v-toolbar color="primary" :title="'รายละเอียดวิสาหกิจชุมชน ' + editedItem.commu_id"></v-toolbar>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field v-model="editedItem.username" label="ชื่อผู้ใช้" disabled></v-text-field>
                      <v-text-field v-model="editedItem.password" @input="checkPasswordMatch"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1"
                        :type="show1 ? 'text' : 'password'" label="รหัสผ่าน"></v-text-field>
                      <v-text-field v-model="editedItem.cfPassword" @input="checkPasswordMatch"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show2 = !show2"
                        :type="show2 ? 'text' : 'password'" label="ยืนยันรหัสผ่าน"></v-text-field>
                      <v-text-field v-model="editedItem.full_name" label="ชื่อเต็ม"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="editedItem.name" label="ชื่อกลุ่มวิสาหกิจชุมชน"></v-text-field>
                      <v-text-field v-model="editedItem.address" label="ที่อยู่"></v-text-field>
                      <v-text-field v-model="editedItem.mobile" label="โทรศัพท์"></v-text-field>
                      <v-text-field v-model="editedItem.regis_code" label="รหัสทะเบียน"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save(editedItem.commu_id)">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <div v-if="item.raw.confirm_status > 0 && item.raw.confirm_status < 3">
          <v-switch :model-value="item.raw.confirm_status == 1 ? true : false"
            @click="changeStatus(item.raw.commu_id, item.raw.confirm_status)" class="d-inline-block" :color="'success'"
            hide-details>
            <template v-slot:label>
              <v-btn @click="editItem(item.raw)">
                <v-icon color="green" icon="mdi-pencil-box"></v-icon></v-btn>
            </template>
          </v-switch>
        </div>
        <div v-else>
          <BTNDetail :commu_id="item.raw.commu_id" :name="item.raw.name" :address="item.raw.address"
            :mobile="item.raw.mobile" :regis_code="item.raw.regis_code" :comfirm_status="item.raw.confirm_status" />
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import axiosClient from "@/utils/axios"
import BTNDetail from "./BTNDetail.vue"

export default {
  components: {
    BTNDetail,
  },
  data() {
    return {
      search: "",
      err: "",
      errPassword: "",
      show1: false,
      show2: false,
      amp: [{ id: "", nameAMP: "" }],
      selected_AMP: { id: "", nameAMP: "อำเภอ" },
      headers: [
        {
          align: "start",
          key: "id",
          sortable: false,
          title: "ลำดับ",
        },
        { key: "name", title: "ชื่อกลุ่มวิสาหกิจชุมชน", width: '250px' },
        { key: "amp", title: "อำเภอ" },
        { key: "tam", title: "ตำบล" },
        { key: "actions", title: "สถานะ / แก้ไข" },
      ],
      desserts: [
        {
          id: 0,
          name: "",
          person: '',
          amp: "",
          tam: "",
          commu_id: 0,
          confirm_status: 0,
          address: "",
          mobile: "",
          regis_code: "",
        },
      ],
      editedIndex: -1,
      editedItem: {
        commu_id: 0,
        username: "",
        password: "",
        cfPassword: "",
        full_name: "",
        name: "",
        address: "",
        mobile: "",
        regis_code: "",
      },
      dialog: false,
    }
  },
  mounted() {
    this.initialize()
    this.fetchAMP()
  },
  methods: {
    async changeStatus(id: any, confirm_status: any) {
      if (confirm_status == 1) {
        await axiosClient.put(`/commu/` + id, {
          confirm_status: 2,
        })
        this.initialize()
      } else {
        await axiosClient.put(`/commu/` + id, {
          confirm_status: 1,
        })
        this.initialize()
      }
    },
    async initialize() {
      try {
        this.desserts = [
          {
            id: 0,
            name: "",
            person: "",
            amp: "",
            tam: "",
            commu_id: 0,
            confirm_status: 0,
            address: "",
            mobile: "",
            regis_code: "",
          },
        ]
        this.desserts.shift()
        const result = await axiosClient("/commu")
        result.data.filter(async (item: any, index: any) => {
          this.desserts.push({
            id: index + 1,
            name: item.name,
            person: item.person,
            amp: item.amp,
            tam: item.tam,
            commu_id: item.commu_id,
            confirm_status: item.confirm_status,
            address: item.address,
            mobile: item.mobile,
            regis_code: item.regis_code,
          })
        })
        this.err = ""
      } catch (err: any) {
        console.log("ERROR:")
        this.err =
          err.message == "Network Error"
            ? "ข้อผิดพลาดของเครือข่าย"
            : "ข้อผิดพลาด"
        console.log(err)
      }
    },
    async editItem(item: { commu_id: number }) {
      const dataCommu = await axiosClient.get(`/commu/${item.commu_id}`)
      const dataUserCommu = await axiosClient.get(
        `/auth/users-community/edit/${item.commu_id}`
      )
      this.editedItem = Object.assign({
        commu_id: item.commu_id,
        username: dataUserCommu.data.username,
        password: "",
        cfPassword: "",
        full_name: dataUserCommu.data.full_name,
        name: dataCommu.data.name,
        address: dataCommu.data.address,
        mobile: dataCommu.data.mobile,
        regis_code: dataCommu.data.regis_code,
      })
      this.dialog = true
    },
    close() {
      this.dialog = false
    },
    save(commu_id: any) {
      if (this.errPassword) {
        alert(this.errPassword)
      } else if (
        this.editedItem.password != "" &&
        this.editedItem.cfPassword == ""
      ) {
        this.close()
      } else if (this.editedItem.password == this.editedItem.cfPassword) {
        this.saveData(commu_id)
        this.close()
      }
    },
    async saveData(_id: any) {
      await axiosClient.put(`/commu/` + _id, {
        name: this.editedItem.name,
        address: this.editedItem.address,
        mobile: this.editedItem.mobile,
        regis_code: this.editedItem.regis_code,
      })
      await axiosClient.put(`/auth/users-community/` + _id, {
        users_commu_id: _id,
        full_name: this.editedItem.full_name,
        password: this.editedItem.password,
      })
      this.initialize()
    },
    selectAMP(v: any) {
      this.search = v.nameAMP
      return true
    },
    checkPasswordMatch() {
      const result = this.editedItem.password == this.editedItem.cfPassword
      if (!result && this.editedItem.cfPassword != "") {
        this.errPassword = "รหัสผ่านไม่ตรงกัน"
      } else {
        this.errPassword = ""
      }
    },
    async fetchAMP() {
      const result = await axiosClient.get(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json"
      )
      let data = result.data
      data.filter(
        (item: { province_id: string; name_th: string; id: string }) => {
          if (
            item.province_id == "70" &&
            item.name_th != "ท้องถิ่นเทศบาลตำบลสำนักขาม"
          ) {
            this.amp.push({
              id: item.id,
              nameAMP: item.name_th,
            })
          }
        }
      )
      this.amp.shift()
    },
  },
}
</script>

