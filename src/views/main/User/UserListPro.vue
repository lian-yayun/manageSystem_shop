<template>
  <div style="padding: 20px">
    <div class="head">
      <el-form ref="searchForm" :model="search" @submit.native.prevent>
        <el-form-item>
          <el-input
            v-model="search.content"
            @keyup.enter.native="onSubmitSearch"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="200px"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="200px">
      </el-table-column>
      <el-table-column prop="email" label="Email"> </el-table-column>
      <el-table-column 
      :formatter="formatDate"
      prop="creat_time" 
      label="注册时间"
      >
        <!-- <template slot-scope="scope">
      {{FormatDate(scope.row.creat_time)}}
        <i class="el-icon-time"></i>
     </template> -->
      </el-table-column>
       <el-table-column label="操作">
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">注销</el-button>
      </template>
    </el-table-column>
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
      search: {
        content: "",
      },
      tableData: [],
      total: 0,
      currentPage: 1,
    };
  },
  mounted() {
    this.http(1);
    this.$bus.$on("pageee", (page) => {
      this.http(page);
    });
    this.$bus.$on("searchDataaa", (data) => {
      this.tableData = data;
    });
    this.$api.usertotal().then((res) => {
      if (res.data.status == 200) {
        this.total = res.data.result[0]["count(*)"];
      }
    });
  },
  methods: {
    http(page) {
      this.$api.selectUserAllByPage({ page }).then((res) => {
        if (res.data.status == 200) {
          this.tableData = res.data.result;
        }
      });
    },
    handleSizechange() {},
    handleCurrentChange(val) {
      this.$bus.$emit("pageee", val);
    },
    onSubmitSearch() {
      if (this.search.content) {
        //查询操作
        this.$api
          .searchuser({
            search: this.search.content,
          })
          .then((res) => {
            // console.log(res.data);
            if (res.data.status === 200) {
              this.$bus.$emit("searchDataaa", res.data.result);
            }
          });
      } else {
        console.log("请输入数据");
      }
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
      this.$confirm("注销该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //确定删除
          this.$api.deleteUser({ id: row.id }).then((res) => {
            if (res.data.status == 200) {
              this.$message({
                type: "success",
                message: "已注销!",
              });
              this.http(1);
            } else {
              this.$message({
                type: "error",
                message: "注销失败!",
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
  },
};
</script>

<style scoped lang="less">
.head {
  margin-top: 20px;
  width: 100%;
  .el-form {
    overflow: hidden;
    clear: both;
    .el-form-item {
      float: left;
      margin-right: 10px;

      .el-button {
        background-color: #ba7771;
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