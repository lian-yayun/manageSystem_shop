<template>
  <div class="head">
    <el-form ref="searchForm" :model="search" @submit.native.prevent>
      <el-form-item>
        <el-input v-model="search.content" @keyup.enter.native="onSubmitSearch"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
data() {
  return {
    search:{
      content:""
    }
  }
},
methods: {
  onSubmitSearch(){
    if (this.search.content) {
      //查询操作
    this.$api.search({
      search:this.search.content
    }).then(res=>{
      if (res.data.status===200) {
        this.$bus.$emit('searchData',res.data.result)
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
}
</script>

<style scoped lang="less">
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

.head {
    margin-top: 20px;
    width: 100%;
}
</style>