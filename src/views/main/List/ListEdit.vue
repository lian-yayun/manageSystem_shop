<template>
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-radio v-model="radio" label="已完成"></el-radio>
  <el-radio v-model="radio" label="未完成"></el-radio>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editorProductHandle">确 定</el-button>
  </span>
</el-dialog>
  
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
         radio: '',
           currentData: {},
      };
    },
    mounted() {
      //预更新
      this.$bus.$on("ListEditorEvent",row=>{
 this.currentData = row;
this.dialogVisible=true;
  this.$api.preUpdateList({ id: row.id }).then((res) => {
        //赋值
        this.radio = res.data.result[0].tag;
      });
      });
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
       //重新提交数据
    editorProductHandle() {
            this.$api.updateList({
                id:this.currentData.id,
                tag:this.radio,
            }).then(res =>{
                if(res.data.status === 200){
                    this.dialogVisible = false;
                    this.$bus.$emit("refresh",true)
                }
            }).catch(error =>{
                console.log(error);
            })
        },
    }
  };
</script>