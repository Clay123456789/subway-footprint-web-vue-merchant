<template>
  <v-container>
    <v-col>
      <v-row>
        <v-text-field
            v-model="stu_id"
            label="KeyWord"
            filled
            rounded
            append-icon="mdi-circle"
            placeholder="宝藏序列号/宝藏类别/宝藏详情"
            value=""
        />
        <v-btn
            width="100"
            color="primary"
            @click="search"
        >search
        </v-btn>
      </v-row>
    </v-col>
    <!--    <div class="radios">
      <input type="radio" name="radios" value="1" v-model="param"><label>只看文章结果</label>
      <input type="radio" name="radios" value="2" v-model="param"><label>只看文件结果</label>
      <input type="radio" name="radios" value="3" v-model="param"><label>全局搜索</label>
    </div>-->
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
      selection_status:'0',
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
.background{
  left:0;
  top:0;
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
}
</style>