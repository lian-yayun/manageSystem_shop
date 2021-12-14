<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商城后台管理系统</span>
      </div>
      <div>
        <el-tabs v-model="currentIndex" stretch @tab-click="handleTabsClick">
          <el-tab-pane label="登录" name="login">
            <el-form
              :model="loginForm"
              status-icon
              ref="loginForm"
              :rules="rules"
            >
              <el-form-item label="用户名" label-width="80px" prop="username">
                <el-input type="text" v-model="loginForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" label-width="80px" prop="password">
                <el-input
                  type="password"
                  v-model="loginForm.password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册" name="register">
            <el-form
              :model="registerForm"
              status-icon
              ref="registerForm"
              :rules="rules"
            >
              <el-form-item label="用户名" label-width="80px" prop="username">
                <el-input
                  type="text"
                  v-model="registerForm.username"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱" label-width="80px"  prop="email">
                <el-input type="text" v-model="registerForm.email"></el-input>
              </el-form-item>
              <el-form-item label="密码" label-width="80px" prop="password">
                <el-input
                  type="password"
                  v-model="registerForm.password"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="确认密码"
                label-width="80px"
                prop="configurePassword"
              >
                <el-input
                  type="password"
                  v-model="registerForm.configurePassword"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('registerForm')"
                  >注册</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
 
</template>

<script>
import api from "../api";
import { mapMutations } from "vuex";
export default {
  data() {
    // 验证规则
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (value.length < 4) {
        callback(new Error("长度不够"));
      } else {
        callback();
      }
    };
    var validatePassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateconfigurePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      currentIndex: "login",
      loginForm: {
        username: "",
        password: "",
      },
      registerForm: {
        username: "",
        password: "",
        configurePassword: "",
        email: "",
      },
      activeTab: "login",
      rules: {
        // 邮箱
    email: [
      { required: true, message: '请填写邮箱', trigger: 'blur' },
      { type: 'string',
        message: '邮箱格式不正确',
        trigger: 'blur',
        transform (value) {
          if (!/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)) {
            return true
          }else{
          }
        }
      },
      { type: 'string', message: '长度不能超过30位', trigger: 'blur', max: 30 }
    ],
        username: [
          {
            validator: validateUserName,
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: validatePassWord,
            trigger: "blur",
          },
        ],
        configurePassword: [
          {
            validator: validateconfigurePassword,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapMutations("login", ["setUser"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.activeTab === "login") {
            // 登录
             this.$bus.$emit("loginnn",this.loginForm);
            console.log(this.loginForm);
            api.login(this.loginForm).then((res) => {
              if (res.data.status === 200) {
                console.log(res.data);
                this.setUser(res.data);
                //登陆成功
                localStorage.setItem("limbo", JSON.stringify(res.data));
                //获取路由
                this.$router.push("/");
              } else {
                const h = this.$createElement;
                this.$notify({
                  title: "登录失败",
                  message: h("i", "用户名密码错误"),
                });
              }
            });
          }
          if (this.activeTab === "register") {
             if (this.registerForm.username) {
      //查询操作
    this.$api.searchUser({
      search:this.registerForm.username
    }).then(res=>{
     if (res.data.status===200) {
          const h = this.$createElement;
         this.$notify({
                  title: "此昵称已被注册~",
                  message: h("i", "请重新注册"),
                });
              
      }else{
 // 注册
            api.register(this.registerForm).then((res) => {
              if (res.data.status === 200) {
                const h = this.$createElement;
                this.$notify({
                  title: "注册成功",
                  message: h("i", "请前往登录页面登录"),
                });
              } else {
                const h = this.$createElement;
                this.$notify({
                  title: "注册失败",
                  message: h("i", "请重新注册"),
                });
              }
            });
      }
    })
    }else{
      console.log("请输入数据");
    }
           
          }
        } else {
          return;
        }
      });
    },
    handleTabsClick(tab) {
      this.activeTab = tab.name;
    },
  },
};
</script>

<style scoped lang="less">


.login {
  background: url("../assets/bg2.jpeg");
width: 100%;
height: 100%;
position: fixed;
background-size: 100% 100%;
  .box-card {
    // opacity: 0.3;
    width: 500px;
    margin: 100px auto;
background: transparent;
border: 0;
/deep/ .el-form-item{
background-color: unset !important;
}
/deep/ .el-input input{
  color: red;
  background: transparent !important;
}
.el-button{
  background:#ce7d88;
  border: 0;
  color: rgb(220,223,227);
  font-weight:bold ;
  font-family: "\5E7C\5706";
}

  }
 .el-form{
   color: red;
 }
 span{
   color: rgb(220,223,227);
   font-size: 18px;
   font-weight: bold;
  font-family: "\5E7C\5706";
 }
}


</style>