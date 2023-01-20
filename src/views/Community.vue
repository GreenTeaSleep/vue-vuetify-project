<template>
  <v-container class="fill-height mr-10">
    <v-card>
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab v-for="item in items" :key="item.tab" :value="item.tab">{{
          item.title
        }}</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item
            v-for="item in items"
            :key="item.tab"
            :value="item.tab"
          >
            <DataTableCommu v-if="item.tab == 'one'" />
            <CVtable
              v-else-if="item.tab != 'four' && item.tab != 'one'"
              :community="item.data"
              :tab="tab"
            />
            <AddCommunity v-else />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosClient from "@/utils/axios";

import CVtable from "@/components/Community/Table.vue";
import AddCommunity from "@/components/Community/AddCommunity.vue";
import DataTableCommu from "@/components/Community/DataTable.vue";

export default defineComponent({
  components: {
    CVtable,
    AddCommunity,
    DataTableCommu,
  },
  data: () => ({
    tab: null,
    items: [
      { tab: "one", title: "กลุ่มวิสาหกิจชุมชน", data: [] },
      { tab: "two", title: "อนุมัติแล้ว", data: [] },
      { tab: "three", title: "รออนุมัติ", data: [] },
      { tab: "four", title: "เพิ่มวิสาหกิจชุมชน", data: [] },
    ],
  }),
  async mounted() {
    this.items.filter(async (item, index) => {
      if (index == 0) {
        const result = await axiosClient.get(`/commu`);
        item.data = result.data;
      } else if (index == 1) {
        const result = await axiosClient.get(`/commu/confirmed`);
        item.data = result.data;
      } else {
        const result = await axiosClient.get(`/commu/pending-cf`);
        item.data = result.data;
      }
    });
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
