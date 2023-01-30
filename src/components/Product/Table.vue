<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-container>
        <v-card>
            <v-data-table :search="search" :headers="headers" :items="desserts" item-value="name" class="elevation-1">
                <template v-slot:item.otop="{ item }">
                    <v-chip :color="getColor(item.raw.otop)">
                        {{ (item.raw.otop > 0) ? `โอทอป ${item.raw.otop} ${getStar(item.raw.otop)}` : "ปกติ" }}
                    </v-chip>
                </template>
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-card-text>
                            <v-text-field density="compact" v-model="search" variant="solo" label="ค้นหา"
                                append-inner-icon="mdi-magnify" single-line hide-details></v-text-field>
                        </v-card-text>
                        <!-- <v-spacer></v-spacer> -->
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ props }">
                                <v-btn class="ma-2" color="indigo" icon="mdi-filter-outline" v-bind="props"></v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">เลือกประเภทข้อมูลที่ต้องการ</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col sm="12" md="12">
                                                <v-radio-group v-model="radios">
                                                    <v-radio class="mb-3" value="default">
                                                        <template v-slot:label>
                                                            <div class="mr-3">ข้อมูลทั้งหมด</div>
                                                        </template>
                                                    </v-radio>
                                                    <v-radio class="mb-3" value="category">
                                                        <template v-slot:label>
                                                            <div class="mr-3">ประเภท</div>
                                                            <v-select density="compact"
                                                                v-model="selectedz.category.name"
                                                                :items="selectedz.category.item" item-value="id"
                                                                :rules="[selected]" hide-details></v-select>
                                                        </template>
                                                    </v-radio>
                                                    <v-radio class="mb-3" value="amp">
                                                        <template v-slot:label>
                                                            <div class="mr-3">อำเภอ</div>
                                                            <v-select density="compact" v-model="selectedz.amp.name"
                                                                :items="selectedz.amp.item" item-value="id"
                                                                :rules="[selected]" hide-details></v-select>
                                                        </template>
                                                    </v-radio>
                                                    <v-radio class="mb-3" value="levels">
                                                        <template v-slot:label>
                                                            <div class="mr-3">ระดับ</div>
                                                            <v-select density="compact" v-model="selectedz.levels.name"
                                                                :items="selectedz.levels.item" item-value="id"
                                                                :rules="[selected]" hide-details></v-select>
                                                        </template>
                                                    </v-radio>
                                                </v-radio-group>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text" @click="close">
                                        ปิด
                                    </v-btn>
                                    <v-btn color="blue-darken-1" variant="text" @click="save">
                                        บันทึก
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.details="{}">
                    <v-btn color="success">
                        รายละเอียด
                    </v-btn>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="getAllData">
                        รีเซ็ตข้อมูล
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
    <!-- {{ test('hi') }} -->
</template>

<script lang="ts">
import axiosClient from '@/utils/axios'

export default {
    data: () => ({
        rating: 3,
        selectedz: {
            category: {
                name: 'ประเภท',
                item: ['']
            },
            amp: {
                name: 'อำเภอ',
                item: ['']
            },
            levels: {
                name: 'ระดับ',
                item: ['ปกติ', '★', '★★', '★★★', '★★★★', '★★★★★']
            },
        },
        radios: 'default',
        search: '',
        dialog: false,
        headers: [
            {
                align: "start",
                key: "id",
                sortable: false,
                title: "ลำดับ",
            },
            { title: 'ชื่อ', key: 'name' },
            { title: 'ประเภท', key: 'category' },
            { title: 'อำเภอ', key: 'amp' },
            { title: 'ระดับ', key: 'otop' },
            { title: '', key: 'details', sortable: false },
        ],
        desserts: [],
        defaultDesserts: [],
        hiSelect: '',
        hiSelectStar: '',
    }),
    async mounted() {
        this.getAllData()
        this.selectedz.category.item.pop()
        this.selectedz.amp.item.pop()
    },
    methods: {
        selected(v: any) {

            // console.log(this.radios)

            if (["ปกติ", "★", "★★", "★★★", "★★★★", "★★★★★"].includes(v)) {
                this.radios = "levels"
                if (v == 'ปกติ') this.hiSelectStar = '0'
                else if (v == '★') this.hiSelectStar = '1'
                else if (v == '★★') this.hiSelectStar = '2'
                else if (v == '★★★') this.hiSelectStar = '3'
                else if (v == '★★★★') this.hiSelectStar = '4'
                else if (v == '★★★★★') this.hiSelectStar = '5'
                console.log(v)
            } else if (this.selectedz.amp.item.includes(v)) {
                this.radios = 'amp'
                this.hiSelect = v
            } else if (this.selectedz.category.item.includes(v)) {
                this.radios = 'category'
                this.hiSelect = v
            }
            return true
        },
        async getAllData() {
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
                this.selectedz.category.item.push(item.name)
            })
            const data3 = await axiosClient.get(
                "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json"
            )
            data3.data.filter(
                (item: { province_id: string; name_th: string; id: string }) => {
                    if (
                        item.province_id == "70" &&
                        item.name_th != "ท้องถิ่นเทศบาลตำบลสำนักขาม"
                    ) {
                        this.selectedz.amp.item.push(item.name_th)
                    }
                }
            )
        },
        close() {
            this.dialog = false
        },
        test(str: any) {
            console.log(str)
        },
        save() {
            this.search = ''
            this.desserts = this.defaultDesserts
            if (this.radios == 'default') {
                this.desserts = this.defaultDesserts
            } else if (this.radios == 'category' || this.radios == 'amp') {
                if (this.selectedz.category.name == 'ประเภท' && this.radios == 'category') return alert('โปรดเลือกประเภท')
                else if (this.selectedz.amp.name == 'อำเภอ' && this.radios == 'amp') return alert('โปรดเลือกอำเภอ')
                else {
                    this.search = this.hiSelect
                }
            } else if (this.radios == 'levels') {
                if (this.selectedz.levels.name == 'ระดับ' && this.radios == 'levels') return alert('โปรดเลือกระดับ')
                this.desserts = this.desserts.filter((el: any) => el.otop == this.hiSelectStar)
            }
            this.close()
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
        }
    }
}
</script>