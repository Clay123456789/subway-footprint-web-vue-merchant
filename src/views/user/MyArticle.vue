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
  name: 'myArticles',
  data() {
    return ({
      id: '',
      tab: '',
      alist: [],
      rlist: [],
    })
  },
  mounted() {
    let that = this;
    this.tab = 'a'
    this.id = JSON.parse(sessionStorage.getItem('account_info')).id;
    this.loadListOfArticles();
    this.loadListOfResources();
  },
  methods: {
    listArticles() {
      this.tab = 'a';
    },
    listResources() {
      this.tab = 'r';
    },
    goresource(r_id) {
      // 这里要写一个带参数路由
      sessionStorage.setItem('resource', JSON.stringify({'r_id': r_id}))
      this.$router.replace({name: 'resource', params: {a_id: r_id}})
    },
    godetail(a_id) {
      // 这里要写一个带参数路由
      sessionStorage.setItem('article', JSON.stringify({'a_id': a_id}))
      this.$router.replace({name: 'article', params: {a_id: a_id}})
    },
    loadListOfResources() {
      let that = this;
      axios.post('http://localhost:5000/user/getResourceList', {
        id: that.id,
      }).then(function (response) {
        let list = JSON.parse(JSON.stringify(response.data.rlist));
        that.rlist = JSON.parse(list);
      })
    },
    loadListOfArticles() {
      let that = this;
      axios.post('http://localhost:5000/user/getArticleList', {
        id: that.id,
      }).then(function (response) {
        let list = JSON.parse(JSON.stringify(response.data.alist));
        that.alist = JSON.parse(list);
      })
    },
  }
}
</script>
