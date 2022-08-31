<template>
  <div class="intering">
   <!--藏宝界面
    //需要添加自动获取地理位置信息功能！！！！
    //需要添加自动获取地理位置信息功能！！！！
    //需要添加自动获取地理位置信息功能！！！！
    //需要添加自动获取地理位置信息功能！！！！
    //需要添加自动获取地理位置信息功能！！！！
    //需要添加自动获取地理位置信息功能！！！！
    //需要添加自动获取地理位置信息功能！！！！
    //需要添加自动获取地理位置信息功能！！！！-->
    <div>
      <el-container>
        <el-header>
          &lt; 此处需要一个装饰&gt;
        </el-header>
        <el-container>
          <el-aside width="200px"><h2>宝藏信息设置</h2>
            <h3>线路</h3>
            <p>
              <el-select v-model="treasureData.line" placeholder="请选择">
                <el-option v-for="item in treasureData.line_list" :key="item"  :value="item">
                </el-option>
              </el-select>
            </p>
            <h3>站点</h3>
            <!--不会其他方法只能if else 苦逼-->
            <el-select v-if="treasureData.line=='1号线'" v-model="treasureData.station" placeholder="请选择">
              <el-option v-for="item in treasureData.line1_sta" :key="item"  :value="item">
              </el-option>


            </el-select>
            <h3>经度</h3><el-input clearable="true" v-model="longitude" placeholder="经度尚未输入"></el-input>
            <h3>维度</h3><el-input clearable="true" v-model="latitude" placeholder="纬度尚未输入"></el-input>
          </el-aside>
          <el-container>
            <el-main>
              <div id="map">
                <!-- 技术支持和联系方式  -->

              </div>
            </el-main>
          </el-container>
        </el-container>
        <el-footer>
          <el-button type="primary" @click="confirm">
              确认
          </el-button>
          <el-button @click="undo">
              重置
          </el-button>
        </el-footer>
      </el-container>
    </div>

  </div>
</template>

<script>
import {onMounted, reactive} from "vue";import { ref } from 'vue'
import AMapLoader from "@amap/amap-jsapi-loader";

window._AMapSecurityConfig = {
  securityJsCode: '9dbdec75658a9d7c121b7b00713ebb09',
}

export default {
  name: "inter",
  data() {
    return {
      map: null,
      mouseTool: null,
      overlays: [],
      auto: null,
      placeSearch: null,
      longitude:'',
      latitude:''
    }
  },
  mounted() {
    this.initMap()
  },
    methods:{
      initMap(){
        AMapLoader.load({
          "key": "1a3d92eac7187f17132233bbfde3acdb",
          "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
          "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap)=>{
          let that=this;
          // 初始化地图
          this.map = new AMap.Map('map',{
            viewMode : "2D",  //  是否为3D地图模式
            zoom : 13,   // 初始化地图级别
            //mapStyle: "amap://styles/darkblue",
            center : [116.38,39.90], //中心点坐标  天安门
            resizeEnable: true
          });

          // 鼠标点击获取经纬度
          this.map.on('click', function(e) {
            //console.log("经度",e.lnglat.getLng())
            //console.log("纬度",e.lnglat.getLat())
            that.longitude = e.lnglat.getLng();
            that.latitude=e.lnglat.getLat();
          });


        }).catch(e => {
          console.log(e);
        });
      }
  },

  setup()
  {
    const input = ref('')
    //挂载
    onMounted(()=>{})
    //宝藏所需数据
    //需要添加自动获取地理位置信息功能！！！！
    const treasureData= reactive(
        {
          line_list:[
            "1号线", "2号线","4号线","5号线","6号线","7号线",
            "8号线", "9号线","10号线","11号线","13号线","14号线",
            "15号线", "16号线","17号线","19号线线","房山线","昌平线",
            "亦庄线", "s1线","西郊线","亦庄T1线","首都线","大兴线",
            "燕房线",
          ],
          line:'',

          line1_sta:["测试"],
          station_list:[
            '站1','站2','站3'
          ],
          station:'',
        }
    )
    return {treasureData,input}
  }



}
</script>

<style scoped>
#map {
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: "微软雅黑";
}
.amap-logo {
  display: none !important;
}
.amap-copyright {
  display: none !important;
}
.el-container {
  height: 100%;
}

.el-header {
  margin-top: 100px;background-color: rgb(220,220,220,0.9); color: #333; text-align: center;font-size: 30px ;;line-height: 60px;
  border-radius: 15px 15px 0 0;
}
.el-footer
{
  background-color: rgb(220,220,220,0.9); color: #333; text-align: center; line-height: 60px;
  border-radius:  0px 0px 0px 15px;
}

.el-aside {
  background-color: #d3dce6; color: #333;text-align: left;vertical-align:text-top;height:500px;opacity: 0.9;
}

.el-main {
  background-color: #e9ff23; color: #333; text-align: left;vertical-align:text-top;height:500px;opacity: 0.9;
}

.el-menu {
  background-color: #e9ff23;opacity: 0.9;
}
.el-input{
  width: 200px;
}
</style>
