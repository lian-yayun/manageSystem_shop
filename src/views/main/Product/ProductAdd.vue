<template>
  <div>
  
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
      <el-form label-width="70px" :model="addForm" ref="addForm">
        <el-form-item label="商品类目">
          <el-button
            type="primary"
            @click="dialogCategoryHandle"
            class="location"
          >
            类目选择
          </el-button>
          <span class="tree">{{ treeData.name }}</span>
          <el-dialog
            width="50%"
            append-to-body
            title="类目选择"
            :visible.sync="dialogCategoryVisible"
            v-model="treeData.name"
          >
            <ProductTree @onTree="getTreeData"></ProductTree>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogCategoryVisible = false"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-input v-model="addForm.brand"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="addForm.num"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
        <ShopUpload @onUploadShop="getOnUploadsss"></ShopUpload>
        </el-form-item>
        <el-form-item label="商品描述">
<ProductWangEditor @onEditor="getEditor"></ProductWangEditor>
        </el-form-item>
      </el-form>

       
   
    	</el-col>
  		</el-row>
       <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProductHandle">确 定</el-button>
  </div>
</template>

<script>
import ProductTree from "./ProductTree";
import ShopUpload from '../Shop/ShopUpload';
import ProductWangEditor from "./ProductWangEditor";
export default {
  data() {
    return {
      dialogCategoryVisible: false,
      dialogAddVisible: false,
      dialogUploadVisible: false,
      addForm: {
        name: "",
        brand:"",
        price: "",
        num: "",
      },
      treeData: {},
      uploadDatasss: {},
      editorData: "", //富文本
    };
  },
  // ------------------------------------------------------------------------------------------------------------
  	created(){
    		if (this.$route.query.restaurant_id) {
    			this.restaurant_id = this.$route.query.restaurant_id;
    		}else{
    			this.restaurant_id = Math.ceil(Math.random()*10);
    			this.$msgbox({
		          title: '提示',
		          message: '添加食品需要选择一个商铺，先去就去选择商铺吗？',
		          showCancelButton: true,
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          beforeClose: (action, instance, done) => {
		            if (action === 'confirm') {
		              this.$router.push('/shopList');
		              done();
		            } else {
		            	this.$message({
				            type: 'info',
				            message: '取消'
				        });
		              	done();
		            }
		          }
		        })
    		}
    		// this.initData();
    	},
  // ------------------------------------------------------------------------------------------------------------
  components: {
    ProductTree,
   ShopUpload,
    ProductWangEditor,
  },
  mounted() {
    this.$bus.$on("onAddEvent", (flag) => {
      this.dialogAddVisible = flag;
    });
  },
  methods: {
    handleClose() {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    dialogCategoryHandle() {
      this.dialogCategoryVisible = true;
    },
    dialogUploadHandle() {
      this.dialogUploadVisible = true;
    },

    //读取类目数据
    getTreeData(data) {
      this.treeData = data;
    },
    //读取图片地址
    getOnUploadsss(data) {
      if (data.url) {
        data.url = data.url.replace("upload", "http://localhost:3000");
      }
      this.uploadDatasss = data;
    },
    //接收富文本数据
    getEditor(data) {
      this.editorData=data
    },

    //商品添加
    addProductHandle() {
      this.$api
        .insertTbItem({
          cid: this.treeData.cid,
          title: this.addForm.name,
          brand:this.addForm.brand,
          price:this.addForm.price,
          num: this.addForm.num,
          desc: this.editorData,
          image:this.uploadDatasss.url,
        })
        .then(res => {
          if (res.data.status==200) {
            this.dialogAddVisible=false;
            this.$bus.$emit("refresh",true);
            this.$message({
                type: "success",
                message: "添加成功!",
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

</script>

<style scoped>
.location {
  float: left;
}
.tree {
  float: left;
  margin-left: 10px;
}
.upload-img {
  float: left;
  width: 300px;
  margin-left: 10px;
}
</style>