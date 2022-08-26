<template>
  <v-col>
    <v-app>
      <v-app-bar
          app
          color="rgb(0,0,0,0.5)"
          dark
          height="90"
          style="z-index:9999; font-size: 60px; font-family: 'Felix Titling'"
      >
        <v-row>
          <v-col class="title" align="left" >
            <v-col background-color="rgb(0,0,0,0.5)" style="font-size:30px"
                   @click="home"
            >
              管理员端
            </v-col>
          </v-col >
          <v-col background-color="white" style="font-size:30px"
              @click="my_info">
            <p v-if="is_login == '1'">
              我的商户信息
            </p>
          </v-col>
          <v-col background-color="white" style="font-size:30px"
            @click="treasure_manage">
            <p v-if="is_login == '1'">
            宝藏管理
            </p>
          </v-col>
          <v-col background-color="white" style="font-size:30px"
            @click="inter">
            <p v-if="is_login == '1'">
            藏宝
            </p>
          </v-col>
          <v-btn @click="log_out">
            退出
          </v-btn>

  <!--          <v-col align="right">
            <v-row>
              <v-col>
                <v-icon @click="setInfo">
                  mdi-wrench
                </v-icon>
              </v-col>
            </v-row>
          </v-col>-->
        </v-row>
      </v-app-bar>

      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  </v-col>
</template>

<script>

export default {
  name: 'App',
  data() {
    return ({
      is_login: '1',
    })
  },
  //data: () => ({
    //buptFigure: require('../src/assets/buptFigure.png'),
  //}),

  methods: {
    setInfo() {
      this.$router.replace('/user/info')
    },
    home() {
      this.$router.replace('/user/login');
    },
    my_info(){this.$router.replace('/user/ma');},
    treasure_manage(){this.$router.replace('/user/atmp');},
    inter(){this.$router.replace('/user/inter');},
    log_out(){},
  }
};
</script>
