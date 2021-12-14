<template>
  <div>
    <el-dialog
      title="编辑产品"
      :visible.sync="dialogEditorVisible"
      width="70%"
      @before-close="handleClose"
    >
      <el-form
        :model="changeForm"
        :rules="rules"
        ref="changeForm"
        label-width="110px"
        class="demo-formData"
      >
        <el-form-item label="商铺名称" prop="name">
          <el-input v-model="changeForm.name"></el-input>
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
            v-model="changeForm.addr"
            style="width: 280px; float: left"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model.number="changeForm.phone" maxLength="11"></el-input>
        </el-form-item>
        <el-form-item label="店铺简介" prop="description">
          <el-input v-model="changeForm.description"></el-input>
        </el-form-item>

        <el-form-item
          label="店铺特点"
          style="white-space: nowrap; padding-right: 600px"
        >
          <span>正品保障</span>
          <el-switch
            on-text=""
            off-text=""
            v-model="changeForm.is_premium"
          ></el-switch>
          <span>假一赔十</span>
          <el-switch
            on-text=""
            off-text=""
            v-model="changeForm.delivery_mode"
          ></el-switch>
          <span>开发票</span>
          <el-switch
            on-text=""
            off-text=""
            v-model="changeForm.piao"
          ></el-switch>
        </el-form-item>
        <el-form-item style="white-space: nowrap; padding-right: 600px">
          <span>配送时效服务</span>
          <el-switch
            on-text=""
            off-text=""
            v-model="changeForm.time"
          ></el-switch>
          <span>极速退款</span>
          <el-switch
            on-text=""
            off-text=""
            v-model="changeForm.refund"
          ></el-switch>
        </el-form-item>
        <el-form-item label="上传店铺头像">
          <ShopUpload @onUploadShop="getOnuploads"></ShopUpload>
        </el-form-item>
        <el-form-item label="上传营业执照">
          <ShopUpload @onUploadShop="getOnuploadss"></ShopUpload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditorVisible = false">取 消</el-button>
        <el-button type="primary" @click="editorShop">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import ShopUpload from "./ShopUpload";
export default {
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      provinceName: "",
      cityName: "",
      countyName: "",
      dialogCategoryVisible: false,
      // dialogAddVisible: false,
      dialogUploadVisible: false,
      dialogEditorVisible: false,

      changeForm: {
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
      editorData: "", //富文本
      uploadData: {}, //存储图片
      uploadDatatwo: {}, //存储第二张图片
      currentData: {},
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
        // phone: [
        //   { required: true, type: "number", message: "电话号码必须是数字" },
        // ],
      },
    };
  },
  components: {
    ShopUpload,
  },
  created() {
    // 初始化省市区
    this.selectedOptions = [
      this.form.provinceCode,
      this.form.cityCode,
      this.form.areaCode,
    ];
  },
  mounted() {
   
    //获取预更新数据
    this.$bus.$on("onEditor", (row) => {
      this.dialogEditorVisible = true;
         this.currentData = row;
      this.$api.preUpdateShop({ id: row.id }).then((res) => {
        //赋值
        console.log(res.data);
        this.changeForm.name = res.data.result[0].name;
        this.changeForm.addr = res.data.result[0].address;
        this.changeForm.phone = res.data.result[0].phone;
        this.changeForm.description = res.data.result[0].description;
        this.uploadData.url = res.data.result[0].image;
        this.uploadDatatwo.url = res.data.result[0].imagee;
      });
    });
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
        data.url = data.url.replace("upload", "http://localhost:3000");
      }
      this.uploadData = data;
    },
    getOnuploadss(data) {
      if (data.url) {
        data.url = data.url.replace("upload", "http://localhost:3000");
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
    dialogCategoryHandle() {
      this.dialogCategoryVisible = true;
    },
    dialogUploadHandle() {
      this.dialogUploadVisible = true;
    },

    //编辑产品
    //重新提交数据
  editorShop(){
    this.$api.updateShop({
      id:this.currentData.id,
      name:this.changeForm.name,
address: this.provinceName +
            this.cityName +
            this.countyName +
            this.changeForm.addr,
phone:this.changeForm.phone,
description:this.changeForm.description,
image:this.uploadData.url,
imagee:this.uploadDatatwo.url,
      }).then(res =>{
                if(res.data.status === 200){
                    this.dialogEditorVisible = false;
                    this.$bus.$emit("refresh",true)
                }
            }).catch(error =>{
                console.log(error);
            })
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