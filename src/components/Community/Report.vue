<template>
    <v-radio-group v-model="radios" @change="changed" inline>
        <v-radio label="วิสาหกิจชุมชนทั้งหมด" value="1"></v-radio>
        <v-radio label="วิสาหกิจชุมชนแยกตามอำเภอ" value="2"></v-radio>
        <v-radio label="วิสาหกิจชุมชนที่อนุมัติแล้ว" value="3"></v-radio>
        <v-radio label="วิสาหกิจชุมชนที่ยังไม่อนุมัติ" value="4"></v-radio>
    </v-radio-group>
    <v-select v-if="ampToggle" variant="solo" :rules="[selected]" label="เลือกอำเภอ" :items="amp" item-value="nameAMP"
        item-title="nameAMP"></v-select>
    <v-data-table no-data-text="hi" v-model:items-per-page="itemsPerPage" :headers="headers" :items="desserts"
        item-value="name" class="elevation-1">
        <template v-slot:no-data>
            ไม่มีข้อมูล
        </template>
    </v-data-table>
</template>
  
<script lang="ts">
import axiosClient from "@/utils/axios"
import { defineComponent } from "vue"
import { getTambons, getAmphure } from '@/assets/functions/fetchAreaSongkhla.js'

export default defineComponent({
    props: [],
    components: {

    },
    data: () => ({
        radios: '1',
        ampToggle: false,
        amp: [{ id: 0, nameAMP: "" }],
        itemsPerPage: 10,
        headers: [
            {
                title: 'ชื่อวิสาหกิจชุมชน',
                align: 'start',
                sortable: false,
                key: 'name',
            },
            { title: 'รหัสทะเบียน', align: 'start', key: 'regisCode', sortable: false, },
            { title: 'ที่ตั้ง', align: 'start', key: 'address', sortable: false, },
            { title: 'อำเภอ', align: 'start', key: 'amp', sortable: false, },
            { title: 'ตำบล', align: 'start', key: 'tam', sortable: false, },
            { title: 'โทรศัพท์', align: 'start', key: 'mobile', sortable: false, },
            { title: 'ผู้มีอำนาจทำการแทน', align: 'start', key: 'person', sortable: false, },
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
        ]
    }),
    async mounted() {
        this.desserts.shift()
        const result = await axiosClient("/commu")
        result.data.map((item: any, index: any) => {
            let txt = item.person
            if (txt != null) {
                txt = txt.slice(0, txt.indexOf("2")) + '\n' + txt.slice(txt.indexOf("2"))
            }

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
            this.amp.push({
                id: item.id,
                nameAMP: item.name_th
            })
        })
        this.defaultDessert = this.desserts
        this.amp.shift()
        this.defaultDessert.shift()
    },
    methods: {
        changed(e: any) {
            let val = e.target.value
            this.desserts = []
            if (val == 2) {
                this.ampToggle = true
            } else if (val == 3) {
                this.ampToggle = false
                this.defaultDessert.map(item => {
                    if (item.confirm_status > 0) {
                        this.desserts.push(item)
                    }
                })
            } else if (val == 4) {
                this.defaultDessert.map(item => {
                    if (item.confirm_status == 0) {
                        this.desserts.push(item)
                    }
                })
                this.ampToggle = false
            } else {
                this.ampToggle = false
                this.desserts = this.defaultDessert
            }
        },
        selected(v: any) {
            console.log(v)
            this.desserts = []
            if (v != '') {
                this.defaultDessert.map(item => {
                    (item.amp == v) ? this.desserts.push(item) : console.log('hi')
                })
            }
            return true
        }
    }
})
</script>

<style>
td {
    white-space: pre-line;
    word-break: break-all;
}
</style>