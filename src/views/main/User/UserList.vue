<template>
<div style="padding:20px">
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="ID" width="200px"> </el-table-column>
    <el-table-column prop="username" label="用户名" width="200px"> </el-table-column>
    <el-table-column prop="email" label="Email"> </el-table-column>
        <el-table-column prop="creat_time"   :formatter="formatDate" label="注册时间"> </el-table-column>
  </el-table>
 <el-pagination
    layout="prev, pager, next,jumper"
    @current-change="handleCurrentChange"
    :total="total"
    :current-page.sync="currentPage"
    @size-change="handleSizechange"
    >
  </el-pagination>
</div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      total:0,
currentPage:1,
    };
  },
  mounted() {
    this.http(1);
    this.$bus.$on("pageee",page=>{
      this.http(page);
    });
    this.$api.usertotal().then(res=>{
      if (res.data.status==200) {
       this.total=res.data.result[0]["count(*)"];
      }
    })
   
  },
  methods: {
  http(page){
this.$api.selectUserAllByPage({page}).then((res) => {
      if (res.data.status == 200) {
        // console.log(res.data);
        this.tableData = res.data.result;
      }
    });
  },
   handleSizechange(){
    
   },
    handleCurrentChange(val){
 this.$bus.$emit("pageee",val)
   },
     formatDate (row, column) {
        let data = row[column.property]
        if (data == null) {
          return null
        }
        let dt = new Date(data)
        return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
      },
  },
};
</script>

<style>
</style>