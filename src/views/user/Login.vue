<template>
  <v-form>
    <v-container>
      <v-row justify="center">
        <v-col
            sm="9"
            md="6"
            lg="3"
        >
          <v-card>
            <v-card-text
            >
              <v-text-field
                  v-model="id"
                  label="ID"
                  required
              ></v-text-field>
            </v-card-text>

            <v-card-text
            >
              <v-text-field
                  v-model="password"
                  label="PASSWORD"
                  type="password"
                  required
              ></v-text-field>
            </v-card-text>
            <v-col
                cols="12"
                md="4"
            >
              <v-card-actions>
                <v-btn
                    @click="login"
                    class="mr-4"
                    color="green"
                >
                  login
                </v-btn>
                <v-btn
                    class="mr-4"
                    @click="register"
                >
                  resgister
                </v-btn>
              </v-card-actions>
            </v-col>


          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: 'login',
  data() {
    return ({
      id: '',
      password: '',
    })
  },
  methods: {
    register(){
      this.$router.replace('/user/register');
    },
    login() {
      let that = this;
      axios.post('http://localhost:5000/user/login', {
        id: that.id,
        password: that.password,
      }).then(function (response) {
        let status = response.data.res;
        console.log('submit');
        console.log(status);
        // 登陆成功
        if (status === 'success') {
          sessionStorage.setItem('account_info', JSON.stringify({
            'id': that.id,
            'password': that.password,
            'admin': '0'
          }));
          that.$router.replace('/user');
        } else if (status === 'success_a'){
          sessionStorage.setItem('account_info', JSON.stringify({
            'id': that.id,
            'password': that.password,
            'admin': '1'
          }));
          that.$router.replace('/user');
        }

        // 登陆失败，输出失败原因
        else if (status === 'failed') {
          alert(status);
        }
      }).catch(function (error) {
        alert(error);
      })

    }
  }
}
</script>
