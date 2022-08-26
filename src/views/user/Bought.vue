<template>
  <v-row justify="center">
    <v-card width="800">
      <v-tabs>
        <v-tab @click="listResources">Bought Resources : userid {{id}}</v-tab>
      </v-tabs>
      <v-container>
        <v-col>
            <v-container v-for="item in rlist" :key="item.id" @change="ontimeupdate(this)">
              <v-list-item-content>
                <v-card @click="goresource(item.id)" color="shallow blue" style="padding: 20px" elevation="3">
                  <v-list-item-title style="font-family: Consolas" v-html="item.title"
                                     class="headline"></v-list-item-title>
                  <v-list-item-subtitle v-html="item.info"></v-list-item-subtitle>
                </v-card>
              </v-list-item-content>
            </v-container>
        </v-col>

      </v-container>
    </v-card>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: 'myArticles',
  data() {
    return ({
      id: '',
      tab: '',
      rlist: [],
    })
  },
  mounted() {
    let that = this;
    this.tab = 'a'
    this.id = this.$route.query.id;
    this.loadListOfResources();
    alert(this.id);
  },
  methods: {
    listResources() {
      this.tab = 'r';
    },
    loadListOfResources() {
      let that = this;
      axios.post('http://localhost:5000/user/getboughtr', {
        id: that.id,
      }).then(function (response) {
        let list = JSON.parse(JSON.stringify(response.data.rlist));
        that.rlist = JSON.parse(list);
      })
    },
  }
}
</script>
