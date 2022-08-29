<template>
  <div>
    <h1 class="title" style="font-size:50px">subway-footprint（商户端）</h1>
    <div class="background">
      <img :src="imgSrc" style="width: 100%; height: 100%" alt=""/>
    </div>
    <div>
      <el-form :model="registerForm" status-icon :rules="rules" ref="registerRef" label-width="70px"
               class="registerContainer">
        <h3 class="registerTitle">注册</h3>
        <el-form-item  label="邮箱" prop="email">
          <el-input type="text" v-model="registerForm.email" placeholder="请输入邮箱" ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input type="text" v-model="registerForm.code" placeholder="请输入验证码" style="width: 250px;margin-right: 10px">
          </el-input>
          <el-button style=" width: 50px" type="text" @click="codeForm()">获取验证码</el-button>
        </el-form-item>
        <el-form-item  label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" placeholder="请输入密码" ></el-input>
        </el-form-item>
        <el-form-item  label="确认密码" prop="checkPass">
          <el-input type="password" v-model="registerForm.checkPass" placeholder="请确认密码" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style=" width: 100px" type="primary" @click="submitForm()">提交</el-button>
          <el-button style="margin-left:50px; width: 100px" @click="resetForm()">重置</el-button>
        </el-form-item>
        <el-link :underline="false" style="margin-bottom:30px; float: right" class="header link" href="/login">
          已有帐号,去登录
        </el-link>
      </el-form>
    </div>
  </div>
</template>

<script>

import {regist,getCode} from '../../api/api'
import {reactive} from "vue";
import { ref } from 'vue'
import {ElMessage} from 'element-plus'

export default {
  name: "register",
  components: {},
  setup() {
    const registerRef = ref(null)
    const registerForm= reactive({
      email:"",
      code:"",
      password:"",
      checkPass: ""
    })

    const validateEmail = (rule, value, callback) => {
      const reg = /^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+.[a-z]+.[a-z]*$/;
      if (value == '' || value == undefined || value == null) {
        return callback(new Error('邮箱不能为空'));
      } else {
        setTimeout(() => {
          if (!reg.test(value)) {
            callback(new Error('请输入正确的邮箱'));
          } else {
            callback();
          }
        }, 1000);
      }
    }

    const validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空'));
      } else {
        callback();
      }
    }

    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    const codeForm=()=> {
      registerRef.value.validate(() => {
        const reg = /^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+.[a-z]+.[a-z]*$/;
        if (reg.test(registerForm.email)) {
          getCode({email: registerForm.email}).then(res => {
            if (res) {
              alert('验证码发送成功');
            }
          });
        } else {
          ElMessage.error('错误');
          return false;
        }
      });
    }
    const submitForm=()=> {
      registerRef.value.validate((valid) => {
        if (valid) {
          regist({account: registerForm.email,email:registerForm.email,password:registerForm.password,
            code:registerForm.code}).then(res => {
            if (res) {
              ElMessage.error('成功');
            }
          });
        } else {
          ElMessage.error('错误');
          return false;
        }
      });
    }
    const resetForm=()=> {
    }
    const rules= reactive({
      code: [
        {validator: validateCode, trigger: 'blur'}
      ],
          email: [
        {validator: validateEmail, trigger: 'blur'}
      ],
          password: [
        {validator: validatePass, trigger: 'blur'}
      ],
          checkPass: [
        {validator: validatePass2, trigger: 'blur'}
      ],
    })
    return {
      registerRef,
      codeForm,
      submitForm,
      resetForm,
      registerForm,
      rules,
      imgSrc: require('/static/background.jpeg')
    };
  }
}
</script>

<style scoped>
.registerContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 200px 800px;
  width: 600px;
  padding: 15px 35px 15px 35px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(109, 101, 101, 0.8);
  box-shadow: 0 0 25px #333131;
  z-index: 1;
  position: absolute;
}



.registerTitle {
  margin: 8px auto 40px auto;
  text-align: center;
}

.background {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
}

.title {
  margin: 100px 150px auto;
  z-index: 1;
  position: absolute;
}

</style>
