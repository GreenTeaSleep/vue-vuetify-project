<template>
  <v-container class="fill-height mr-10">
    <v-card>
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab v-for="item in items" :key="item.tab" :value="item.tab" :prepend-icon="item.icon">{{ item.title }}</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item v-for="item in items" :key="item.tab" :value="item.tab">
            <DataTableCommu v-if="item.tab == 'one'" />
            <CVtable v-else-if="item.tab != 'four' && item.tab != 'one' && item.tab != 'five'" :community="item.data"
              :tab="tab" />
            <AddCommunity v-else-if="item.tab == 'four'" />
            <Report v-else-if="item.tab == 'five'" />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import axiosClient from "@/utils/axios"

import CVtable from "@/components/Community/Table.vue"
import AddCommunity from "@/components/Community/AddCommunity.vue"
import DataTableCommu from "@/components/Community/DataTable.vue"
import Report from "@/components/Community/Report.vue"

export default defineComponent({
  components: {
    CVtable,
    AddCommunity,
    DataTableCommu,
    Report
  },
  data: () => ({
    tab: null,
    items: [
      {
        tab: "one",
        title: "กลุ่มวิสาหกิจชุมชน",
        icon: "mdi-account-group",
        data: [],
      },
      {
        tab: "two",
        title: "อนุมัติแล้ว",
        icon: "mdi-check-decagram",
        data: [],
      },
      {
        tab: "three",
        title: "รออนุมัติ",
        icon: "mdi-account-clock",
        data: [],
      },
      {
        tab: "four",
        title: "เพิ่มวิสาหกิจชุมชน",
        icon: "mdi-account-plus",
        data: [],
      },
      {
        tab: "five",
        title: "รายงานกลุ่มวิสาหกิจชุมชน",
        icon: "mdi-alert",
        data: [],
      },
    ],
  }),
  async mounted() {
    this.items.filter(async (item, index) => {
      if (index == 0) {
        const result = await axiosClient.get(`/commu`)
        item.data = result.data
      } else if (index == 1) {
        const result = await axiosClient.get(`/commu/confirmed`)
        item.data = result.data
      } else {
        const result = await axiosClient.get(`/commu/pending-cf`)
        item.data = result.data
      }
    })
  },
})
</script>

<style>
.mdi-check-decagram {
  color: greenyellow;
}

.mdi-account-clock {
  color: rgb(252, 100, 100);
}
</style>
