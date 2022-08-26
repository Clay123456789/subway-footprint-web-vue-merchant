<template>
  <v-form>
    <v-container>
      <v-row justify="center">
        <v-col
            sm="9"
            md="6"
            lg="3"
        >
          <v-row justify="center">
            <v-card min-width="450">
              <v-img
                  min-height="100"
                  max-height="100"
                  min-width="100"
                  max-width="100"
              ></v-img>
              <v-spacer></v-spacer>
              <v-card-text
              >Username
                <v-text-field
                    v-model="username"
                    required
                ></v-text-field>
              </v-card-text>

              <v-card-text
              >Introduction
                <v-textarea
                    id="intro"
                    v-model="introduction"
                    type="text"
                    counter="100"
                ></v-textarea>
              </v-card-text>

              <v-col
                  cols="12"
                  md="4"
              >
                <v-btn
                    @click="submit"
                    class="mr-4"
                >
                  submit
                </v-btn>
              </v-col>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: 'info',
  data() {
    return ({
      id: '',
      introduction: '',
      username: '',
    })
  },
  mounted() {
    this.id = JSON.parse(sessionStorage.getItem('account_info')).id;
    this.username = JSON.parse(sessionStorage.getItem('user_info')).username;
    this.introduction = JSON.parse(sessionStorage.getItem('user_info')).introduction;
  },
  methods: {
    submit() {
      let that = this;
      axios.post('http://localhost:5000/user/edit', {
        id: that.id,
        username: that.username,
        introduction: that.introduction,
      }).then(function (response) {
        let status = response.data.res;
        if (status === 'success') {
          that.username = response.data.username;
          that.introduction = response.data.introduction;
          sessionStorage.setItem('user_info', JSON.stringify({
            'username': that.username,
            'introduction': that.introduction
          }))
          that.$router.replace('/user/home');
        }
      }).catch(function (error) {

      })
    },


  }
}
</script>
