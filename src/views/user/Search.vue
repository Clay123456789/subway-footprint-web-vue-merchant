<template>
  <v-container>
    <v-text-field
        v-model="stu_id"
        label="stuid"
        filled
        rounded
        append-icon="mdi-circle"
        placeholder="学生学号"
        value=""
    />
    <v-text-field
        v-model="stu_name"
        label="stuname"
        filled
        rounded
        append-icon="mdi-circle"
        placeholder="学生姓名"
        value=""
    />
    <v-text-field
        v-model="aff"
        label="affiliation"
        filled
        rounded
        append-icon="mdi-circle"
        placeholder="隶属学院"
        value=""
    />
    <v-text-field
        v-model="dom"
        label="dom"
        filled
        rounded
        append-icon="mdi-circle"
        placeholder="宿舍号"
        value=""
    />
    <v-text-field
        v-model="mob"
        label="mobile"
        filled
        rounded
        append-icon="mdi-circle"
        placeholder="请输入手机号"
        value=""
    />
    <v-text-field
        v-model="status"
        label="status"
        filled
        rounded
        append-icon="mdi-circle"
        placeholder="请输入风险状态"
        value=""
    />
    <v-btn
        width="100"
        color="primary"
        @click="search"
    >search
    </v-btn>
    <!--    <div class="radios">
      <input type="radio" name="radios" value="1" v-model="param"><label>只看文章结果</label>
      <input type="radio" name="radios" value="2" v-model="param"><label>只看文件结果</label>
      <input type="radio" name="radios" value="3" v-model="param"><label>全局搜索</label>
    </div>-->
    <v-card width="800">
      <!--      <p>{{param}}</p>-->
      <table>
        <tr>
          <th v-for="(item,ind) in columnList" :key="ind" style="width: 260px;height: 30px;font-size: 15px;border:#7B68EE solid;">{{item}}</th>
        </tr>
        <tr v-for='(item,index) in list' :key="index">
          <td v-for='(it,ind) in realcolumnList' :key="ind" style="width: 260px;height: 30px;font-size: 15px;border:#7B68AE solid;">{{item[it]}}</td>
        </tr>
      </table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return ({
      tosearch: '',
      param:'',
      list:[{}],
      stu_id: '',
      stu_name:'',
      aff:'',
      dom:'',
      mob:'',
      status:'',
      columnList : ['学生id', '学生姓名','性别', '隶属学院', '宿舍号', '手机号', '状态'],
      realcolumnList : ['user_id', 'user_name','gender', 'aff', 'dom', 'mob', 'status'],
    })
  },
  mounted() {
  },
  methods: {
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
    getAll()
    {
      let that = this;

      axios.post('http://localhost:5000/user/searchstuinfo', {
        'stu_id': that.stu_id,
        'stu_name':that.stu_name,
        'aff':that.aff,
        'dom':that.dom,
        'mob':that.mob,
        'status':that.status,
      }).then(function (response) {
        let l = response.data.res;
        that.list = JSON.parse(l);
      }).catch(function (error) {
      })
    },


    search() {
      let that = this
      let parameter = that.param;
        this.getAll();
    },
  }
}
</script>
<style>
.search {
  background-color: white;
  display: flex;
  align-items: center;
  position: relative;
}
.radios{
  background-color: lightcyan;
  display: flex;
  align-items: center;
  position: relative;
}




</style>