<template>
  <div>
    <h1 class="title" style="font-size:50px">subway-footprint（商户端）</h1>
    <div class="background">
      <img :src="imgSrc" style="width: 100%; height: 100%" alt=""/>
    </div>
    <div>
      <el-form :model="LoginForm" status-icon :rules="rules" ref="LoginRef" label-width="50px"
               class="registerContainer">
        <h3 class="LoginTitle">找回密码</h3>
        <el-form-item  label="邮箱" prop="user">
          <el-input v-model="LoginForm.user" placeholder="请输入邮箱" autocomplete="off"></el-input>
        </el-form-item>
        <el-link :underline="false" style="margin-bottom:30px; float: right" class="header link" href="/student/login">
          去登录
        </el-link>
        <el-form-item>
          <el-button style="width: 100%;margin-top:30px" type="primary" @click="codeForm()">找回密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {findPW} from '../../api/api'
import {reactive} from "vue";
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { useRouter } from 'vue-router'
export default {
  name: "findPW",
  components: {},
  setup() {
    const router = useRouter()
    const validateUser = (rule, value, callback) => {
      if (value == '' || value == undefined || value == null) {
        return callback(new Error('邮箱不能为空'));
      } else {
        callback();
      }
    }


    const LoginRef = ref(null)
    const LoginForm = reactive({
      user: '',
    })
    const rules = reactive({
      user: [
        {validator: validateUser, trigger: 'blur'}
      ],
    })

    const codeForm=()=> {
      LoginRef.value.validate(() => {
        const reg = /^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+.[a-z]+.[a-z]*$/;
        if (reg.test(LoginForm.user)) {
          findPW({email: LoginForm.user}).then(res => {
            if(res.data.code===200) {
              ElMessage.success(res.data.message);
            }else {
              ElMessage.error(res.data.message);
            }
          });
        } else {
          ElMessage.error('错误');
          return false;
        }
      });
    }

    return {
      router,
      LoginRef,
      LoginForm,
      rules,
      imgSrc: require('/static/background.jpeg'),
      codeForm
    };
  }
};
</script>

<style scoped>
.registerContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 200px 800px auto;
  width: 350px;
  padding: 5px 15px 5px 15px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(109, 101, 101, 0.8);
  box-shadow: 0 0 25px #333131;
  z-index: 1;
  position: absolute;
}

.background {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
}

.LoginTitle {
  margin: 8px auto 40px auto;
  text-align: center;
}

.title {
  margin: 100px 150px auto;
  z-index: 1;
  position: absolute;
}
</style>
