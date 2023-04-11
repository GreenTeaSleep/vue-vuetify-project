<template>
    <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="desserts" item-value="name"
        class="elevation-1">
        <template v-slot:no-data>
            <h4 style="color: red; margin: 20px;">ไม่มีข้อมูล</h4>
        </template>
    </v-data-table>
</template>

<script lang="ts">

export default {

    props: [
        "headers",
        "desserts",
    ],

    data() {
        return {
            itemsPerPage: 10,
        }
    },

}

</script>