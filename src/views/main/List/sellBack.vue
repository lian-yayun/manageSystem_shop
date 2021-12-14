<template>

<div>

  <div id="hh">
    <h4 style="
    color: rgb(99 99 99);
    float: left;
    margin-top: 13px;
    margin-left: 15px;
    width:150px
">退货原因设置</h4>
<el-button style="float: right; margin-top: 5px;margin-right: 40px;background-color:orange;color:white;"
 @click="addFormHandle"
>
  <i class="el-icon-plus"></i>新建原因</el-button>
  </div>
  <div class="back-container">
<sellbackedit></sellbackedit>
      <sellbackadd></sellbackadd>
  <el-table
    :data="tableData"
    style="width: 100%;"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    
    <el-table-column
    style="text-align: center;"
    id="reason1"
      prop="reason"
      label="原因类型"
      width="250px"
      sortable>
    </el-table-column>
    <el-table-column
         :formatter="formatDate"
      prop="creatData"
      label="日期"
      sortable>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button  type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button type="text" size="small"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
  
  </div>
</template>

<script>
import sellbackadd from './sellBackAdd.vue'
import sellbackedit from './sellBackEdit.vue'
  export default {
    data() {
      return {
          tableData: [],
           
      }
    },
    mounted() {
     
      this.http(1)
 
      this.$bus.$on("refresh",()=>{
        this.http(1)
      })
      
     
    },
    methods: {
            http(page) {
      this.$api.selectBack({ page }).then((res) => {
        if (res.data.status == 200) {
          this.tableData = res.data.result;
          console.log(this);
        }
      });
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
      this.$confirm("删除该原因?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //确定删除
          this.$api.deleteSellBack({ id: row.id }).then((res) => {
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
      addFormHandle(){
            this.$bus.$emit("onAddEvent",true)
        },
        handleEdit(index, row) {
      this.$bus.$emit("BackEditor", row);
    },
       },
     components:{
       sellbackadd,
       sellbackedit
     }
  }
</script>


<style>
#hh{
background-color: #fff;
width: 1025px;
height: 50px;
border: 1px solid #DCDFE6;
margin-left: 20px;
margin-right: 20px;
}
.back-container{
  padding-left: 20px;
  padding-right: 20px;
}
.el-table td.el-table__cell div {
    box-sizing: border-box;
    text-align: center;
}
.el-table th.el-table__cell>.cell {
    text-align: center;
}
</style>