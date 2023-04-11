<template v-slot:top>
    <v-toolbar flat>
        <v-card-text>
            <v-text-field density="compact" v-model="search" variant="solo" label="ค้นหา" append-inner-icon="mdi-magnify"
                single-line hide-details></v-text-field>
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
                                            <v-select density="compact" v-model="selectedz.category.name"
                                                :items="selectedz.category.item" :rules="[selected]"
                                                hide-details></v-select>
                                        </template>
                                    </v-radio>
                                    <v-radio class="mb-3" value="amp">
                                        <template v-slot:label>
                                            <div class="mr-3">อำเภอ</div>
                                            <v-select density="compact" v-model="selectedz.amp.name"
                                                :items="selectedz.amp.item" :rules="[selected]" hide-details></v-select>
                                        </template>
                                    </v-radio>
                                    <v-radio class="mb-3" value="levels">
                                        <template v-slot:label>
                                            <div class="mr-3">ระดับ</div>
                                            <v-select density="compact" v-model="selectedz.levels.name"
                                                :items="selectedz.levels.item" :rules="[selected]" hide-details></v-select>
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

<v-card-text>
    <div style="background-color: #D8D8D8; padding: 0 20px;padding-top: 10px; border-radius: 8px;">
        <v-select v-model="selected_AMP" label="อำเภอ (จำเป็น)" :items="amp" variant="underlined"
            item-title="nameAMP" item-value="id" :return-object="true" :rules="[fetchAMP]"
            required></v-select>
    </div>
</v-card-text>