<style>
.v-card-title i {
  font-size: 5rem;
}
</style>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex text-center fill-height">
      <v-row>
        <v-col sm="4">
          <v-card href="/community" color="#248aff" theme="dark" style="cursor: pointer;">
            <v-card-title class="mt-5">
              <v-row class="d-flex align-center">
                <v-col sm="6">
                  <v-icon icon="mdi-account-group" size="x-large"></v-icon>
                </v-col>
                <v-col sm="6">
                  <h1>20</h1>
                  <h4>กลุ่มวิสาหกิจชุมชน</h4>
                </v-col>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-actions class="justify-center my-2">
              <h3>ดูรายละเอียด</h3>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col sm="4">
          <v-card href="/category" color="#009149" theme="dark" style="cursor: pointer;">
            <v-card-title class="mt-5">
              <v-row class="d-flex align-center">
                <v-col sm="6">
                  <v-icon icon="mdi-file-document-outline" size="x-large"></v-icon>
                </v-col>
                <v-col sm="6">
                  <h1>20</h1>
                  <h4>ประเภทผลิตภัณฑ์</h4>
                </v-col>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-actions class="justify-center my-2">
              <h3>ดูรายละเอียด</h3>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col sm="4">
          <v-card href="/ReportProduct" color="#b5a900" theme="dark" style="cursor: pointer;">
            <v-card-title class="mt-5">
              <v-row class="d-flex align-center">
                <v-col sm="6">
                  <v-icon icon="mdi-cart-outline" size="x-large"></v-icon>
                </v-col>
                <v-col sm="6">
                  <h1>20</h1>
                  <h4>ผลิตภัณฑ์</h4>
                </v-col>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-actions class="justify-center my-2">
              <h3>ดูรายละเอียด</h3>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>


<script lang="ts">

export default {

  methods: {
    test() {
      alert('Hello')
    }
  }

}

</script>