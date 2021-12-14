<template>
  <div>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="4">
        <el-form
          :model="addForm"
          :rules="rules"
          ref="addForm"
          label-width="110px"
          class="demo-formData"
        >
          <el-form-item label="商铺名称" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="areaCode" label="所在城市">
            <el-cascader
              style="float: left"
              size="large"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="detailadd">
            <el-input
              placeholder="小区楼栋/乡村名称"
              v-model="addForm.addr"
              style="width: 280px; float: left"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model.number="addForm.phone" maxLength="11"></el-input>
          </el-form-item>
          <el-form-item label="店铺简介" prop="description">
            <el-input v-model="addForm.description"></el-input>
          </el-form-item>

          <el-form-item
            label="店铺特点"
            style="white-space: nowrap; padding-right: 600px"
          >
            <span>正品保障</span>
            <el-switch
              on-text=""
              off-text=""
              v-model="addForm.is_premium"
            ></el-switch>
            <span>假一赔十</span>
            <el-switch
              on-text=""
              off-text=""
              v-model="addForm.delivery_mode"
            ></el-switch>
            <span>开发票</span>
            <el-switch
              on-text=""
              off-text=""
              v-model="addForm.piao"
            ></el-switch>
          </el-form-item>
          <el-form-item style="white-space: nowrap; padding-right: 600px">
            <span>配送时效服务</span>
            <el-switch
              on-text=""
              off-text=""
              v-model="addForm.time"
            ></el-switch>
            <span>极速退款</span>
            <el-switch
              on-text=""
              off-text=""
              v-model="addForm.refund"
            ></el-switch>
          </el-form-item>

          <el-form-item label="上传店铺头像">
            <ShopUpload @onUploadShop="getOnuploads"></ShopUpload>
          </el-form-item>
          <el-form-item label="上传营业执照">
           <ShopUpload @onUploadShop="getOnuploadss"></ShopUpload>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-button type="primary" @click="addShopHandle" style="margin-right: 100px;">立即创建</el-button>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import ShopUpload from "./ShopUpload.vue";
export default {
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      provinceName: "",
      cityName: "",
      countyName: "",
      dialogCategoryVisible: false,
      dialogAddVisible: false,
      dialogUploadVisible: false,
      
      addForm: {
        name: "",
        addr: "",
        phone: "",
        description: "",
        is_premium: true,
        delivery_mode: true,
        refund: true,
        piao: true,
        time: true,
      },

      rules: {
        name: [{ required: true, message: "请输入店铺名称", trigger: "blur" }],
        areaCode: [
          {
            type: "array",
            required: true,
            message: "请选择区域",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入联系电话" },
          { type: "number", message: "电话号码必须是数字" },
        ],
      },
      treeData: {},
      editorData: "", //富文本
      uploadData: {}, //存储图片
      uploadDatatwo:{},//存储第二张图片
    };
  },
  components: { ShopUpload },
  mounted() {
    this.$bus.$on("onAddEvent", (flag) => {
      this.dialogAddVisible = flag;
    });
    this.openId = this.$route.query.openId;
    console.log(this);
  },
  created() {
    // 初始化省市区
    this.selectedOptions = [
      this.form.provinceCode,
      this.form.cityCode,
      this.form.areaCode,
    ];
  },
  methods: {
    handleChange(value) {
      //将区域码转为汉字
      console.log(CodeToText[value[0]]);
      console.log(CodeToText[value[1]]);
      console.log(CodeToText[value[2]]);

      this.provinceName = CodeToText[value[0]];
      this.cityName = CodeToText[value[1]];
      this.countyName = CodeToText[value[2]];
    },
    getOnuploads(data) {
      if (data.url) {
        data.url = data.url.replace("upload","http://localhost:3000")
      }
      this.uploadData = data;
    },
     getOnuploadss(data) {
      if (data.url) {
        data.url = data.url.replace("upload","http://localhost:3000")
      }
      this.uploadDatatwo = data;
    },
    handleClose() {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    //商品添加
    addShopHandle() {
      this.$api
        .insertTbShopItem({
          name: this.addForm.name,
          address:
            this.provinceName +
            this.cityName +
            this.countyName +
            this.addForm.addr,
          phone: this.addForm.phone,
          description: this.addForm.description,
          image: this.uploadData.url,
          imagee: this.uploadDatatwo.url,
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.dialogAddVisible = false;
            this.$bus.$emit("refresh", true);
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 110px;
  height: 110px;
  line-height: 110px;
  text-align: center;
}
.avatar {
  width: 110px;
  height: 110px;
  display: block;
}
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