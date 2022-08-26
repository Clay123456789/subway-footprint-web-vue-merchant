<template>
  <v-row justify="center">
    <v-card width="800">
      <v-tabs>
        <v-tab @click="listArticles">Articles</v-tab>
        <v-tab @click="listResources">Resources</v-tab>
      </v-tabs>
      <v-container>
        <v-col>
          <v-list two-line v-if="tab==='a'">
            <v-container v-for="item in alist" :key="item.id" @change="ontimeupdate(this)">
              <v-list-item-content>
                <v-card @click="godetail(item.id)" color="shallow blue" style="padding: 20px" elevation="3">
                  <v-list-item-title style="font-family: Consolas" v-html="item.title"
                                     class="headline"></v-list-item-title>
                  <v-list-item-subtitle v-html="item.author_id"></v-list-item-subtitle>
                </v-card>
              </v-list-item-content>
            </v-container>
          </v-list>

          <v-list two-line v-else-if="tab==='r'">
            <v-container v-for="item in rlist" :key="item.id" @change="ontimeupdate(this)">
              <v-list-item-content>
                <v-card @click="goresource(item.id)" color="shallow blue" style="padding: 20px" elevation="3">
                  <v-list-item-title style="font-family: Consolas" v-html="item.title"
                                     class="headline"></v-list-item-title>
                  <v-list-item-subtitle v-html="item.info"></v-list-item-subtitle>
                </v-card>
              </v-list-item-content>
            </v-container>
          </v-list>
        </v-col>

      </v-container>
    </v-card>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "result",
  data() {
    return ({
      tosearch: '',
      tab:'',
      alist: [],
      rlist: []
    })
  },
  mounted() {
    this.tosearch = this.$route.params.tosearch;
    this.listArticles()
    this.getArticles()
    this.getResources()
  },

  methods: {

    listArticles() {
      this.tab = 'a';
    },
    listResources() {
      this.tab = 'r';
    },

    getArticles() {
      let that = this;
      axios.post('http://localhost:5000/user/search_a', {
        'tosearch': that.tosearch
      }).then(function (response) {
        let status = response.data.res;
        alert(status)
        if (status === 'success') {
          let list = JSON.parse(JSON.stringify(response.data.article));
          that.alist = JSON.parse(list);
        }
      }).catch(function (error) {
      })
    },
    getResources() {
      let that = this;
      axios.post('http://localhost:5000/user/search_r', {
        'tosearch': that.tosearch
      }).then(function (response) {
        let status = response.data.res;
        alert(status)
        if(status === 'success') {
          let list = JSON.parse(JSON.stringify(response.data.resource));
          that.rlist = JSON.parse(list);
        }
      }).catch(function (error){
      })
    },
  }

}
</script>

<style scoped>

</style>