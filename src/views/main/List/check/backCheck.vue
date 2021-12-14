<template>
<el-dialog
  title="审核"
  :visible.sync="backcheck"
  width="30%"
  :before-close="handleClose">
 <div >
      退货理由：<span>{{ this.reason }}</span>
    </div>
    <br/>
    <el-button v-model="pase" type="primary" @click="editorcheck">同意</el-button>
     <el-button  v-model="refuse" @click="editorchecktwo">拒绝</el-button>
 
</el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        backcheck: false,
        currentData:{},
        reason:"",
        pase:"已同意",
        refuse:"已拒绝",
        checked:"已审核",
      };
    },
    mounted() {
      this.$bus.$on("check",val=>{
        this.currentData = val;
      this.backcheck = true;
     this.reason=val.reason;
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
          editorcheck() {
            this.$api.updateCheck({
                id:this.currentData.id,
                result:this.pase,
                waitState:this.checked,
            }).then(res =>{
                if(res.data.status === 200){
                    this.backcheck = false;
                    // this.$bus.$emit("jinyong",true);
                    this.$bus.$emit("refresh",true)
                }
            }).catch(error =>{
                console.log(error);
            })
        },
        editorchecktwo() {
            this.$api.updateCheck({
                id:this.currentData.id,
                result:this.refuse,
                waitState:this.checked,
            }).then(res =>{
                if(res.data.status === 200){
                  console.log(this.refuse);
                  // this.$bus.$emit("jinyong",true);
                    this.backcheck = false;
                    this.$bus.$emit("refresh",true)
                }
            }).catch(error =>{
                console.log(error);
            })
        },
    }
  };
</script>