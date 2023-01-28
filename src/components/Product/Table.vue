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
                            <v-text-field v-model="search" density="compact" variant="solo" label="ค้นหา"
                                append-inner-icon="mdi-magnify" single-line hide-details></v-text-field>
                        </v-card-text>
                        <!-- <v-spacer></v-spacer> -->
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ props }">
                                <v-btn class="ma-2" color="indigo" icon="mdi-filter-outline" v-bind="props"></v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">Title</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <!-- <v-col sm="12" md="12">
                                                <v-select v-model="selected_AMP" density="compact" :items="amp"
                                                    variant="solo" item-title="nameAMP" item-value="id"
                                                    :return-object="true" :rules="[selectAMP]" hide-details
                                                    prepend-inner-icon="mdi-map-marker"></v-select>
                                            </v-col> -->
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text" @click="close">
                                        Cancel
                                    </v-btn>
                                    <v-btn color="blue-darken-1" variant="text" @click="save">
                                        Save
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
                    <v-btn color="primary">
                        Reset
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import axiosClient from '@/utils/axios'

export default {
    data: () => ({
        amp: ["love", "loe2", "love", "loe2", "love", "loe2", "love", "loe2", "love", "loe2", "love", "loe2", "love", "loe2", "love", "loe2", "love", "loe2", "love", "loe2"],
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
            { title: '', key: 'details' },
        ],
        desserts: [
            {
                name: 'Frozen Yogurt',
                category: 159,
                amp: 6.0,
                otop: 24,
            },
        ],
    }),
    async mounted() {
        const { data } = await axiosClient.get('/products/admin')
        this.desserts = data.map((item: any, id: any) => {
            if (item.otop < 1) {
                return {
                    id: id + 1,
                    name: item.name,
                    category: item.category,
                    amp: item.amp,
                    otop: + item.otop,
                }
            }
            else {
                return {
                    id: id + 1,
                    name: item.name,
                    category: item.category,
                    amp: item.amp,
                    otop: item.otop,
                    details: 'OTOP: ' + item.otop,
                }
            }
        })
        console.log(this.desserts)

    },
    methods: {
        close() {
            this.dialog = false
        },
        save() {
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