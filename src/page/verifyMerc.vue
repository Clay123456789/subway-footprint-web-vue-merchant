<template>
  <v-row justify="center" >
    <v-card width="800" height="1000" class="v-card">
      <v-container v-if="user.user1.authenticated==1" class="v-con">
        <h1 align="center" style="color: rgba(255,0,0,0)">
          认证状态：
          <p style="color: #333131">认证状态：</p>
          <p style="color: rgb(0,255,0)">已认证</p>
        </h1>
      </v-container>
      <v-container v-if="user.user1.authenticated==0">
        <h1 align="center" style="color: rgba(255,0,0,0)">
          认证状态：
          <p style="color: #333131">认证状态：</p>
          <p style="color: yellow">认证中</p>
          <el-button
              type="danger"
              width="150"
              color="primary"
              @click="goVerify()"
          >重新提交认证信息！
          </el-button>
        </h1>
      </v-container>
      <v-container v-if="user.user1.authenticated==-2">
        <h1 align="center" style="color: rgba(255,0,0,0)">
          认证状态：
          <p style="color: #333131">认证状态：</p>
          <p style="color: red">认证失败</p>
          <el-button
              type="danger"
              width="150"
              color="primary"
              @click="goVerify()"
          >重新提交认证信息！
          </el-button>
        </h1>
      </v-container>
      <v-container v-if="user.user1.authenticated==-1">
        <h1 align="center" style="color: rgba(255,0,0,0)">
          认证状态：
          <p style="color: #333131">认证状态：</p>
          <p style="color: red">未认证</p>
          <el-button
              type="danger"
              width="100"
              color="primary"
              @click="goVerify()"
          >去认证！
          </el-button>
        </h1>
      </v-container>
      <v-container v-if="user.user1.authenticated==2">
        <h1 align="center" style="color: rgba(255,0,0,0)">
          认证状态：
          <p style="color: #333131">认证状态：</p>
          <p style="color: red">认证过期</p>
          <v-btn
              width="100"
              color="primary"
              @click="goVerify()"
          >去认证！
          </v-btn>
        </h1>
      </v-container>
      <el-card class="box-card">
      <div>
          <div style="display:flex;justify-content: center;font-size:30px" class="clearfix" >
            <span>{{user.user1.name}}</span>
          </div>

        <div style="margin-top: 20px">mid：
          <el-tag style="margin-right:150px; width:150px">{{ user.user1.mid }}</el-tag>
          账户：
          <el-tag style=" width:150px">{{ user.user1.account }}</el-tag>
        </div>
        <div style="margin-top: 20px">商户：
          <el-tag style="margin-right:150px; width:150px">{{ user.user1.name}}</el-tag>
          邮箱：
          <el-tag style=" width:150px">{{ user.user1.email }}</el-tag>
        </div>
        <div style="margin-top: 20px">电话：
          <el-tag style="margin-right:150px; width:150px">{{ user.user1.tel}}</el-tag>
          详情：
          <el-tag style=" width:150px">{{ user.user1.info }}</el-tag>
        </div>
        <div style="display:flex;justify-content: space-around;margin-top: 20px">
          <el-button type="primary" text @click="dialog1Visible = true">修改信息</el-button>
          <el-button type="danger" text @click="dialog2Visible = true">修改密码</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog
        title="编辑用户信息"
        v-model="dialog1Visible"
        width="50%">
      <div>
        <table>
          <tr>
            <td>账户名</td>
            <td>
              <el-input v-model="user.user2.account" placeholder=""></el-input>
            </td>
          </tr>
          <tr>
            <td>姓名</td>
            <td>
              <el-input v-model="user.user2.name" placeholder=""></el-input>
            </td>
          </tr>
          <tr>
            <td>电话</td>
            <td>
              <el-input v-model="user.user2.tel" placeholder=""></el-input>
            </td>
          </tr>
          <tr>
            <td>详细信息</td>
            <td>
              <el-input v-model="user.user2.info" placeholder=""></el-input>
            </td>
          </tr>
          <tr>
            <td>商户地址</td>
            <td>
              <el-input v-model="user.user2.location" placeholder=""></el-input>
            </td>
          </tr>
        </table>
      </div>
      <span  class="dialog-footer">
    <el-button @click="dialog1Visible = false">取 消</el-button>
    <el-button type="primary" @click="modifyForm()" >确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
        title="修改密码"
        v-model="dialog2Visible"
        width="50%">
      <div>
        <table>
          <tr>
            <td >旧密码</td>
            <td >
              <el-input v-model="password" placeholder="请输入旧密码" ></el-input>
            </td>
          </tr>
          <tr >
            <td >新密码</td>
            <td>
              <el-input v-model="newPass" placeholder="请输入新密码" ></el-input>
            </td>
          </tr>
        </table>
      </div>

      <span  class="dialog-footer">
    <el-button @click="dialog2Visible = false">取 消</el-button>
    <el-button type="primary" @click="passForm()" >确 定</el-button>
  </span>
    </el-dialog>
    </v-card>
  </v-row>
</template>
<script>
import { reactive, ref } from 'vue'
import {getMerchant,changePassword,modifyMerc} from "../../api/api";
import {onMounted} from "vue";
import { useRouter } from 'vue-router'

import {ElMessage} from 'element-plus'
export default {
  name: "verifyMerc",
  components: {},
  setup() {
    onMounted(()=>{
      initAdmin();
    })
    const dialog1Visible = ref(false)
    const dialog2Visible = ref(false)
    const user = reactive({
      user1: {
        mid: "819708962@qq.com",
        account: "1249171883@qq.com",
        name: null,
        password: "111111", //密码
        email: "1249171883@qq.com", //邮箱
        tel: null, //电话号码
        location: null,
        authentication: null,
        authenticated: -1,
        time: null,
        info: null
      },
      user2: {
        mid: "819708962@qq.com",
        account: "1249171883@qq.com",
        name: null,
        password: "", //密码
        email: "1249171883@qq.com", //邮箱
        tel: null, //电话号码
        location: null,
        authentication: null,
        authenticated: -1,
        time: null,
        info: null
      }
    })
    const password = ref("")
    const newPass = ref("")
    const router = useRouter()
    const goVerify =()=>{
      router.push('/goVerify');
    }
    function initAdmin(){
      getMerchant({
      }).then((res) => {
          if(res.data.code==200) {
            user.user1 = res.data.data;
            user.user2 = Object.assign({}, user.user1);
          }else{
            ElMessage.error(res.data.msg);
          }
      }).catch((err) => console.log(err));
    }
    const passForm = () =>{
      changePassword({
        email:user.user1.email,
        password:password.value,
        newPassword:newPass.value
      }).then((res) => {
        if(res.data.code==200) {
          dialog2Visible.value = false;
          ElMessage.success(res.data.message);
          initAdmin();
        }else{
          ElMessage.error(res.data.message);
        }
      });
    }
    const modifyForm = () =>{
      modifyMerc({
        account: user.user2.account,
        name: user.user2.name,
        tel: user.user2.tel,
        location: user.user2.location,
        info: user.user2.info
      }).then((res) => {
        if(res.data.code==200) {
          dialog1Visible.value = false;
          ElMessage.success(res.data.message);
          initAdmin();
        }else{
          ElMessage.error(res.data.message);
        }
      });
    }
    return {
      router,
      goVerify,
      user,
      password,
      newPass,
      dialog1Visible,
      dialog2Visible,
      passForm,
      modifyForm
    }
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 650px;
  margin-left: 420px;
  justify-content: center;
}
.v-card{
  margin-top:100px;
}

</style>