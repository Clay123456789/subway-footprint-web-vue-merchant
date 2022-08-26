<template>
  <v-col>

    <v-container>
      <v-btn @click="addFavor">favor</v-btn>
      <v-card style="padding: 20px">
        <div>
          <mavon-editor :ishljs="true" style="padding: 20px" v-html="html"></mavon-editor>
        </div>
      </v-card>
    </v-container>
  </v-col>
</template>
<script>
import axios from "axios";
import "mavon-editor/dist/css/index.css";

export default {
  name: 'article',
  data() {
    return ({
      id: '',
      a_id: '',
      author_id: '',
      html: '',
      content: '',
    })
  },
  mounted() {
    this.id = JSON.parse(sessionStorage.getItem('account_info')).id;
    this.a_id = this.$route.params.a_id;
    if (!this.a_id)
      this.a_id = JSON.parse(sessionStorage.getItem('article')).a_id;
    this.getArticle();
  },
  methods: {
    addFavor() {
      let that = this;
      axios.post('http://localhost:5000/user/addFavorArticle', {
        id: that.id,
        a_id: that.a_id,
      }).then(function (response) {
        alert('Add to favor successfully!')
      })
    },
    getArticle() {
      let that = this;
      axios.post('http://localhost:5000/user/article', {
        a_id: that.a_id,
      }).then(function (response) {
        console.log(response);
        that.html = response.data.article.html;
        that.author_id = response.data.article.author_id;
        that.content = response.data.article.content;
      })
    }
  }
}
</script>
