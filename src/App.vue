<template>
  <div class="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isRouterAlive:true
    }
  },
components: {
  },
  provide(){
    return {
      reload:this.reload
    }
  },
  methods: {
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(()=>{//DOM更新完成
        this.isRouterAlive = true;
      })
    }
  },
}
</script>
<style>

  .el-cascader-menu__list {
  height: 200px !important;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
  .avatar {
    width: 130px;
    height: 130px;
    display: block;
  }
</style>