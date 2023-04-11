<script setup lang="ts">
import Table from "@/components/ReportCommunity/Table.vue"
</script>

<template>
    <v-container>
        <v-card>
            <v-tabs v-model="tab" bg-color="primary" @click="toggle" touchless>
                <v-tab value="one">ทั้งหมด</v-tab>
                <v-tab value="two">แยกตามอำเภอ</v-tab>
                <v-tab value="three">อนุมัติแล้ว</v-tab>
                <v-tab value="four">ยังไม่อนุมัติ</v-tab>
            </v-tabs>

            <v-window v-model="tab">
                <v-window-item value="one">
                    <v-card-text>
                        <v-text-field density="compact" v-model="search" variant="solo" label="ค้นหา"
                            append-inner-icon="mdi-magnify" single-line hide-details></v-text-field>
                    </v-card-text>
                    <Table :desserts="desserts" :headers="headers" :search="search" />
                </v-window-item>

                <v-window-item value="two">
                    <v-card-text>
                        <v-select density="compact" label="เลือกอำเภอ" :items="amp.item" variant="solo"
                            :return-object="true" :rules="[selectAMP]" hide-details
                            prepend-inner-icon="mdi-map-marker"></v-select>
                    </v-card-text>
                    <Table :desserts="desserts" :headers="headers" :search="search" />
                </v-window-item>

                <v-window-item value="three">
                    <Table :desserts="desserts.filter(dessert => dessert.confirm_status >= 1 && dessert.confirm_status < 3)"
                        :headers="headers" />
                </v-window-item>

                <v-window-item value="four">
                    <Table :desserts="desserts.filter(dessert => dessert.confirm_status == 3)" :headers="headers" />
                </v-window-item>
            </v-window>
        </v-card>
    </v-container>
</template>
  
<script lang="ts">
import axiosClient from "@/utils/axios"
import { defineComponent } from "vue"
import { getAmphure } from '@/assets/functions/fetchAreaSongkhla.js'

export default defineComponent({
    props: [],
    components: {

    },
    data: () => ({
        search: '',
        tab: 'Home',
        radios: '1',
        ampToggle: false,
        amp: { name: 'อำเภอ', item: [''] },
        selected_AMP: { id: "", nameAMP: "อำเภอ" },
        ampSelected: "",
        itemsPerPage: 10,
        headers: [
            { title: 'ชื่อวิสาหกิจชุมชน', align: 'start', sortable: false, key: 'name', width: '300px' },
            { title: 'รหัสทะเบียน', align: 'start', key: 'regisCode', sortable: false, width: '200px' },
            { title: 'ที่ตั้ง', align: 'start', key: 'address', sortable: false, width: '300px' },
            { title: 'อำเภอ', align: 'start', key: 'amp', sortable: false, width: '120px' },
            { title: 'ตำบล', align: 'start', key: 'tam', sortable: false, width: '120px' },
            { title: 'โทรศัพท์', align: 'start', key: 'mobile', sortable: false, width: '150px' },
            { title: 'ผู้มีอำนาจทำการแทน', align: 'start', key: 'person', sortable: false, width: '250px' },
        ],
        desserts: [
            {
                name: '',
                regisCode: '',
                address: '',
                mobile: '',
                amp: '',
                tam: '',
                person: '',
                confirm_status: 0,
            },
        ],
        defaultDessert: [
            {
                name: '',
                regisCode: '',
                address: '',
                mobile: '',
                amp: '',
                tam: '',
                person: '',
                confirm_status: 0,
            },
        ],
    }),
    async mounted() {
        this.desserts.shift()
        const result = await axiosClient("/commu")
        const result_commu = await axiosClient('/auth/users-community')
        result.data.map((item: any) => {
            let txt = ''
            result_commu.data.map((item2: any) => {
                if (item.users_commu_id == item2.users_commu_id) {
                    if (item.person != '') return txt = `1.${item2.full_name} \n 2.${item.person}`
                    txt = `1.${item2.full_name}`
                }
            })
            item.regis_code = this.acceptNumberRegisCode(item.regis_code)
            item.mobile = this.acceptNumberMobile(item.mobile)
            this.desserts.push({
                name: item.name,
                regisCode: item.regis_code,
                address: item.address,
                mobile: item.mobile,
                amp: item.amp,
                tam: item.tam,
                person: txt,
                confirm_status: item.confirm_status,
            })
        })
        getAmphure().filter(item => {
            this.amp.item.push(item.name_th)
        })
        this.defaultDessert.shift()
        this.defaultDessert = this.desserts
        this.amp.item.shift()
    },
    methods: {
        acceptNumberMobile(acceptMobile: any) {
            let x: any = acceptMobile.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
            const ret = !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '')
            return ret
        },
        acceptNumberRegisCode(acceptRegisCode: any) {
            let x: any = acceptRegisCode.replace(/\D/g, '').match(/(\d{0,1})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,1})(\d{0,4})/)
            const ret = !x[1] ? x[2] : x[1] + '-' + x[2] + '-' + x[3] + '-' + x[4] + '/' + x[5] + (x[6] ? '-' + x[6] : '')

            return ret
        },
        async fetchAMP(v: any) {
            this.ampSelected = v.nameAMP
            console.log(this.ampSelected)
            this.desserts = this.defaultDessert
            this.desserts = this.desserts.filter(dessert => dessert.amp == this.ampSelected)
            return true
        },
        toggle() {
            this.desserts = this.defaultDessert
        },
        selectAMP(v: any) {
            this.desserts = this.defaultDessert.filter((dessert: any) => dessert.amp == v)
            return true
        },
    }
})
</script>

<style>
td {
    white-space: pre-line;
    word-break: break-all;
}

.v-table__wrapper {
    padding-bottom: 20px;
}
</style>