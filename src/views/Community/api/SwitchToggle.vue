<template v-slot:default="{ isActive }">
  <v-switch
    hide-details
    class="d-flex-inline switch-center"
    :color="'success'"
    :model-value="confirm_status == 1 ? true : false"
    @click="
      {
        changeStatus(commu_id, confirm_status), onCreated2;
      }
    "
  >
    <template v-slot:label>
      <v-dialog transition="dialog-top-transition">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" @click="editData(commu_id)">
            <v-icon color="green" icon="mdi-pencil-box"></v-icon
          ></v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar
              color="primary"
              title="แก้ไขข้อมูลกลุ่มวิสาหกิจชุมชน"
            ></v-toolbar>
            <v-container class="d-flex align-center flex-column">
              <v-col>
                <v-container v-if="err">
                  <v-alert type="error">{{ err }}</v-alert>
                </v-container>
                <v-card-text>
                  <v-container class="d-flex align-center">
                    <v-row dense>
                      <v-col cols="12" sm="12" md="6">
                        <v-card class="mx-auto" title="ข้อมูลผู้ใช้">
                          <v-container>
                            <v-text-field
                              v-model="username"
                              color="primary"
                              label="ชื่อผู้ใช้"
                              variant="underlined"
                              disabled
                            ></v-text-field>

                            <v-text-field
                              v-model="password"
                              color="primary"
                              label="รหัสผ่าน"
                              variant="underlined"
                              @input="checkPasswordMatch"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="show1 = !show1"
                              :type="show1 ? 'text' : 'password'"
                            ></v-text-field>

                            <v-text-field
                              v-model="cfPassword"
                              color="primary"
                              label="ยืนยันรหัสผ่าน"
                              variant="underlined"
                              @input="checkPasswordMatch"
                              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="show2 = !show2"
                              :type="show2 ? 'text' : 'password'"
                            ></v-text-field>

                            <v-text-field
                              v-model="full_name"
                              color="primary"
                              label="ชื่อเต็ม"
                              variant="underlined"
                            ></v-text-field>
                          </v-container>
                        </v-card>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <v-card
                          class="mx-auto"
                          title="ข้อมูลกลุ่มวิสาหกิจชุมชน"
                        >
                          <v-container>
                            <v-text-field
                              v-model="shop_name"
                              color="primary"
                              label="ชื่อวิสาหกิจชุมชน"
                              variant="underlined"
                            ></v-text-field>

                            <v-text-field
                              v-model="address"
                              color="primary"
                              label="ที่อยู่"
                              variant="underlined"
                            ></v-text-field>

                            <v-text-field
                              v-model="mobile"
                              color="primary"
                              label="โทรศัพท์"
                              variant="underlined"
                            ></v-text-field>

                            <v-text-field
                              v-model="regis_code"
                              color="primary"
                              label="รหัสทะเบียน"
                              variant="underlined"
                            ></v-text-field>
                          </v-container>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn variant="text" @click="isActive.value = false"
                    >ปิด</v-btn
                  >
                  <v-btn
                    variant="text"
                    color="success"
                    @click="
                      {
                        isActive.value = saveEditData(commu_id);
                      }
                    "
                    >บันทึก</v-btn
                  >
                </v-card-actions>
              </v-col>
            </v-container>
          </v-card>
        </template>
      </v-dialog>
    </template>
  </v-switch>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

const URL_API = "http://localhost:3001";

export default defineComponent({
  props: ["commu_id", "name", "confirm_status", "onCreated2"],
  data: () => ({
    username: "",
    password: "",
    cfPassword: "",
    err: "",
    full_name: "",
    shop_name: "",
    mobile: "",
    address: "",
    regis_code: "",

    show1: false,
    show2: false,
  }),
  methods: {
    checkPasswordMatch() {
      const result = this.password == this.cfPassword;
      if (!result && this.cfPassword != "") {
        this.err = "รหัสผ่านไม่ตรงกัน";
      } else {
        this.err = "";
      }
    },
    async changeStatus(id: any, confirm_status: any) {
      if (confirm_status == 1) {
        axios.put(`${URL_API}/api/commu/` + id, {
          confirm_status: 2,
        });
        this.$router.go(0);
      } else {
        axios.put(`${URL_API}/api/commu/` + id, {
          confirm_status: 1,
        });
        this.$router.go(0);
      }
    },
    async editData(_id: any) {
      const dataCommu = await axios.get(`${URL_API}/api/commu/${_id}`);
      const dataUserCommu = await axios.get(
        `${URL_API}/api/auth/users-community/edit/${_id}`
      );
      this.username = dataUserCommu.data.username;
      this.full_name = dataUserCommu.data.full_name;

      this.shop_name = dataCommu.data.name;
      this.mobile = dataCommu.data.mobile;
      this.address = dataCommu.data.address;
      this.regis_code = dataCommu.data.regis_code;
    },
    saveEditData(_id: any) {
      if (this.err) {
        return true;
      } else if (this.password != "" && this.cfPassword == "") {
        return true;
      } else if (this.password == "" && this.cfPassword == "") {
        this.saveData(_id);
        return false;
      }
    },
    async saveData(_id: any) {
      await axios.put(`${URL_API}/api/commu/` + _id, {
        name: this.shop_name,
        address: this.address,
        mobile: this.mobile,
        regis_code: this.regis_code,
      });
      await axios.put(`${URL_API}/api/auth/users-community/` + _id, {
        users_commu_id: _id,
        full_name: this.full_name,
        password: this.password,
      });
      this.$router.go(0);
    },
  },
});
</script>

<style>
.switch-center {
  display: flex;
  justify-content: left;
}
</style>
