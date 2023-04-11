<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/valid-v-slot -->

<script setup lang="ts">
import TableSmall from './TableSmall.vue'
</script>

<template>
    <v-container>
        <v-card>
            <v-tabs v-model="tab" bg-color="primary" @click="toggle">
                <v-tab value="one">รายงานผลิตภัณฑ์</v-tab>
                <v-tab value="two">แยกตามประเภท</v-tab>
                <v-tab value="three">แยกตามอำเภอ</v-tab>
                <v-tab value="four">แยกระดับผลิตภัณฑ์</v-tab>
            </v-tabs>
            <v-window v-model="tab">
                <v-window-item value="one">
                    <v-card-text>
                        <v-text-field density="compact" v-model="search" variant="solo" label="ค้นหา"
                            append-inner-icon="mdi-magnify" single-line hide-details></v-text-field>
                    </v-card-text>
                    <TableSmall :search="search" :headers="headers" :desserts="desserts" :getStar="getStar"
                        :getColor="getColor" :get-all-data="getAllData" />
                </v-window-item>

                <v-window-item value="two">
                    <v-card-text>
                        <v-select density="compact" label="เลือกประเภท" :items="category.item" variant="solo"
                            :return-object="true" :rules="[selectType]" hide-details
                            prepend-inner-icon="mdi-file-document"></v-select>
                    </v-card-text>
                    <TableSmall :search="search" :headers="headers" :desserts="desserts" :getStar="getStar"
                        :getColor="getColor" :get-all-data="getAllData" />
                </v-window-item>

                <v-window-item value="three">
                    <v-card-text>
                        <v-select density="compact" label="เลือกอำเภอ" :items="amp.item" variant="solo"
                            :return-object="true" :rules="[selectAMP]" hide-details
                            prepend-inner-icon="mdi-map-marker"></v-select>
                    </v-card-text>
                    <TableSmall :search="search" :headers="headers" :desserts="desserts" :getStar="getStar"
                        :getColor="getColor" :get-all-data="getAllData" />
                </v-window-item>

                <v-window-item value="four">
                    <v-card-text>
                        <v-select density="compact" label="เลือกระดับผลิตภัณฑ์" :items="levels.item" variant="solo"
                            :return-object="true" :rules="[selectLevels]" hide-details
                            prepend-inner-icon="mdi-star"></v-select>
                    </v-card-text>
                    <TableSmall :search="search" :headers="headers" :desserts="desserts" :getStar="getStar"
                        :getColor="getColor" :get-all-data="getAllData" />
                </v-window-item>

            </v-window>

        </v-card>
    </v-container>
</template>

<script lang="ts">
import axiosClient from '@/utils/axios'
import { getAmphure } from '@/assets/functions/fetchAreaSongkhla.js'

export default {
    data: () => ({
        tab: null,
        category: { name: 'ประเภท', item: [''] },
        amp: { name: 'อำเภอ', item: [''] },
        levels: { name: 'ระดับ', item: ['ทั่วไป', 'OTOP 1 ดาว', 'OTOP 2 ดาว', 'OTOP 3 ดาว', 'OTOP 4 ดาว', 'OTOP 5 ดาว'] },
        search: '',
        headers: [
            { align: "start", key: "id", sortable: false, title: "ลำดับ", width: '50px' },
            { title: 'ชื่อ', key: 'name', width: '250px' },
            { title: 'ประเภท', key: 'category', width: '250px' },
            { title: 'อำเภอ', key: 'amp', width: '250px' },
            { title: 'ระดับ', key: 'otop', width: '250px' },
        ],
        desserts: [],
        defaultDesserts: [],
    }),
    async mounted() {
        this.getAllData()
        this.category.item.pop()
        this.amp.item.pop()
    },
    methods: {
        async getAllData() {
            this.desserts = []
            this.category.item = []
            this.search = ''
            const { data } = await axiosClient.get('/products/admin')
            this.desserts = data.map((item: any, id: any) => {
                return {
                    id: id + 1,
                    name: item.name,
                    category: item.category,
                    amp: item.amp,
                    otop: + item.otop,
                }
            })
            this.defaultDesserts = this.desserts
            const data2 = await axiosClient.get('/category')
            data2.data.map((item: any) => {
                this.category.item.push(item.name)
            })

            getAmphure().filter(item => {
                this.amp.item.push(item.name_th)
            })
        },
        getColor(calories: number) {
            if (calories > 1) return 'red'
            else return 'blue'
        },
        getStar(c: any) {
            if (c == 1) return '★'
            else if (c == 2) return '★ ★'
            else if (c == 3) return `★ ★ ★`
            else if (c == 4) return '★ ★ ★ ★'
            else if (c == 5) return '★ ★ ★ ★ ★'
        },
        selectAMP(v: any) {
            this.desserts = this.defaultDesserts.filter((dessert: any) => dessert.amp == v)
            return true
        },
        selectType(v: any) {
            this.desserts = this.defaultDesserts.filter((dessert: any) => dessert.category == v)
            return true
        },
        selectLevels(v: any) {
            this.desserts = this.defaultDesserts.filter((dessert: any) => dessert.otop == this.levels.item.indexOf(v))
            return true
        },
        toggle() {
            this.desserts = this.defaultDesserts
        }
    }
}
</script>