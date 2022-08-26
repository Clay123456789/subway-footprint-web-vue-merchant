<template>
  <v-row justify="center">
    <v-card width="300">
      <v-col>
        <v-text-field label="title" v-model="title"></v-text-field>
        <v-text-field label="cost" v-model="cost"></v-text-field>
        <v-container>
          <v-checkbox v-model="selected" label="学习资料" value="study"></v-checkbox>
          <v-checkbox v-model="selected" label="代码" value="code"></v-checkbox>
          <v-checkbox v-model="selected" label="实用工具" value="tool"></v-checkbox>
        </v-container>
        <v-textarea v-model="desc" outlined></v-textarea>
        <v-file-input
            v-model="file"
            label="Click to Upload File"
            dense
        ></v-file-input>
        <v-row justify="end" style="padding: 12px">
          <v-btn @click="update" color="primary">upload</v-btn>
        </v-row>
      </v-col>
    </v-card>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: 'upload',
  data() {
    return ({
      id: '',
      title: '',
      file: null,
      cost: 0,
      selected: [],
      desc: '',
      filename:'',
    })
  },
  mounted() {
    this.id = JSON.parse(sessionStorage.getItem('account_info')).id;
  },
  methods: {
    record() {
      let info = {
        id: this.id,
        title: this.title,
        cost: this.cost,
        type: this.selected.toString(),
        desc: this.desc,
        filename: this.file.name,
      }
      console.log(info)
      axios.post('http://localhost:5000/user/record', info).then(response => {

      })

    },
    update() {
      let param = new FormData(); // 创建form对象
      param.append('file', this.file);// 通过append向form对象添加数据
      axios.post('http://localhost:5000/user/upload', param
          , {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},) //请求头要为表单
          .then(response => {
            console.log(response.data);
            this.record();
          })
          .catch(function (error) {
            console.log(error);
          })
    }
  }
}
</script>


<style scoped>

</style>
