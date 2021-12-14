<template>
  <div class="echarts">
    <div :style="{ height: '500px', width: '100%' }" ref="myEchart"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
//   import '../../node_modules/echarts/map/js/world.js'
import "../../../assets/js/china.js"; // 引入中国地图数据
export default {
  name: "echarts",
  props: ["userJson"],
  data() {
    return {
      fujian: "",
      guangdong: "",
      shanghai: "",
      jiangsu: "",
      beijing: "",
      yunnan: "",
      guizhou: "",
      hainan: "",
      gansu: "",
      chart: null,
    };
  },
  mounted() {
    var _this = this;
    this.$api.customerFujian().then((res) => {
      if (res.data.status == 200) {
        _this.fujian = res.data.result.length;
      }
    });
    this.$api.customerGuangdong().then((res) => {
      if (res.data.status == 200) {
        _this.guangdong = res.data.result.length;
      }
    });
    this.$api.customerShanghai().then((res) => {
      if (res.data.status == 200) {
        _this.shanghai = res.data.result.length;
      }
    });
    this.$api.customerJiangsu().then((res) => {
      if (res.data.status == 200) {
        _this.jiangsu = res.data.result.length;
      }
    });
    this.$api.customerBeijing().then((res) => {
      if (res.data.status == 200) {
        _this.beijing = res.data.result.length;
      }
    });
    this.$api.customerGansu().then((res) => {
      if (res.data.status == 200) {
        _this.gansu = res.data.result.length;
      }
    });
    this.$api.customerYunnan().then((res) => {
      if (res.data.status == 200) {
        _this.yunnan = res.data.result.length;
      }
    });
    this.$api.customerGuizhou().then((res) => {
      if (res.data.status == 200) {
        _this.guizhou = res.data.result.length;
      }
    });
    this.$api.customerHainan().then((res) => {
      if (res.data.status == 200) {
        _this.hainan = res.data.result.length;
      }
    });
    setTimeout(() => {
      this.chinaConfigure();
    }, 200);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    chinaConfigure() {
      console.log(this.userJson);
      let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
      window.onresize = myChart.resize;
      myChart.setOption({
        // 进行相关配置
        // backgroundColor: "red",
        tooltip: {}, // 鼠标移到图里面的浮动提示框
        dataRange: {
          show: true,
          min: 0,
          max: 1000,
          text: ["High", "Low"],
          realtime: true,
          calculable: true,
          color: ["orangered", "yellow", "lightskyblue"],
        },
        geo: {
          // 这个是重点配置区
          map: "china", // 表示中国地图
          roam: true,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: "rgba(0,0,0,0.4)",
              },
            },
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)",
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
        series: [
          {
            type: "scatter",
            coordinateSystem: "geo", // 对应上方配置
          },
          {
            name: "启动次数", // 浮动框的标题
            type: "map",
            geoIndex: 0,
            data: [
              {
                name: "福建",
                value: this.fujian,
              },
              {
                name: "广东",
                value: this.guangdong,
              },
              {
                name: "上海",
                value: this.shanghai,
              },
              {
                name: "江苏",
                value: this.jiangsu,
              },
              {
                name: "北京",
                value: this.beijing,
              },
              {
                name: "甘肃",
                value: this.gansu,
              },
              {
                name: "云南",
                value: this.yunnan,
              },
              {
                name: "贵州",
                value: this.guizhou,
              },
              {
                name: "海南",
                value: this.hainan,
              },
            ],
          },
        ],
      });
    },
  },
};
</script>