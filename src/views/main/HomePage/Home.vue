<template>
  <div>
    <section class="data_section">
      <header class="section_title">数据统计</header>
      <!-- <el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{}}</span> 新增用户</div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{}}</span> 新增订单</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{}}</span> 新增管理员</div></el-col>
			</el-row> -->
      <el-row :gutter="20">
        <el-col :span="4"
          ><div class="data_list all_head">
            <span class="data_num head">总数据：</span>
          </div></el-col
        >
        <el-col :span="4"
          ><div class="data_list">
            <span class="data_num">{{ Customertotal }}</span> 注册用户
          </div></el-col
        >
        <el-col :span="4"
          ><div class="data_list">
            <span class="data_num">{{ Shoptotal }}</span> 注册商铺
          </div></el-col
        >
        <el-col :span="4"
          ><div class="data_list">
            <span class="data_num">{{ Producttotal }}</span> 注册商品
          </div></el-col
        >
        <el-col :span="4"
          ><div class="data_list">
            <span class="data_num">{{ Usertotal }}</span> 管理员
          </div></el-col
        >
      </el-row>
    </section>
    <div >     
      <div ref="echartestOne" style="width: 500px; height: 400px; margin-left:250px"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      Usertotal: 0,
      Producttotal: 0,
      Customertotal: 0,
      Shoptotal: 0,
    };
  },

  mounted() {
    this.$api.usertotal().then((res) => {
      if (res.data.status == 200) {
        this.Usertotal = res.data.result[0]["count(*)"];
      }
    });
    this.$api.total().then((res) => {
      if (res.data.status === 200) {
        this.Producttotal = res.data.result[0]["count(*)"];
      }
    });
    this.$api.customertotal().then((res) => {
      if (res.data.status == 200) {
        this.Customertotal = res.data.result[0]["count(*)"];
      }
    });
    this.$api.shoptotal().then((res) => {
      if (res.data.status === 200) {
        this.Shoptotal = res.data.result[0]["count(*)"];
      }
    });

    var that = this;
    setTimeout(function () {
      that.setTest();
    }, 500);
  },
  methods: {
    setTest() {
      let myChart = echarts.init(this.$refs.echartestOne);
      let option = {
        xAxis: {
          type: "category",
          data: ["注册用户", "注册商铺", "商品", "管理员"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [this.Customertotal, this.Shoptotal, this.Producttotal,this.Usertotal],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less">
@import "../../../style//mixin.less";
.data_section {
  padding: 20px;
  margin-bottom: 40px;
  .section_title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  
 }
  .data_list {
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #e5e9f2;
    .data_num {
      color: #333;
      font-size: 26px;

    }
    .head {
      border-radius: 6px;
      font-size: 22px;
      padding: 4px 0;
      color: #fff;
      display: inline-block;
    }
  }
  .today_head {
    background: #ff9800;
  }
  .all_head {
    background: #20a0ff;
  }
}
.wan {
  .sc(16px, #333);
}

</style>
