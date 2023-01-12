<template>
  <v-row justify="start">
    <v-col cols="auto">
      <v-dialog transition="dialog-bottom-transition">
        <template v-slot:activator="{ props }">
          <v-badge :content="comfirm_status == 0 ? 'รออนุมัติ' : 'ไม่อนุมัติ'"
            :color="comfirm_status == 0 ? 'red' : 'gray'">
            <v-btn color="info" v-bind="props"> รายละเอียด </v-btn>
          </v-badge>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card class="mx-auto">
            <v-toolbar color="primary" title="รายละเอียดวิสาหกิจชุมชน"></v-toolbar>
            <v-container>
              <v-card width="300" class="my-2">
                <v-alert variant="outlined">
                  <template v-slot:title> ชื่อวิสาหกิจชุมชน </template>

                  {{ name }}
                </v-alert>
              </v-card>
              <v-card width="300" class="my-2">
                <v-alert variant="outlined">
                  <template v-slot:title> ที่อยู่ </template>

                  {{ address }}
                </v-alert>
              </v-card>
              <v-card width="300" class="my-2">
                <v-alert variant="outlined">
                  <template v-slot:title> เบอร์โทร </template>

                  {{ mobile }}
                </v-alert>
              </v-card>
              <v-card width="300" class="my-2">
                <v-alert variant="outlined">
                  <template v-slot:title> รหัสทะเบียน </template>

                  {{ regis_code }}
                </v-alert>
              </v-card>
            </v-container>

            <v-card-actions class="justify-end">
              <v-btn variant="text" color="success" @click="
                {
                  isActive.value = disapproved(commu_id, 1);
                }
              ">อนุมัติ</v-btn>
              <v-btn variant="text" color="red" @click="
                {
                  isActive.value = disapproved(commu_id, 3);
                }
              ">ไม่อนุมัติ</v-btn>
              <v-btn variant="text" @click="isActive.value = false">ปิด</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

const URL_API = "https://4fde-2405-9800-b560-2254-71d2-445b-dfa4-ebca.ap.ngrok.io";

export default defineComponent({
  props: [
    "commu_id",
    "name",
    "address",
    "mobile",
    "regis_code",
    "comfirm_status",
  ],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    disapproved(id: any, status: any) {
      this.apprioved(id, status);
      console.log("test 100");
      return false;
    },
    async apprioved(id: any, status: any) {
      await axios.put(`${URL_API}/api/commu/${id}`, {
        confirm_status: status,
      });
      this.$router.go(0);
    },
  },
});
</script>
