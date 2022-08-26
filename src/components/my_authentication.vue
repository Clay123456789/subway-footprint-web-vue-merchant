<template>
  <v-row justify="center">
    <v-card width="800" height="800" >
      <v-container v-if="is_auth==1">
        <h1 align="center">
          我的商户信息
        </h1>
        <h2 align="center">
          认证状态：
          <p style="color: lime">已认证</p>
        </h2>
        <h3 style="padding-left: 20px"> uid：{{uid}}</h3>
        <h3 style="padding-left: 20px"> 用户名：{{username}}</h3>
        <h3 style="padding-left: 20px"> 邮箱：{{email}}</h3>
        <h3 style="padding-left: 20px"> 年龄：{{age}}</h3>
        <h3 style="padding-left: 20px"> 性别：{{gender}}</h3>
        <h3 style="padding-left: 20px"> TEL：{{tel}}</h3>
        <h3 style="padding-left: 20px"> 头像：{{ avatar }}"</h3>
        <h3 style="padding-left: 20px"> 签名：{{credit}}</h3>
        <h3 style="padding-left: 20px"> 碳积分：{{credit}}</h3>
      </v-container>
      <v-container v-if="is_auth==0">
        <h1 align="center">
          我的商户信息
        </h1>
        <h2 align="center">
          认证状态：
          <p style="color: red">未认证</p>
          <v-btn
              width="100"
              color="primary"
              @click="go_auth"
          >去认证！
          </v-btn>
        </h2>
      </v-container>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: "my_authentication",
  data() {
    return ({
      uid:'2019211996@bupt.cn',
      username:'Clay',
      email:'2019211996@bupt.cn',
      age:'22',
      gender:'male',
      tel:'18250290053',
      avatar:'http://123.56.150.89:8866/SubwayFootPrint/1649472173289-xyl5xi8n2kd5ya837c0r-thumbnail-0.8.jpg',
      description:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊',
      credit:'120',
      is_auth:'1',
    })
  },
  methods: {
    go_auth(){

    },

  }
}
</script>

<style scoped>

</style>