<template>
  <v-container style="padding: 30px">
    <v-row justify="center">
      <v-card width="700" v-scroll>
        <v-text-field v-model="title" style="padding:20px" placeholder="please input title"></v-text-field>
        <v-text-field v-model="type" style="padding:20px" placeholder="这里选类别和标签"></v-text-field>
        <mavon-editor :ishljs="true" v-model="content" ref=md @save="save" @imgAdd="imgAdd"/>
        <v-container>
          <v-row justify="end" style="padding: 20px">
            <v-btn
                @click="submit"
            >post
            </v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
  
</template>

<script>
import axios from "axios";
import "mavon-editor/dist/css/index.css"

export default {
  data() {
    return {
      id: '',
      title: '',
      type: '',
      content: '',
      html: '',
    }
  },
  mounted() {
    this.id = JSON.parse(sessionStorage.getItem('account_info')).id;
  },
  methods: {
    submit() {
      this.savemd();

      this.$router.replace('/user/articles');
    },
    //保存md到后台
    savemd() {
      let that = this;
      axios.post('http://localhost:5000/user/savemd', {
        id: that.id,
        title: that.title,
        type: that.type,
        content: that.content,
        html: that.$refs.md.d_render
      })
          .then(function (response) {
            that.html = that.$refs.md.d_render;
            console.log(response);
            let message = response.data.coin_res;
            alert(message)

          })
          .catch(function (error) {
            console.log(error);
          });
    },

    //保存图片到后台
    imgAdd(pos, $file) {
      let _this = this;
      // 第一步.将图片上传到服务器.
      let formdata = new FormData();
      formdata.append('image', $file);
      this.uploadFile(formdata).then(resp => {
        let url = resp.data; //取出上传成功后的url
        if (resp.status === 200) {
          //  将后端返回的url放在md中图片的指定位置
          console.log(url)
          _this.$refs.md.$img2Url(pos, url)
        } else {
          _this.$message({type: resp.status, message: resp.statusText});
        }
      });
    },


//上传图片
    uploadFile(params) {
      return axios({
        method: 'post',
        url: `/user/postFile`,
        data: params,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
  }
}

</script>
