<template>
<div class="backlistcontainer">
  <preback></preback>
  <backCheck></backCheck>
<div class="head">
    <el-form ref="searchForm" :model="search" @submit.native.prevent>
      <el-form-item>
        <el-input v-model="search.content" @keyup.enter.native="onSubmitSearch" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="退款单号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="客户名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="money"
      label="退款金额">
    </el-table-column>
     <el-table-column
     :formatter="formatDate"
      prop="backData"
      label="退款时间"
      width="180px"
      >
    </el-table-column>
<el-table-column >
       <template slot-scope="props">
         <span>{{ props.row.result}}</span>
       </template>
    </el-table-column>
     <el-table-column
      prop="waitState"
      label="状态"
        width="100"
      :filters="[{ text: '已审核', value: '已审核' }, { text: '未审核', value: '未审核' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
         <template slot-scope="scope">
        <el-tag
          :type="scope.row.waitState === '已审核' ? 'success' : 'danger'"
          disable-transitions>{{scope.row.waitState}}</el-tag>
      </template>
    </el-table-column>
      <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button  type="text" size="small" @click="handleEdit(scope.$index, scope.row)" :disabled="item(scope.$index, scope.row)">审核</el-button>
        <span style="color:#409EFF"> | </span>
        <el-button  type="text" size="small" @click="preDetails(scope.$index,scope.row)" >详情</el-button>
        <span style="color:#409EFF"> | </span>
        <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="9"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>

</template>

<script>
import preback from './pre/preBack.vue'
import backCheck from './check/backCheck.vue'
  export default {
    data() {
      return {
        tableData: [],
        total:0,
        currentPage1:1,
         search:{
      content:""
    },
      }
    },
    mounted() {
        this.$bus.$on("pageshop", (page) => {
      this.http(page);
    });
    this.$bus.$on("pageshop",val=>{
      this.currentpage1=val;
    })
      this.http(1)
          this.$api.totalBList().then((res) => {
      if (res.data.status === 200) {
        this.total = res.data.result[0]["count(*)"];
      }
    });
     this.$bus.$on("refresh", () => {
      if (this.currentpage1==0) {
        this.http(1)
      }else{
   this.http(this.currentpage1);
      }
    });
 this.$bus.$on("searchDataaa", (data ) => {
      this.tableData = data;
    });
    },
    methods: {
      http(page){
      this.$api.selectBackList({ page }).then((res) => {
        if (res.data.status == 200) {
          this.tableData = res.data.result;
          console.log(res.data.result);
        }
      });
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleSizechange(val) {
    },
    handleCurrentChange(val) {
      this.$bus.$emit("pageshop", val);
    },
    filterTag(value, row) {
        return row.waitState === value;
      },
    preDetails(index,row){
      this.$bus.$emit("xiangqing",row);
    },
    formatDate (row, column) {
        let data = row[column.property]
        if (data == null) {
          return null
        }
        let dt = new Date(data)
        return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
      },
      handleDelete(index, row) {
      console.log(row);
      this.$confirm("删除该退款订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //确定删除
          this.$api.deleteSellBackList({ id: row.id }).then((res) => {
            if (res.data.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.http(1);
            } else {
              this.$message({
                type: "error",
                message: "删除失败!",
              });
            }
          });
        })
        .catch(() => {
          //取消删除
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  handleEdit(index,row){
    this.$bus.$emit("check",row)
  },
  item(index, row){
    console.log("h");
    console.log(row.result);
    if (row.result==null) {
     return false;
    }else{
      console.log("bukong");
      return true;
    }
  },
    onSubmitSearch(){
    if (this.search.content) {
      //查询操作
    this.$api.searchBacklist({
      search:this.search.content
    }).then(res=>{
      console.log(res.data);
      if (res.data.status===200) {
        this.$bus.$emit('searchDataaa',res.data.result)
      }
    })
    }else{
      console.log("请输入数据");
    }
  },
    },
    components:{
      preback,
      backCheck
    }
  }
</script>
<style scoped lang="less">
.backlistcontainer{
  padding:20px
}
.head {
    margin-top: 20px;
    width: 100%;
    .el-form {
    overflow: hidden;
    clear: both;
    .el-form-item {
        float: left;
        margin-right: 10px;
        
        .el-button{
          background-color: #BA7771;
          border: white;
        }
        .el-input {
            padding-left: 30px;
            width: 130vh;
        }
    }
}
}
</style>