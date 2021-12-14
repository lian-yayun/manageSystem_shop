<template>
<div>
  <el-upload
  ref="upload"
  action="http://localhost:3000/api/upload"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :on-success="handleSuccess"
  >
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
</div>
</template>

<script>
export default {
 data() {
      return {
        fileList:[],
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSuccess(response){
console.log(response);
this.$emit("onUploadShop",response)
      }
    }
}
</script>

<style>
.el-upload--picture-card{
  width: 130px;
    height: 130px;
    line-height: 130px;
    /* float: left; */
}
.el-upload-list--picture-card .el-upload-list__item{

   width: 130px;
    height: 130px;
}


</style>