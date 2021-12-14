<template>
  <el-dialog title="提示" :visible.sync="xiangqing" width="30%">
    <div style="text-align: left">
      退款单号: <span>{{ this.currentData.id }}</span>
    </div>
    <br />
    <div style="text-align: left">
      客户: <span>{{ this.name }}</span>
    </div>
    <br />
    <div style="text-align: left">
      退款金额: <span>{{ this.money }}</span>
    </div>
    <br />
    <div style="text-align: left">
          <!-- 申请日期: <span>{{this.backData }}</span> -->
          <span>申请日期:{{this.backData | formatTime('yyyy-MM-dd hh:mm:ss')}}</span>
    </div>
    <br />
    <div style="text-align: left">
      状态: <el-tag size="small">{{ this.waitState }}</el-tag>
    </div>
    <br />
    <div style="text-align: left">
      退货理由：<span>{{ this.reason }}</span>
    </div>
    <br />
     <div style="text-align: left;" v-show="waitchecked">
      审核结果：<span>{{ this.result }}</span>
    </div>
    <br />
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      xiangqing: false,
      currentData: {},
      name: "",
      money: "",
      backData: "",
      waitState: "",
      reason: "",
      result:"",
      waitchecked:false,
    };
  },
  mounted() {
    this.$bus.$on("xiangqing", (row) => {
      this.currentData = row;
      this.xiangqing = true;
      this.$api.prebackList({ id: row.id }).then((res) => {
        console.log(res.data.result[0]);
        this.name = res.data.result[0].name;
        this.money = res.data.result[0].money;
        this.backData = res.data.result[0].backData;
        this.waitState = res.data.result[0].waitState;
        this.reason = res.data.result[0].reason;
        this.result =res.data.result[0].result;
        this.$bus.$emit("reasonn",res.data.result[0].reason);
        let a=this;
        a.$nextTick(function() {
          if (res.data.result[0].result==null) {
            console.log("wait");
            a.waitchecked=false
          }else{
            console.log("checked");
            a.waitchecked=true
          }
        },
        )
      });
    });
  },
  methods: {
  
  },
  filters: {
            formatTime: function (date, fmt) {
                var date = new Date(date);
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                var o = {
                    'M+': date.getMonth() + 1,
                    'd+': date.getDate(),
                    'h+': date.getHours(),
                    'm+': date.getMinutes(),
                    's+': date.getSeconds()
                };
                for (var k in o) {
                    if (new RegExp('('+k+')').test(fmt)) {
                        var str = o[k] + '';
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
                    }
                }
                return fmt;
            }
        }
};
</script>

