<template>
  <v-container>
    <v-btn @click="addFavor">favor</v-btn>
    <v-btn @click="download">download</v-btn>
    <v-card>
      <v-card-title>
        <v-col>
          <v-text-field v-model="title" disabled>
          </v-text-field>
          <v-text-field v-model="type" disabled>
          </v-text-field>
          <v-text-field v-model="info" disabled>
          </v-text-field>
          <v-text-field v-model="cost" disabled>
          </v-text-field>
          <v-text-field v-model="filename" disabled>
          </v-text-field>
        </v-col>
      </v-card-title>

    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: 'resource',
  data() {
    return ({
      id: '',
      r_id: '',
      title: '',
      type: '',
      info: '',
      cost: '',
      filename: '',
    })
  },
  mounted() {
    this.id = JSON.parse(sessionStorage.getItem('account_info')).id;
    this.r_id = this.$route.params.r_id;
    if (!this.r_id)
      this.r_id = JSON.parse(sessionStorage.getItem('resource')).r_id;
    this.getResource();
  },
  methods: {
    download() {
      let that = this;
      axios.post('http://localhost:5000/user/download', {
        id: that.id,
        r_id: that.r_id,
        filename: that.filename,
        cost: that.cost,
      },{responseType:'blob'}).then(function (response) {
        let blob = response.data
        let binaryData=[];
        binaryData.push(blob);
        let objectUrl = URL.createObjectURL(new Blob(binaryData));
        let a = document.createElement('a');
        a.href = objectUrl;
        a.download = that.filename;
        a.click();
      })
    },
    addFavor() {
      let that = this;
      axios.post('http://localhost:5000/user/addFavorResource', {
        id: that.id,
        r_id: that.r_id,
      }).then(function (response) {
        alert('Add to favor successfully!')
      })
    },
    getResource() {
      let that = this;
      axios.post('http://localhost:5000/user/resource', {
        r_id: that.r_id,
      }).then(function (response) {
        console.log(response);
        that.title = response.data.resource.title
        that.type = response.data.resource.title
        that.info = response.data.resource.info
        that.cost = response.data.resource.cost
        that.filename = response.data.resource.path
      })
    }
  }
}
</script>
