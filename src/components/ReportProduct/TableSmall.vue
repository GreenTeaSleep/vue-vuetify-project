<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-data-table :search="search" :headers="headers" :items="desserts" item-value="name" class="elevation-1">
        <template v-slot:item.otop="{ item }">
            <v-chip :color="getColor(item.raw.otop)">
                {{ (item.raw.otop > 0) ? `OTOP ${item.raw.otop} ดาว` : "ทั่วไป" }}
            </v-chip>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="getAllData">
                รีเซ็ตข้อมูล
            </v-btn>
        </template>
    </v-data-table>
</template>

<script lang="ts">

export default {
    props: [
        "search",
        "headers",
        "desserts",
        "getStar",
        "getColor",
        "getAllData"
    ]
}

</script>