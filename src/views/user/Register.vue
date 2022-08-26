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
                  v-model="username"
                  label="USERNAME"
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
              <v-btn
                  @click="register"
                  class="mr-4"
              >
                sign up
              </v-btn>
              <v-btn
                  @click="register_a"
                  class="mr-4"
                  color="cyan"
              >
                sign up(admin)
              </v-btn>
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
  name: 'register',
  data() {
    return ({
      id: '',
      username: '',
      password: '',
    })
  },

  methods: {
    register() {
      let that = this;
      axios.post('http://localhost:5000/user/register', {
        id: that.id,
        username: that.username,
        password: that.password,
      }).then(function (response) {
        console.log('submit');
        sessionStorage.setItem('account_info', JSON.stringify({
          'id': that.id,
          'username': that.username,
          'password': that.password,
        }));
        that.$router.replace('/user/home');
      }).catch(error => {
        console.log('error')
      })
    },
    register_a(){
      let that = this;
      axios.post('http://localhost:5000/user/register_a', {
        id: that.id,
        username: that.username,
        password: that.password,
      }).then(function (response) {
        console.log('submit');
        sessionStorage.setItem('account_info', JSON.stringify({
          'id': that.id,
          'username': that.username,
          'password': that.password,
        }));
        that.$router.replace('/user/home');
      }).catch(error => {
        console.log('error')
      })
    }

  }
}
</script>
