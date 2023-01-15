<template>
  <v-container class="fill-height mr-10">
    <v-card>
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="one"><v-icon start> mdi-account-group </v-icon>กลุ่มวิสาหกิจชุมชน</v-tab>

        <v-tab value="two">
          <p class="custom_two" v-if="count_approved > 0">
            {{ count_approved }}
          </p>
          อนุมัติแล้ว
        </v-tab>

        <v-tab value="three">
          <p class="custom_three" v-if="commu_pending.length > 0">
            {{ commu_pending.length }}
          </p>
          รออนุมัติ
        </v-tab>

        <v-tab value="four">
          <v-icon start> mdi-account-plus </v-icon>เพิ่มวิสาหกิจชุมชน</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <v-table fixed-header height="80vh">
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">ชื่อกลุ่มวิสาหกิจชุมชน</th>
                  <th class="text-left">#</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(
                    {
                    name,
                    commu_id,
                    confirm_status,
                    address,
                    mobile,
                    regis_code,
                  },
                    index
                  ) in community" :key="commu_id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ name }}</td>
                  <td>
                    <div>
                      <SwitchToggle class="my-2" v-if="confirm_status == 1 || confirm_status == 2" :name="name"
                        :commu_id="commu_id" :confirm_status="confirm_status" :onCreated2="onCreated" />
                      <BTNDetail v-else-if="confirm_status == 0 || confirm_status == 3" class="my-2"
                        :commu_id="commu_id" :name="name" :address="address" :mobile="mobile" :regis_code="regis_code"
                        :comfirm_status="confirm_status" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-window-item>

          <v-window-item value="two">
            <v-table fixed-header height="80vh">
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">ชื่อกลุ่มวิสาหกิจชุมชน</th>
                  <th class="text-left">#</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(
                    { name, commu_id, confirm_status }, index
                  ) in commu_approved" :key="commu_id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ name }}</td>
                  <td>
                    <div>
                      <SwitchToggle class="my-2" v-if="confirm_status == 1 || confirm_status == 2" :name="name"
                        :commu_id="commu_id" :confirm_status="confirm_status" :onCreated2="onCreated" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-window-item>

          <v-window-item value="three">
            <v-alert v-if="commu_pending.length == 0" type="info">ไม่มีข้อมูลกลุ่มวิสาหกิจที่ต้องอนุมัติ</v-alert>
            <v-table v-else fixed-header height="80vh">
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">ชื่อกลุ่มวิสาหกิจชุมชน</th>
                  <th class="text-left">#</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(
                    {
                    name,
                    commu_id,
                    confirm_status,
                    address,
                    mobile,
                    regis_code,
                  },
                    index
                  ) in commu_pending" :key="commu_id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ name }}</td>
                  <td>
                    <div>
                      <BTNDetail class="my-2" :commu_id="commu_id" :name="name" :address="address" :mobile="mobile"
                        :regis_code="regis_code" :comfirm_status="confirm_status" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-window-item>

          <VWindowItemAPI_Page2 :val2="'four'" />
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosClient from "@/utils/axios";

import SwitchToggle from "@/components/Community/api/SwitchToggle.vue";
import BTNDetail from "@/components/Community/api/BTNDetail.vue";
import VWindowItemAPI_Page2 from "@/components/Community/api/v-window-itemAPI-Page2.vue";


export default defineComponent({
  components: {
    SwitchToggle,
    BTNDetail,
    VWindowItemAPI_Page2,
  },
  data: () => ({
    tab: "",
    count_approved: 0,
    community: [],
    commu_pending: [],
    commu_approved: [],
  }),
  async mounted() {
    this.onCreated();
  },
  methods: {
    async onCreated() {
      const { data } = await axiosClient.get('/commu')
      this.community = data;

      this.community.filter((item) => {
        let target_copy = Object.assign({}, item);
        if (
          target_copy["confirm_status"] == 1 ||
          target_copy["confirm_status"] == 2
        ) {
          this.count_approved++;
          this.commu_approved.push(target_copy);
        }
      });

      const result_pending = await axiosClient.get('/commu/pending-cf')
      this.commu_pending = result_pending.data;
    },
  },
});
</script>

<style>
.custom_two {
  margin-right: 4px;
  background-color: darkgreen;
  color: white;
  padding: 2px;
  font-size: 1px;
  border-radius: 50px;
}

.custom_three {
  margin-right: 4px;
  background-color: red;
  color: white;
  padding: 2px;
  font-size: 1px;
  border-radius: 50px;
}
</style>
