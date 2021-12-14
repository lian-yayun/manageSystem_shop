   <template>
  <el-dialog
    title="修改"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
    
  >
   <el-input v-model="reason"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addProductHandle">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
      return {
        dialogVisible: false,
        currentData:{},
        reason:'',
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      addProductHandle(){
            this.$api.updateReason({
                id:this.currentData.id,
                reason:this.reason,
            }).then(res =>{
                if(res.data.status === 200){
                    this.dialogVisible = false;
                     this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        });
                    this.$bus.$emit("refresh",true)
                }
            }).catch(error =>{
                console.log(error);
            })
      }
    },
  mounted() {
    //获取预更新数据
    this.$bus.$on("BackEditor", (row) => {
      this.dialogVisible = true;
      this.currentData = row;
      this.$api.preReason({ id: row.id }).then((res) => {
        //赋值
        console.log(res.data);
        this.reason = res.data.result[0].reason;
      });
    });
  },
}
</script>

<style>

</style>