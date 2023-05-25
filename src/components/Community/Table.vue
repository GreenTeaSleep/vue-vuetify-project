<template>
  <v-table fixed-header height="80vh">
    <thead>
      <tr>
        <th class="text-left">ลำดับ</th>
        <th class="text-left">ชื่อกลุ่มวิสาหกิจชุมชน</th>
        <th class="text-left"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(
                    { name, commu_id, confirm_status, address, mobile, regis_code }, index
                  ) in community" :key="commu_id">
        <td>{{ index + 1 }}</td>
        <td>{{ name }}</td>
        <td>
          <div>
            <SwitchToggle class="my-2" v-if="confirm_status == 1 || confirm_status == 2" :name="name" :commu_id="commu_id"
              :confirm_status="confirm_status" />
            <BTNDetail v-else-if="confirm_status == 0 || confirm_status == 3" class="my-2" :commu_id="commu_id"
              :name="name" :address="address" :mobile="mobile" :regis_code="regis_code"
              :comfirm_status="confirm_status" />
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import SwitchToggle from "./SwitchToggle.vue"
import BTNDetail from "./BTNDetail.vue"

export default defineComponent({
  props: ["community", "tab"],
  components: {
    SwitchToggle,
    BTNDetail,
  },
  data: () => ({}),
  mounted() { },
})
</script>
