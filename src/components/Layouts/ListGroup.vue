<template>
    <v-list-group value="Users">
        <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-alert" title="รายงาน">
            </v-list-item>
        </template>

        <v-list-item @click="toggle2(path)" :to="path" v-for="([title, , path], i) in admins" :key="i" :title="title"
            :value="title">
        </v-list-item>
    </v-list-group>
</template>

<script lang="ts">
export default {
    props: ["drawer", "open2", "toggle2"],
    data: () => ({
        admins: [
            ['รายงานกลุ่มวิสาหกิจชุมชน', 'mdi-account-multiple-outline', '/ReportCommunity'],
            ['รายงานผลิตภัณฑ์', 'mdi-cog-outline', '/ReportProduct'],
        ],
    }),
}
</script>