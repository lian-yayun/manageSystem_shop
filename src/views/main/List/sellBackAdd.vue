   <template>
  <el-dialog
    title="新建原因"
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
      reason:'',
    };
  },
    mounted(){
        this.$bus.$on("onAddEvent",flag => {
            this.dialogVisible = flag;
        })
    },
  methods: {
      addProductHandle(){
            this.$api.insertreason({
                reason:this.reason,
            }).then(res =>{
                if(res.data.status === 200){
                    this.dialogVisible = false
                    this.$bus.$emit("refresh",true)
                }
            }).catch(error =>{
                console.log(error);
            })
        },
         handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
  },
};
</script>
   
   
 