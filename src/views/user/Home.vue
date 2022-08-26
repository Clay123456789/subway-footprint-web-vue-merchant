<template>
  <v-layout>
    <v-container fill-height>
      <v-col>
        <v-card height="800">
          <br/>
          <v-card width="600" height="80" color="grey" >
            <p class="date">当前时间：{{date|formatDate(this)}}</p>
            <p v-if="isA == '1'">欢迎您，{{id}}老师</p>
            <p v-else>欢迎您，{{id}}同学</p>
          </v-card>
          <br/>
          <v-card v-if="isA == '0'" width="600" height="80" color="grey">
            <p class="personal_status">
              个人风险情况：{{reported}}
            </p>
          </v-card>
          <v-card v-else>


          </v-card>
          <br/>

          <v-card v-if="isA == '0'" width="600" height="80" color="grey">
            <p class="personal_status">
              当前风险人数：{{dangerousNum}}

            </p>
          </v-card>
          <v-card v-else>

          </v-card>
          <br/>

        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card height="800">
          <v-container>
            <v-col>
              <v-row>
                <v-btn
                    width="100"
                    color="primary"
                    @click="gosearch"
                >search
                </v-btn>
              </v-row>
              <v-row justify="center" style="padding: 10px">
                <v-btn
                    min-height="100"
                    max-height="100"
                    min-width="100"
                    max-width="100"
                    @click="articles"
                >
                  <v-icon size="80">mdi-android</v-icon>
                </v-btn>
              </v-row>
              <v-row justify="center" style="font-weight: bolder;font-size: 20px;font-family: Cambria">
                {{ uname }}
              </v-row>

              <v-row justify="center"
                     style="padding: 10px">
                <v-card
                    width="300"
                    height="80"
                >
                  <v-row justify="center">
                    <v-col style="font-family: Consolas;padding: 15px">
                      {{ intro }}
                    </v-col>
                  </v-row>
                </v-card>
              </v-row>
              <v-row justify="center" style="padding: 10px">
<!--                <v-btn
                    width="100"
                    color="primary"
                    @click="gofavor"
                >favorites
                </v-btn>
                <v-btn
                    width="100"
                    color="primary"
                    @click="gobought"
                >bought
                </v-btn>-->
              </v-row>
              <v-row justify="center" style="padding: 10px">
                <v-btn
                    width="100"
                    color="primary"
                    @click="gopost"
                >post
                </v-btn>
              </v-row>
              <v-row justify="center" style="padding: 10px">
                <v-btn
                    width="100"
                    color="primary"
                    @click="goupload"
                >upload
                </v-btn>
              </v-row>
              <v-row justify="center" style="padding: 10px">
                <v-btn
                    width="100"
                    color="grey"
                    @click="logout"
                >logout
                </v-btn>
              </v-row>
            </v-col>
          </v-container>
        </v-card>
      </v-col>
    </v-container>
  </v-layout>
</template>


<script>
import axios from "axios";

export default {
  name: 'home',
  data() {
    return ({
      id: '',
      intro: '',
      uname: '',
      isA:'0',
      date: new Date(),//当前日期
      reported: '未填报',
      dangerousNum:'0'
    })
  },

  mounted() {
    this.id = JSON.parse(sessionStorage.getItem('account_info')).id;
    this.isA = JSON.parse(sessionStorage.getItem('account_info')).admin;
    this.loadData();
    this.uname = JSON.parse(sessionStorage.getItem('user_info')).username;
    this.intro = JSON.parse(sessionStorage.getItem('user_info')).introduction;
    let _this = this;
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改日期数据
    }, 1000);
    this.isReported()
    this.presentNumber()
  },

  methods: {
    gosearch() {
      // 搜索
      this.$router.replace('/user/search')
    },
    gobought(){
      let that = this;
      this.$router.push({path:'/user/bought',query:{id: that.id}})
    },
    gofavor(){
      this.$router.replace('/user/favor')
    },
    goupload() {
      this.$router.replace('/user/upload')
    },
    gopost() {
      this.$router.replace('/user/post');
    },
    loadData() {
      let that = this;
      axios.post('http://localhost:5000/user/getInfo', {
        id: that.id,
      }).then(function (response) {
        let status = response.data.res;
        if (status === 'success') {
          that.uname = response.data.username;
          that.intro = response.data.introduction;
          sessionStorage.setItem('user_info', JSON.stringify({
            'username': response.data.username,
            'introduction': response.data.introduction
          }))
        }
      }).catch(function (error) {
      })
    },
    logout() {
      //清除干净localStorage
      sessionStorage.clear();
      this.$router.replace('/user/login');
    },
    articles() {
      this.$router.replace('/user/articles');
    },
    formatDate(date, vm) {  //当前时间格式化处理
      var str = "";
      var weekDay = [
        "星期天",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
      str += vm.setZero(date.getFullYear()) + "年"; //获取年份
      str += vm.setZero(date.getMonth() + 1) + "月"; //获取月份
      str += vm.setZero(date.getDate()) + "日"; //获取日
      str += " " + weekDay[date.getDay()]; //获取星期
      str += " " + vm.setZero(date.getHours()) + ":"; //获取时
      str += " " + vm.setZero(date.getMinutes()) + ":"; //获取分
      str += vm.setZero(date.getSeconds()); //获取秒
      return str;
    },
    destroyed() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除当前日期定时器
      }
    },
    isReported()
    {
      let that = this;
      axios.post('http://localhost:5000/user/isRep', {
        stu_id: that.id,
      }).then(function (response) {
        let status = response.data.success;
        if (status === '1') {
          that.reported = '已填报'
        }
      }).catch(function (error) {
      })
    },
    presentNumber()
    {
      let that = this;
      axios.post('http://localhost:5000/user/totalDangerousNum')
          .then(function (response){
        let num = response.data.success;
        that.dangerousNum = num;
    })


    }


  }
}

</script>
