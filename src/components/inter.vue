<template>
  <v-form>
    <v-container>
      <v-row justify="center">
        <v-col
            sm="9"
            md="9"
            lg="9"
        >
          <v-card height="800">
            <v-col style="padding-top: 20px">
              <h2 align="left">
                藏宝位置
              </h2>
              <v-row>
                <v-select
                    align="left"
                    :items="types"
                    :label="value_type ? '' : '请选择'"
                    item-text="name"
                    item-value="id"
                    v-model="value_type"
                    @change="getvalue_typeSelected(value_type)"
                    style="width: 50px"
                />
                <v-select
                    align="left"
                    :items="types"
                    :label="value_type ? '' : '请选择'"
                    item-text="name"
                    item-value="id"
                    v-model="value_type"
                    @change="getvalue_typeSelected(value_type)"
                    style="width: 20px"
                />
              </v-row>
            </v-col>
            <v-card>
              <v-card-text
              >
                <v-text-field
                    v-model="id1"
                    label="宝藏信息1"
                    required
                ></v-text-field>
              </v-card-text>

              <v-card-text
              >
                <v-text-field
                    v-model="id2"
                    label="宝藏信息2"
                    type="ID2"
                    required
                ></v-text-field>
              </v-card-text>
              </v-card>
            <v-col
                cols="12"
                md="4"
            >
              <v-card-actions style="padding-left: 20px">
                <v-btn
                    @click="submit"
                    class="mr-4"
                    color="green"
                >
                  提交
                </v-btn>
                <v-btn
                    class="mr-4"
                    @click="_default"
                >
                  重置
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
export default {
  name: "inter",
  data() {
    return ({
      bgpic:require('../assets/bg.png'),
      types: [
        {
          id: "1",
          name: "1号线",
        },
        {
          id: "2",
          name: "2号线",
        },
      ],
    })
  },
}
</script>

<style scoped>
.background{
  left:0;
  top:0;
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
}
.front{
  z-index: 1;
  position: absolute;
}
</style>