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
          &lt; 点选地图设置经纬度&gt;
        </el-header>
        <el-container>
          <el-aside width="200px"><h2>宝藏信息设置</h2>
            <h3>线路</h3>
            <p>
              <el-select v-model="ruleForm.selectFirstColumnObj"
                         value-key="id"
                         @change="first_change($event)"
                         placeholder="请选择">
                <el-option v-for="item in line_list"
                           :key="item.id"
                           :label="item.text"
                           :value="item">
                </el-option>
              </el-select>
            </p>
            <h3>站点</h3>
            <p>

              <el-select v-model="station"
                         placeholder="请选择"
                         value-key="id"
                         @change="position($event)"
                         >
                <el-option v-for="item in secondColumnList"
                           :key="item"
                           :label="item"
                           :value="item">
                </el-option>
              </el-select>

            </p>
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
    <el-dialog v-model="dialog_visible" title="请选择要添加的宝藏" width="50%">
      <el-select v-model="treasureData"
                 value-key="id"
                 @change=selected()
                 placeholder="请选择">
        <el-option v-for="item in tableData.arr"
                   :key="item"
                   :label="item.name"
                   :value="item">
        </el-option>
      </el-select>
      <!--宝藏信息展示-->
      <div>
        <el-row>
          <el-col :span="11">
            <el-input
                v-model="this.treasureData.aid"
                placeholder="请选择宝藏"
                disabled
                >
            </el-input>
          </el-col>
        </el-row>
      </div>
      <el-button type="primary" @click="inter">
        确认
      </el-button>
      <el-button @click="conceldialog">
        返回
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import {onMounted, reactive} from "vue";import { ref } from 'vue'
import AMapLoader from "@amap/amap-jsapi-loader";
import {getAllAwards, interTreasure} from "../../api/api";
import _ from "lodash";

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
      latitude:'',
      dialog_visible: ref(false),

      //所有线路、站点
      line_list:[
        {
          id:1,
          text:"1号线",
          children:[
            "福寿岭站",
            "苹果园站",
            "古城站",
            "八角游乐园站",
            "八宝山站",
            "玉泉路站",
            "五棵松站",
            "万寿路站",
            "公主坟站",
            "军事博物馆站",
            "木樨地站",
            "南礼士路站",
            "复兴门站",
            "西单站",
            "天安门西站",
            "天安门东站",
            "王府井站",
            "东单站",
            "建国门站",
            "永安里站",
            "国贸站"
            ],
        },
        {
          id:2,
          text:"2号线",
          children:[
            "西直门站",
            "车公庄站",
            "阜成门站",
            "复兴门站",
            "长椿街站",
            "宣武门站",
            "和平门站",
            "前门站",
            "款门站",
            "北京站",
            "建国门站",
            "朝阳门站",
            "东四十条站",
            "东直门站",
            "雍和宫站",
            "安定门站",
            "鼓楼大街站",],
        },
        {
          id:4,
          text:"4号线",
          children:["天宫院站",
            "生物医药基地站",
            "义和庄站",
            "黄村火车站",
            "黄村西大街站",
            "清源路站",
            "枣园站",
            "高米店南站",
            "高米店北站",
            "西红门站",
            "新宫站",
            "公益西桥站",
            "角门西站",
            "马家堡站",
            "北京南站",
            "陶然亭站",
            "菜市口站",
            "宣武门站",
            "西单站",
            "灵境胡同站",
            "西四站",
            "平安里站",
            "新街口站",
            "西直门站",
            "动物园站",
            "国家图书馆站",
            "魏公村站",
            "人民大学站",
            "海淀黄庄站",
            "中关村站",
            "北京大学东门站",
            "圆明园站",
            "西苑站",
            "北宫门站",
            "安河桥北站",
          ],
        },
        {
          id:5,
          text:"5号线",
          children:["宋家庄站",
            "刘家窑站",
            "蒲黄榆站",
            "天坛东门站",
            "磁器口站",
            "款门站",
            "东单站",
            "灯市口站",
            "东四站",
            "张自忠路站",
            "北新桥站",
            "雍和言站",
            "和平里北街站",
            "和平西桥站",
            "惠新西街南口站",
            "惠新西街北口站",
            "大屯路东站",
            "北苑路北站",
            "立水桥南站",
            "立水桥站",
            "天通苑南站",
            "天通苑站",
            "天通苑北站",],
        },
        {
          id:6,
          text:"6号线",
          children:["金安桥站",
            "苹果园站",
            "杨庄站",
            "西黄村站",
            "廖公庄站",
            "田村站",
            "海淀五路居站.",
            "慈寿寺站",
            "花园桥站",
            "白石桥南站",
            "二里沟站",
            "车公庄西站",
            "车公庄站",
            "平安里站",
            "北海北站",
            "南锣鼓巷站",
            "朝阳门站",
            "东大桥站",
            "呼家楼站",
            "金台路站",
            "十里堡站",
            "青年路站",
            "褡裢坡站",
            "黄渠站",
            "常营站",
            "草房站",
            "物资学院路站.",
            "通州北关站",
            "通运门站",
            "北运河西站",
            "北运河东站",
            "郝家府站.",
            "东夏园站",
            "潞城站",],
        },
        {
          id:7,
          text:"7号线",
          children:["北京西站",
            "湾子站",
            "达官营站.",
            "广安门内站",
            "菜市口站",
            "虎坊桥站",
            "珠市口站",
            "桥湾站",
            "磁器口站",
            "广渠门内站",
            "广渠门外站.",
            "双井站",
            "九龙山站",
            "大郊亭站",
            "百子湾站",
            "化工站",
            "南楼梓庄站",
            "欢乐谷景区站",
            "垡头站",
            "双合站",
            "焦化厂站",
            "黄厂站",
            "郎辛庄站",
            "黑庄户站",
            "万盛西站",
            "万盛东站",
            "群芳站",
            "高楼金站",
            "花庄站",
            "环球度假区站",],
        },
        {
          id:8,
          text:"8号线",
          children:["朱辛庄站",
            "育知路站",
            "平西府站",
            "回龙观东大街站",
            "霍营站",
            "育新站",
            "西小口站",
            "永泰庄站",
            "林萃桥站",
            "森林公园南门站",
            "奥林匹克公园站",
            "奥体中心站",
            "北土城站",
            "安华桥站",
            "安德里北街站",
            "鼓楼大街站",
            "什刹海站",
            "南锣鼓巷站",
            "中国美术馆站",
            "金鱼胡同站",
            "王府井站",
            "前门站",
            "珠市口站",
            "天桥站",
            "永定门外站",
            "木樨园站",
            "海户屯站",
            "大红门站",
            "大红门南站",
            "和义站",
            "东高地站",
            "火箭万源站",
            "五福堂站",
            "德茂站",
            "瀛海站",],
        },
        {
          id:9,
          text:"9号线",
          children:["郭公庄站",
            "丰台科技园站",
            "科怡路站",
            "丰台南路站",
            "丰台东大街站",
            "七里庄站.",
            "六里桥站",
            "六里桥东站",
            "北京西站",
            "军事博物馆站",
            "白堆子站",
            "白石桥南站",
            "国家图书馆站",],
        },
        {
          id:10,
            text:"10号线",
          children:["巴沟站",
            "火器营站",
            "长春桥站",
            "车道沟站",
            "慈寿寺站",
            "西钓鱼台站",
            "公主坟站",
            "莲花桥站",
            "六里桥站",
            "西局站",
            "泥洼站",
            "丰台站",
            "首经贸站",
            "纪家庙站.",
            "草桥站",
            "角门西站",
            "角门东站",
            "大红门站",
            "石榴庄站",
            "宋家庄站",
            "成寿寺站",
            "分钟寺站",
            "十里河站",
            "潘家园站",
            "劲松站",
            "双井站",
            "国贸站",
            "金台夕照站",
            "呼家楼站",
            "团结湖站",
            "农业展览馆站",
            "马桥站",
            "三元桥站",
            "太阳官站",
            "芍药居站",
            "惠新西街南口站",
            "安贞门站",
            "北土城站",
            "健德门站",
            "牡丹园站",
            "西土城站",
            "知春路站",
            "知春里站",
            "海淀黄庄站",
            "苏州街站",
            "巴沟站",],
        },
        {
          id:11,
          text:"11号线",
          children:["模式口站(缓开)",
            "金安桥站",
            "北辛安站",
            "新首钢站",],
        },
        {
          id:13,
          text:"13号线",
          children:["西直门站",
            "大钟寺站",
            "知春路站",
            "五道口站",
            "上地站",
            "清河站",
            "西二旗站",
            "龙泽站",
            "回龙观站",
            "霍营站",
            "立水桥站",
            "北苑站",
            "望京西站",
            "芍药居站",
            "光熙门站",
            "柳芳站",
            "东直门站",],
        },
        {
          id:14,
          text:"14号线",
          children:["张郭庄站",
            "园博园站.",
            "大瓦窑站",
            "郭庄子站",
            "大井站",
            "七里庄站",
            "西局站",
            "东管头站",
            "丽泽商务区站",
            "菜户营站",
            "西铁营站.",
            "风门站",
            "北京南站.",
            "陶然桥站",
            "永定门外站",
            "景泰站.",
            "蒲黄榆站",
            "方庄站",
            "十里河站",
            "北工大西门站",
            "平乐园站",
            "九龙山站",
            "大望路站",
            "红庙站(在建)",
            "金台路站",
            "朝阳公园站",
            "枣营站",
            "东风北桥站",
            "将台站",
            "高家园站",
            "望京南站",
            "阜通站",
            "望京站",
            "东湖渠站",
            "来广营站",
            "善各庄站",
          ],
        },
        {
          id:15,
          text:"15号线",
          children:[
              "清华东路西口站",
            "六道口站",
            "北沙滩站",
            "奥林匹克公园站",
            "安立路站",
            "大屯路东站",
            "关庄站",
            "望京西站",
            "望京站",
            "望京东站",
            "崔各庄站",
            "马泉营站",
            "孙河站",
            "国展站",
            "花梨坎站",
            "后沙峪站",
            "南法信站",
            "石门站",
            "顺义站",
            "俸伯站",],
        },
        {
          id:16,
          text:"16号线",
          children:["北安河站",
            "温阳路站",
            "稻香湖路站",
            "屯佃站",
            "永丰站",
            "永丰南站",
            "西北旺站",
            "马连洼站",
            "农大南路站",
            "西苑站",
            "万泉河桥站",
            "苏州街站",
            "苏州桥站",
            "万寿寺站",
            "国家图书馆站",
            "二里沟站",
            "甘家口站",
            "玉渊潭东门站",],
        },
        {
          id:17,
          text:"17号线",
          children:["未来科学城北站(在建)",
            "未来科学城南站(在建)",
            "天通苑东站(在建)",
            "清河营站(在建)",
            "勇士营站(在建)",
            "望京西站(在建)",
            "太阳宫站(在建)",
            "西坝河站(在建)",
            "香河园站(在建)",
            "工人体育场站(在建)",
            "东大桥站(在建)",
            "永安里站(在建)",
            "广漠门外站(在建)",
            "潘家园西站(在建)",
            "十里河站",
            "周家庄站",
            "十八里店站",
            "北神树站",
            "次渠北站",
            "次渠站",
            "嘉会湖站",],
        },
        {
          id:19,
          text:"19号线线",
          children:[
              "牡丹园站",
            "北太平庄站",
            "积水潭站",
            "平安里站",
            "太平桥站",
            "牛街站",
            "风门站",
            "草桥站",
            "新发地站",
            "新宫站",],
        },
        {
          id:100,
          text:"房山线",
          children:["东管头南站",
            "首经贸站",
            "花乡东桥站",
            "白益窑站",
            "郭公庄站",
            "大葆台站",
            "稻田站",
            "长阳站",
            "篱笆房站",
            "广阳城站",
            "良乡大学城北站",
            "良乡大学城站",
            "良乡大学城西站",
            "良乡南关站",
            "苏庄站",
            "阎村东站",],
        },
        {
          id:101,
          text:"昌平线",
          children:["昌平西山口站",
            "十三陵景区站",
            "昌平站.",
            "昌平东关站",
            "北邵洼站",
            "南邵站",
            "沙河高教园站",
            "沙河站",
            "巩华城站",
            "朱辛庄站",
            "生命科学园站",
            "西二旗站",
            "清河站",],
        },
        {
          id:102,
          text:"亦庄线",
          children:["宋家庄站",
            "肖村站",
            "小红门站",
            "旧宫站",
            "亦庄桥站",
            "亦庄文化园站",
            "万源街站",
            "荣京东街站",
            "荣昌东街站",
            "同济南路站",
            "经海路站",
            "次渠南站",
            "次溪站",
            "亦庄火车站站",],
        },
        {
          id:103,
          text:"s1线",
          children:["苹果园站",
            "金安桥站.",
            "四道桥站.",
            "桥户营站",
            "上岸站",
            "栗园庄站",
            "小园站",
            "石厂站",],
        },
        {
          id:104,
          text:"西郊线",
          children:["巴沟站",
            "颐和园西门站",
            "茶棚站",
            "万安站",
            "国家植物园站",
            "香山站",],
        },
        {
          id:105,
          text:"亦庄T1线",
          children:["定海圆站",
            "定海园西站",
            "经海一路站",
            "亦创会展中心站",
            "荣昌东街站",
            "亦庄同仁站",
            "鹿园东站",
            "泰河路站",
            "九号村站",
            "四海庄站",
            "太和桥北站",
            "瑞合庄站",
            "融兴街站",
            "屈庄站",
            "老观里站",
          ],
        },
        {
          id:106,
          text:"首都线",
          children:["北新桥站",
            "东直门站",
            "三元桥站",
            "3号航站楼站",
            "2号航站楼站",],
        },
        {
          id:107,
          text:"大兴线",
          children:[
            "草桥站",
            "大兴新城站",
            "大兴机场站",],
        },
        {
          id:108,
          text:"燕房线",
          children:[
            "阎村东站",
            "紫草坞站",
            "阎村站",
            "星城站.",
            "大石河东站",
            "马各庄站",
            "饶乐府站",
            "房山城关站",
            "燕山站",],
        },
      ],
      line:'',//一级栏目数据
      station:'',//二级栏目数据

      ruleForm: {
        selectFirstColumnObj: {}, // 选中的一级对象
        selectSecondColumnObj: {}, // 选中的二级对象
      },
      // 二级栏目数据
      secondColumnList: [],

      //商户奖品列表
      tableData :{
        arr: [],
      }
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
      },
      // 一级改动
      first_change (e) {
        // 给一级model赋值
        this.ruleForm.selectFirstColumnObj = e;
        // 初始化二级的列表
        this.ruleForm.selectSecondColumnObj = {};
        this.secondColumnList = e.children;
        // 清空二三级对象
        this.ruleForm.selectThreeColumnObj = {};
        this.line=e.text;
        this.threeColumnList = [];
      },
      position(e)
      {
        this.station="131_"+e;
        console.log(this.station);
      },
      undo()
      { this.station="";
        this.line=""
        this.ruleForm.selectFirstColumnObj={};
        this.ruleForm.selectSecondColumnObj = {};
        this.longitude="";
        this.latitude="";
        },
      confirm()
      {
        //显示宝藏池框
        this.dialog_visible=true;
        getAllAwards({})
            .then((res) => {
              console.log(res);
              console.log(res.data.data);
              console.log(typeof res.data.data);
              this.tableData.arr = _.cloneDeep(res.data.data);
            })
            .catch((err) => console.log(err));
      },
      conceldialog(){
        this.dialog_visible=false;
      },
      selected(){
        console.log(this.treasureData.aid);
        console.log(this.treasureData.fromdate);
        console.log(this.treasureData.todate);

      },
      inter()
      {
        interTreasure({
          "aid":this.treasureData.aid,
          "num":"1",
          "credit":"1",
          "pid":this.station,
          "message":"test",
        }).then((res)=>{
              console.log(res)
            }
        ).catch((err)=>console.log(err))
      }


  },

  setup()
  {
    const input = ref('');
    //挂载
    onMounted(()=>{})
    //宝藏所需数据
    //需要添加自动获取地理位置信息功能！！！！
    const treasureData= reactive(
        {
          aid:"",
          mid:"",
          variety:"",
          name:"",
          credit:"",
          fromdate:"",
          todate:"",
          content:"",
          num:'',
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
