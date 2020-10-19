<!--
 * @Author: xk
 * @Date: 2020-09-16 11:15:24
 * @LastEditTime: 2020-09-16 19:17:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/components/myBmap/myMap.vue
-->
<template>
  <div class="app-container">
    <el-button type="primary" @click="seeBatteryHistory()">点击查看历史轨迹</el-button>
    <!-- 查看电池历史轨迹 -->
    <el-dialog :visible.sync="dialogVisible" @close="closeBatteryHistroy" width="70%">
      <!-- 日期选择 -->
      <div class="filter-container" style="text-align:center">
        <span class="selecte-date-tit">请选择时间范围：</span>
        <el-date-picker
          v-model="selectedDate"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          @change="changeDate"
          value-format="timestamp"
        ></el-date-picker>
      </div>
      <div id="map-container" style="width:100%; height:500px"></div>
    </el-dialog>
  </div>
</template>

<script>
import AMap from "AMap";
import store from "@/store";
import carImg from '@/assets/imgs/car.gif'

export default {
  computed: {
    width: () => {
      return store.state.AppData.width - 252;
    },
    height: () => {
      return store.state.AppData.height - 70;
    },
  },
  data() {
    return {
      listLoading: true,
      dialogVisible: false, //电池轨迹dialog
      //地图
      map: null,
      marker: null,
      polyline: null,
      passedPolyline: null,
      selectedDate: [],
      markerArr: [], //电池经纬度,也用于画线
      startIcon: new AMap.Icon({
        //起点图标
        // 图标尺寸
        size: new AMap.Size(25, 34),
        // 图标的取图地址
        image: "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png",
        // 图标所用图片大小
        imageSize: new AMap.Size(135, 40),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-9, -3),
      }),
      endIcon: new AMap.Icon({
        //终点图标
        size: new AMap.Size(25, 34),
        image:"//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png",
        imageSize: new AMap.Size(135, 40),
        imageOffset: new AMap.Pixel(-95, -3),
      }),
    };
  },
  methods: {
    //点击查看历史轨迹
    seeBatteryHistory() {
      let that = this;
      that.dialogVisible = true;
      that.$nextTick(() => {
        //初始化地图
        that.initMap();
      });
      //初始化地图
    },
    //初始化地图
    initMap() {
      let that = this;
      that.map = new AMap.Map("map-container", {
        resizeEnable: true,
        zoom: 7,
        center: [120.6641561, 31.3063851], //地图中心点
      });
      AMap.plugin(["AMap.ToolBar"], function () {
        //加载工具条
        var tool = new AMap.ToolBar();
        that.map.addControl(tool);
      });
      setTimeout(function () {
        that.$message({
          title: "提醒",
          message: "请选择时间范围！",
          type: "warning",
          duration: 2000,
        });
      }, 500);
    },
    //选择时间范围后
    changeDate(value) {
      let that = this;
      //格式为时间戳格式
      this.selectedDate = value;
      //清除地图的所有覆盖物
      that.map.clearMap();
      //电池经纬度,也用于画线
      this.markerArr = [];
      //获取数据
      this.GetBatteryHistory();
    },
    //获取轨迹数据
    GetBatteryHistory() {
      let that = this;
      this.listLoading = true;
      //接口获得数据后转换，高德接受的数据格式为[[111.11,122.22],[111.11,123.33]]
      setTimeout(() => {
        that.listLoading = false;
        //坐标点数组转换
        let temp = [
          {
            latitude: 120.489895,
            longitude: 31.4812322,
            timestramp: "1587435556000",
            speed: 62,
            direction: 332,
          },
          {
            latitude: 120.4886423,
            longitude: 31.4832045,
            timestramp: "1587435571000",
            speed: 54,
            direction: 330,
          },
          {
            latitude: 120.4876163,
            longitude: 31.484728,
            timestramp: "1587435586000",
            speed: 45,
            direction: 328,
          },
          {
            latitude: 120.4866543,
            longitude: 31.4860346,
            timestramp: "1587435601000",
            speed: 30,
            direction: 327,
          },
          {
            latitude: 120.4860212,
            longitude: 31.4868333,
            timestramp: "1587435617000",
            speed: 25,
            direction: 324,
          },
          {
            latitude: 120.4852825,
            longitude: 31.4878958,
            timestramp: "1587435632000",
            speed: 38,
            direction: 325,
          },
          {
            latitude: 120.4840498,
            longitude: 31.489434,
            timestramp: "1587435647000",
            speed: 53,
            direction: 325,
          },
          {
            latitude: 120.4826449,
            longitude: 31.4911216,
            timestramp: "1587435662000",
            speed: 56,
            direction: 321,
          },
          {
            latitude: 120.4810466,
            longitude: 31.4927607,
            timestramp: "1587435677000",
            speed: 54,
            direction: 320,
          },
          {
            latitude: 120.4794185,
            longitude: 31.49454,
            timestramp: "1587435692000",
            speed: 68,
            direction: 321,
          },
          {
            latitude: 120.477771,
            longitude: 31.4963937,
            timestramp: "1587435707000",
            speed: 59,
            direction: 323,
          },
          {
            latitude: 120.4765694,
            longitude: 31.4984609,
            timestramp: "1587435722000",
            speed: 70,
            direction: 345,
          },
          {
            latitude: 120.4766613,
            longitude: 31.5012505,
            timestramp: "1587435737000",
            speed: 81,
            direction: 13,
          },
          {
            latitude: 120.4779811,
            longitude: 31.5041902,
            timestramp: "1587435752000",
            speed: 91,
            direction: 26,
          },
          {
            latitude: 120.4799923,
            longitude: 31.5073482,
            timestramp: "1587435767000",
            speed: 92,
            direction: 27,
          },
          {
            latitude: 120.4821525,
            longitude: 31.5107482,
            timestramp: "1587435782000",
            speed: 112,
            direction: 27,
          },
          {
            latitude: 120.4844122,
            longitude: 31.5144046,
            timestramp: "1587435797000",
            speed: 107,
            direction: 28,
          },
          {
            latitude: 120.4867024,
            longitude: 31.5181118,
            timestramp: "1587435812000",
            speed: 116,
            direction: 28,
          },
          {
            latitude: 120.4890519,
            longitude: 31.5219617,
            timestramp: "1587435827000",
            speed: 115,
            direction: 27,
          },
          {
            latitude: 120.4914832,
            longitude: 31.5257784,
            timestramp: "1587435842000",
            speed: 117,
            direction: 28,
          },
          {
            latitude: 120.4938827,
            longitude: 31.5295657,
            timestramp: "1587435857000",
            speed: 113,
            direction: 28,
          },
          {
            latitude: 120.4962479,
            longitude: 31.5333605,
            timestramp: "1587435872000",
            speed: 117,
            direction: 28,
          },
          {
            latitude: 120.4986752,
            longitude: 31.5371967,
            timestramp: "1587435887000",
            speed: 116,
            direction: 28,
          },
          {
            latitude: 120.5012315,
            longitude: 31.5409102,
            timestramp: "1587435902000",
            speed: 114,
            direction: 31,
          },
          {
            latitude: 120.5040233,
            longitude: 31.5444862,
            timestramp: "1587435917000",
            speed: 112,
            direction: 36,
          },
          {
            latitude: 120.5064765,
            longitude: 31.5471952,
            timestramp: "1587435932000",
            speed: 75,
            direction: 37,
          },
          {
            latitude: 120.5081163,
            longitude: 31.5488441,
            timestramp: "1587435947000",
            speed: 45,
            direction: 40,
          },
          {
            latitude: 120.509463,
            longitude: 31.5500941,
            timestramp: "1587435962000",
            speed: 50,
            direction: 40,
          },
          {
            latitude: 120.5110885,
            longitude: 31.5515948,
            timestramp: "1587435977000",
            speed: 58,
            direction: 41,
          },
          {
            latitude: 120.5129688,
            longitude: 31.5533231,
            timestramp: "1587435992000",
            speed: 66,
            direction: 42,
          },
          {
            latitude: 120.5153963,
            longitude: 31.5555512,
            timestramp: "1587436007000",
            speed: 96,
            direction: 42,
          },
          {
            latitude: 120.518382,
            longitude: 31.558309,
            timestramp: "1587436022000",
            speed: 104,
            direction: 41,
          },
          {
            latitude: 120.5213711,
            longitude: 31.561157,
            timestramp: "1587436037000",
            speed: 102,
            direction: 42,
          },
          {
            latitude: 120.5241372,
            longitude: 31.5637695,
            timestramp: "1587436052000",
            speed: 83,
            direction: 40,
          },
          {
            latitude: 120.5263244,
            longitude: 31.5663771,
            timestramp: "1587436067000",
            speed: 84,
            direction: 31,
          },
          {
            latitude: 120.5281534,
            longitude: 31.5692285,
            timestramp: "1587436082000",
            speed: 88,
            direction: 25,
          },
          {
            latitude: 120.529652,
            longitude: 31.5723777,
            timestramp: "1587436097000",
            speed: 93,
            direction: 18,
          },
          {
            latitude: 120.530786,
            longitude: 31.5762677,
            timestramp: "1587436112000",
            speed: 114,
            direction: 10,
          },
          {
            latitude: 120.5313117,
            longitude: 31.5805571,
            timestramp: "1587436127000",
            speed: 119,
            direction: 5,
          },
          {
            latitude: 120.5320507,
            longitude: 31.5849722,
            timestramp: "1587436142000",
            speed: 117,
            direction: 10,
          },
          {
            latitude: 120.5332895,
            longitude: 31.5893929,
            timestramp: "1587436157000",
            speed: 121,
            direction: 14,
          },
          {
            latitude: 120.5349798,
            longitude: 31.5938523,
            timestramp: "1587436172000",
            speed: 119,
            direction: 20,
          },
          {
            latitude: 120.5367485,
            longitude: 31.5976527,
            timestramp: "1587436187000",
            speed: 102,
            direction: 20,
          },
          {
            latitude: 120.5382292,
            longitude: 31.6013459,
            timestramp: "1587436202000",
            speed: 101,
            direction: 15,
          },
          {
            latitude: 120.5389361,
            longitude: 31.6050953,
            timestramp: "1587436217000",
            speed: 107,
            direction: 5,
          },
          {
            latitude: 120.5390498,
            longitude: 31.6090216,
            timestramp: "1587436232000",
            speed: 99,
            direction: 357,
          },
          {
            latitude: 120.5387724,
            longitude: 31.6122427,
            timestramp: "1587436247000",
            speed: 59,
            direction: 355,
          },
          {
            latitude: 120.538794,
            longitude: 31.6141762,
            timestramp: "1587436262000",
            speed: 51,
            direction: 11,
          },
          {
            latitude: 120.5398729,
            longitude: 31.6156392,
            timestramp: "1587436276000",
            speed: 45,
            direction: 20,
          },
          {
            latitude: 120.5398908,
            longitude: 31.6158672,
            timestramp: "1587436278000",
            speed: 44,
            direction: 1,
          },
          {
            latitude: 120.5398056,
            longitude: 31.616073,
            timestramp: "1587436280000",
            speed: 43,
            direction: 340,
          },
          {
            latitude: 120.5395479,
            longitude: 31.6163203,
            timestramp: "1587436283000",
            speed: 44,
            direction: 310,
          },
          {
            latitude: 120.5392784,
            longitude: 31.6164268,
            timestramp: "1587436285000",
            speed: 47,
            direction: 295,
          },
          {
            latitude: 120.5389769,
            longitude: 31.6165049,
            timestramp: "1587436287000",
            speed: 51,
            direction: 286,
          },
          {
            latitude: 120.5386453,
            longitude: 31.6165693,
            timestramp: "1587436289000",
            speed: 54,
            direction: 285,
          },
          {
            latitude: 120.5364305,
            longitude: 31.6173391,
            timestramp: "1587436304000",
            speed: 48,
            direction: 314,
          },
          {
            latitude: 120.535739,
            longitude: 31.6188074,
            timestramp: "1587436319000",
            speed: 31,
            direction: 339,
          },
          {
            latitude: 120.5350856,
            longitude: 31.6200709,
            timestramp: "1587436334000",
            speed: 43,
            direction: 340,
          },
          {
            latitude: 120.5347885,
            longitude: 31.6224311,
            timestramp: "1587436349000",
            speed: 69,
            direction: 1,
          },
          {
            latitude: 120.5349635,
            longitude: 31.6234286,
            timestramp: "1587436356000",
            speed: 47,
            direction: 19,
          },
          {
            latitude: 120.5351021,
            longitude: 31.6236166,
            timestramp: "1587436358000",
            speed: 44,
            direction: 34,
          },
          {
            latitude: 120.535298,
            longitude: 31.6237319,
            timestramp: "1587436360000",
            speed: 40,
            direction: 54,
          },
          {
            latitude: 120.5355278,
            longitude: 31.6237758,
            timestramp: "1587436362000",
            speed: 37,
            direction: 76,
          },
          {
            latitude: 120.5358794,
            longitude: 31.6236595,
            timestramp: "1587436365000",
            speed: 35,
            direction: 115,
          },
          {
            latitude: 120.5360544,
            longitude: 31.6233812,
            timestramp: "1587436368000",
            speed: 36,
            direction: 156,
          },
          {
            latitude: 120.536048,
            longitude: 31.6230594,
            timestramp: "1587436371000",
            speed: 38,
            direction: 190,
          },
          {
            latitude: 120.5358884,
            longitude: 31.6227536,
            timestramp: "1587436374000",
            speed: 43,
            direction: 210,
          },
          {
            latitude: 120.5356788,
            longitude: 31.6225602,
            timestramp: "1587436376000",
            speed: 49,
            direction: 223,
          },
          {
            latitude: 120.535416,
            longitude: 31.6223839,
            timestramp: "1587436378000",
            speed: 54,
            direction: 230,
          },
          {
            latitude: 120.5331515,
            longitude: 31.6213511,
            timestramp: "1587436393000",
            speed: 52,
            direction: 249,
          },
          {
            latitude: 120.5308565,
            longitude: 31.6209446,
            timestramp: "1587436408000",
            speed: 55,
            direction: 262,
          },
          {
            latitude: 120.5284696,
            longitude: 31.6207731,
            timestramp: "1587436423000",
            speed: 48,
            direction: 266,
          },
          {
            latitude: 120.5274841,
            longitude: 31.6209465,
            timestramp: "1587436439000",
            speed: 6,
            direction: 305,
          },
          {
            latitude: 120.5277662,
            longitude: 31.6208191,
            timestramp: "1587436453000",
            speed: 10,
            direction: 263,
          },
          {
            latitude: 120.5270289,
            longitude: 31.6207809,
            timestramp: "1587436468000",
            speed: 14,
            direction: 300,
          },
          {
            latitude: 120.5269455,
            longitude: 31.6211394,
            timestramp: "1587436474000",
            speed: 31,
            direction: 356,
          },
          {
            latitude: 120.5269455,
            longitude: 31.6211394,
            timestramp: "1587436477000",
            speed: 30,
            direction: 356,
          },
          {
            latitude: 120.5268765,
            longitude: 31.6233002,
            timestramp: "1587436492000",
            speed: 60,
            direction: 357,
          },
          {
            latitude: 120.5268589,
            longitude: 31.6242142,
            timestramp: "1587436507000",
            speed: 7,
            direction: 349,
          },
          {
            latitude: 120.5267969,
            longitude: 31.6252332,
            timestramp: "1587436522000",
            speed: 58,
            direction: 357,
          },
          {
            latitude: 120.5266555,
            longitude: 31.6275033,
            timestramp: "1587436537000",
            speed: 35,
            direction: 352,
          },
          {
            latitude: 120.5266704,
            longitude: 31.6278729,
            timestramp: "1587436582000",
            speed: 26,
            direction: 357,
          },
          {
            latitude: 120.5265876,
            longitude: 31.6296479,
            timestramp: "1587436597000",
            speed: 56,
            direction: 357,
          },
          {
            latitude: 120.5265187,
            longitude: 31.6317287,
            timestramp: "1587436612000",
            speed: 54,
            direction: 358,
          },
          {
            latitude: 120.5264736,
            longitude: 31.6330893,
            timestramp: "1587436627000",
            speed: 22,
            direction: 358,
          },
          {
            latitude: 120.526452,
            longitude: 31.6336126,
            timestramp: "1587436672000",
            speed: 22,
            direction: 356,
          },
          {
            latitude: 120.5264124,
            longitude: 31.6344749,
            timestramp: "1587436687000",
            speed: 26,
            direction: 354,
          },
          {
            latitude: 120.5263787,
            longitude: 31.6352835,
            timestramp: "1587436702000",
            speed: 21,
            direction: 356,
          },
          {
            latitude: 120.5263267,
            longitude: 31.6364322,
            timestramp: "1587436717000",
            speed: 36,
            direction: 358,
          },
          {
            latitude: 120.5263007,
            longitude: 31.6378804,
            timestramp: "1587436732000",
            speed: 29,
            direction: 359,
          },
          {
            latitude: 120.5262951,
            longitude: 31.6383922,
            timestramp: "1587436747000",
            speed: 5,
            direction: 353,
          },
          {
            latitude: 120.5262812,
            longitude: 31.6385927,
            timestramp: "1587436807000",
            speed: 9,
            direction: 359,
          },
          {
            latitude: 120.5262197,
            longitude: 31.6392187,
            timestramp: "1587436822000",
            speed: 18,
            direction: 1,
          },
          {
            latitude: 120.5262241,
            longitude: 31.6398234,
            timestramp: "1587436927000",
            speed: 33,
            direction: 356,
          },
          {
            latitude: 120.5239905,
            longitude: 31.686592,
            timestramp: "1587437404000",
            speed: 33,
            direction: 5,
          },
          {
            latitude: 120.5240009,
            longitude: 31.6869087,
            timestramp: "1587437407000",
            speed: 39,
            direction: 4,
          },
          {
            latitude: 120.5242119,
            longitude: 31.6895062,
            timestramp: "1587437423000",
            speed: 62,
            direction: 5,
          },
          {
            latitude: 120.5242242,
            longitude: 31.689828,
            timestramp: "1587437425000",
            speed: 60,
            direction: 5,
          },
          {
            latitude: 120.525034,
            longitude: 31.6979052,
            timestramp: "1587437508000",
            speed: 38,
            direction: 3,
          },
          {
            latitude: 120.5250361,
            longitude: 31.6981463,
            timestramp: "1587437511000",
            speed: 39,
            direction: 3,
          },
          {
            latitude: 120.5250065,
            longitude: 31.6987419,
            timestramp: "1587437518000",
            speed: 23,
            direction: 343,
          },
          {
            latitude: 120.5248047,
            longitude: 31.698906,
            timestramp: "1587437522000",
            speed: 28,
            direction: 292,
          },
          {
            latitude: 120.5243343,
            longitude: 31.6989705,
            timestramp: "1587437526000",
            speed: 41,
            direction: 275,
          },
          {
            latitude: 120.5092162,
            longitude: 31.700633,
            timestramp: "1587437762000",
            speed: 11,
            direction: 3,
          },
          {
            latitude: 120.509415,
            longitude: 31.7014512,
            timestramp: "1587438348000",
            speed: 2,
            direction: 46,
          },
          {
            latitude: 120.5102815,
            longitude: 31.7013752,
            timestramp: "1587527665000",
            speed: 0,
            direction: 0,
          },
        ];
        if (temp.length > 0) {
          temp.map((ele) => {
            let tempArr = [];
            tempArr.push(ele.latitude);
            tempArr.push(ele.longitude);
            //格式转换后push进电池经纬度
            that.markerArr.push(tempArr);
          });
          that.$nextTick(() => {
            //画线
            that.playLine();
          });
        } else {
          that.$notify({
            title: "提醒",
            message: "此范围内暂无轨迹！",
            type: "warning",
            duration: 4000,
          });
        }
      }, 1000);
    },
    //画线
    playLine() {
      let that = this;
      //初始化起点终点
      that.initStartEnd();
      that.marker = new AMap.Marker({
        map: that.map,
        //小车出初始位置
        position: that.markerArr[0],
        // icon: "https://webapi.amap.com/images/car.png",
        // icon: "../../assets/imgs/car.gif",
        icon: carImg,
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true,
        // angle: -90,
        angle: 270,
      });
      // 绘制轨迹
      that.polyline = new AMap.Polyline({
        map: that.map,
        path: that.markerArr,
        showDir: true,
        strokeColor: "#28F", //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6, //线宽
        // strokeStyle: "solid"  //线样式
      });
      //小车移动的轨迹线
      that.passedPolyline = new AMap.Polyline({
        map: that.map,
        // path: that.markerArr,
        strokeColor: "#AF5", //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6, //线宽
        // strokeStyle: "solid"  //线样式
      });
      //marker移动时把经纬度传给小车移动的轨迹线
      that.marker.on("moving", function (e) {
        //设置组成该折线的节点数组
        that.passedPolyline.setPath(e.passedPath);
      });
      // marker开始移动
      that.marker.moveAlong(that.markerArr, 200);
      //自适应放大
      setTimeout(() => {
        that.map.setFitView();
      }, 500);
    },
    //初始化起点终点
    initStartEnd() {
      let that = this;
      //将icon添加进marker
      let startMarker = new AMap.Marker({
        position: new AMap.LngLat(that.markerArr[0][0], that.markerArr[0][1]),
        icon: that.startIcon,
        offset: new AMap.Pixel(-13, -30),
      });
      //将icon添加进marker
      let endMarker = new AMap.Marker({
        position: new AMap.LngLat(
          that.markerArr.pop()[0],
          that.markerArr.pop()[1]
        ),
        icon: that.endIcon,
        offset: new AMap.Pixel(-13, -30),
      });
      // 将 markers 添加到地图
      that.map.add([startMarker, endMarker]);
    },
    //关闭弹窗时
    closeBatteryHistroy() {
      this.selectedDate = [];
      this.markerArr = []; //电池经纬度,也用于画线
    },
  },
  //  mounted(){
  //      this.initMap();
  //  }
};
</script>
 
 <style scoped>
</style>