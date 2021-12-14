<template>
  <div class="fillcontain">
    
    <div class="table_container">
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
      <EditorShop></EditorShop>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
             
              <el-form-item label="店铺名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺介绍">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="营业执照">
               <img :src="props.row.imagee" alt="" min-width="50" height="50">
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
             <el-table-column show-overflow-tooltip prop="image" label=" " width="100">
      <template slot-scope="scope">
        <img :src="scope.row.image" min-width="50" height="50" />
      </template>
    </el-table-column>
        <el-table-column label="店铺名称" prop="name" width="130px"> </el-table-column>
        <el-table-column label="店铺地址" prop="address" > </el-table-column>
        <el-table-column label="店铺介绍" prop="description"> </el-table-column>
    
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
           <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
           <el-button
                      size="mini"
                      type="Success"
                      @click="addFood(scope.$index, scope.row)">添加商品</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        layout="prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        :total="total"
        :current-page.sync="currentPage"
        @size-change="handleSizechange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import EditorShop from './EditorShop';
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
       search:{
      content:""
    },
    currentpage:0,
    };
  },
  components:{
EditorShop
  },
  mounted() {
    this.$api.shoptotal().then((res) => {
      if (res.data.status === 200) {
        this.total = res.data.result[0]["count(*)"];
      }
    });

    this.http(1);
    this.$bus.$on("pageshop", (page) => {
      this.http(page);
    });
    this.$bus.$on("searchDataa", (data ) => {
      this.tableData = data;
    });
    this.$bus.$on("pageshop",val=>{
      this.currentpage=val;
    })
    this.$bus.$on("refresh", () => {
      if (this.currentpage==0) {
        this.http(1)
      }else{
   this.http(this.currentpage);
      }
    });
  },
  methods: {
    http(page) {
      this.$api.selectTbshopAllByPage({ page }).then((res) => {
        if (res.data.status == 200) {
          this.tableData = res.data.result;
          console.log(this);
        }
      });
    },
   handleEdit(index, row) {
    //  console.log("hhhhhhhhhhhh");
     console.log(row);
     this.$bus.$emit("onEditor",row);},
    // ------------------------------------------------------------------------------------------------------------
    addFood(index, row) {
      this.$router.push({
        path: "productAdd",
        query: { restaurant_id: row.id },
      });
    },
    // ------------------------------------------------------------------------------------------------------------
    handleDelete(index, row) {
      console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //确定删除

          this.$api.deleteshopItemById({ id: row.id }).then((res) => {
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
    handleSizechange(val) {
    },
    handleCurrentChange(val) {
      this.$bus.$emit("pageshop", val);
    },
     onSubmitSearch(){
    if (this.search.content) {
      //查询操作
    this.$api.searchshop({
      search:this.search.content
    }).then(res=>{
      console.log(res.data);
      if (res.data.status===200) {
        this.$bus.$emit('searchDataa',res.data.result)
      }
    })
    }else{
      console.log("请输入数据");
    }
  },
  addFormHandle(){
    this.$bus.$emit("onAddEvent",true)
  }
  },
};
</script>

<style lang="less">
@import "../../../style/mixin";
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.table_container {
 padding: 20px;
}
.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
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