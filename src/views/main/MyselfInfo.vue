<template>
<div>
      <div class="change-zhanghao">
            <p class="zhanghao">你的账号是 {{zhanghao}} 邮箱{{youx}}</p>
            <p>修改密码以后，可以使用账号和密码登录</p>
        </div>
    <template>
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </template>

</div>
</template>
<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
           id:'',
                zhanghao: '',
                youx:'',
        ruleForm: {
          pass: '',
          checkPass: '',
       
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
       
        }
      };
    },
      created() {
            //若无身份信息，则跳转登录页
            if(!(localStorage.getItem("limbo"))) {
                this.$router.push('/login')
            }
            //初始化
            this.getZhang()
            this.getInfo()
            this.setInfo()
        },
    methods: {
         getZhang() {
                this.user = JSON.parse(localStorage.getItem("limbo"))
                this.zhanghao = this.user.username
                // this.youx=this.user.email
            },
getInfo(){
    if (this.zhanghao) {
      //查询操作
    this.$api.searchUser({
      search:this.zhanghao
    }).then(res=>{
     if (res.data.status===200) {
         console.log(res.data.result[0]);
        this.$bus.$emit('Info',res.data.result[0])
      }
    })
    }else{
      console.log("请输入数据");
    }
},
setInfo(){
     this.$bus.$on("Info", (data) => {
         this.id=data.id
      this.youx=data.email
    });
},
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
               this.$api.updatePassword({
                id:this.id,
                username:this.zhanghao,
                password:this.ruleForm.checkPass,
                email:this.youx,
               
            }).then(res =>{
                if(res.data.status === 200){
           
                    this.$bus.$emit("refresh",true)
this.$message({
          showClose: true,
          message: '修改成功啦~~',
          type: 'success'
        });
                }
            }).catch(error =>{
                console.log(error);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>