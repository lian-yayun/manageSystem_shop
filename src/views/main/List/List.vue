<template>
<div style="padding:20px">
    <div class="head" style="padding-right:755px;">
      <listEdit></listEdit>
    <el-form ref="searchForm" :model="search" @submit.native.prevent>
      <el-form-item>
        <el-input v-model="search.content" @keyup.enter.native="onSubmitSearch" placeholder="订单号/商品..">
        </el-input>
          <img style="margin-bottom:-10px" src="@/assets/images/searchlogo.png" alt="" @click="onSubmitSearch">
      </el-form-item>
    </el-form>
  </div>
  <div style="float:left">
  <!-- <el-button @click="resetDateFilter">清除日期过滤器</el-button> -->
  <el-button @click="clearFilter">清除所有过滤器</el-button>
    </div>
  
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%">
      <el-table-column
      prop="id"
      label="订单编号">
    </el-table-column>
    <el-table-column
       :formatter="formatDate"
      prop="creatData"
      label="日期"
      sortable
      width="150"
      column-key="date"
    >
    </el-table-column>
    <el-table-column
      prop="Pname"
      label="名字">
    </el-table-column>
    <el-table-column
      prop="num"
      label="数量"
      
      >
    </el-table-column>
 <el-table-column
      prop="sumPay"
      label="总价"
     
      >
    </el-table-column> 

    <el-table-column
      prop="tag"
      label="状态"
      :filters="[{ text: '已完成', value: '已完成' }, { text: '未完成', value: '未完成' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === '已完成' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.tag}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="管理员专属权限" v-if="adminZS">
      <template v-slot="scope">
        <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
        <el-button type="text" @click="handleEdit(scope.$index, scope.row)" size="small">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
    <el-table-column label="操作" v-else="vipZS">
      <template v-slot="scope">
        <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
        <el-button type="text" @click="handleEdit(scope.$index, scope.row)" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
    
  </div>
</template>

<script>
import listEdit from './ListEdit'
  export default {
    data() {
      return {
           zhanghao: '',
			adminZS:false,
			vipZS:false,
        tableData: [],
 search: {
        content: "",
      },
      }
    },
    mounted() {
       this.user = JSON.parse(localStorage.getItem("limbo"))
                this.zhanghao = this.user.username
    if (this.zhanghao == "admin") {
      this.adminZS = true;
    }else{
			this.vipZS = true;
		}
       this.http(1);
          this.$bus.$on("searchDataaaa", (data) => {
      this.tableData = data;
    });
      this.$bus.$on("refresh", () => {
        this.http(1)
    });
    },
    methods: {
      http(page) {
      this.$api.selectList({ page }).then((res) => {
        if (res.data.status == 200) {
          this.tableData = res.data.result;
          console.log(this);
        }
      });
    },
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('creatData');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleDelete(index, row) {
      console.log(row);
      this.$confirm("删除该订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //确定删除
          this.$api.deleteList({ id: row.id }).then((res) => {
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
     formatDate (row, column) {
        let data = row[column.property]
        if (data == null) {
          return null
        }
        let dt = new Date(data)
        return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
      },
        onSubmitSearch() {
      if (this.search.content) {
        //查询操作
        this.$api
          .searchList({
            search: this.search.content,
          })
          .then((res) => {
            // console.log(res.data);
            if (res.data.status === 200) {
              this.$bus.$emit("searchDataaaa", res.data.result);
            }
          });
      } else {
        console.log("请输入数据");
      }
    },
      handleEdit(index, row) {
      this.$bus.$emit("ListEditorEvent", row);
    },
    },
    components:{
      listEdit
    }
  }
</script>
<style scoped lang="less">
.head{
  .el-form{
.el-form-item{
.el-input{
 width:200px;height:35px;
 border-radius: 15px !important;
}
}
  }}
.el-table td.el-table__cell div {
    box-sizing: border-box;
    text-align: center;
}
.el-table th.el-table__cell>.cell {
    text-align: center;
}
</style>