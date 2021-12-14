<template>
	<div class="container ">

		<el-row style="height: 100%;">
	<el-col :span="4"  style="min-height: 100%; background-color: #324057;" class="left-con" >
      	<el-menu class="left-menu" background-color="#304156"  text-color="#fff" active-text-color="#FFAEAE" :default-active="active" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="/"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-document"></i>人事管理</template>
					 <el-menu-item index="/customerList">会员管理</el-menu-item>
      <el-menu-item v-show="vipZS" index="userList">管理员列表</el-menu-item>
			 <el-menu-item v-show="adminZS" index="userList-change">管理员列表</el-menu-item>
    </el-submenu>
	<el-submenu index="2">
    	<template slot="title"><i class="el-icon-message"></i>订单管理</template>
<el-menu-item index="/list"><i class="el-icon-switch-button"></i>订单列表</el-menu-item>
	<el-submenu index="2-1">
    	<template slot="title"><i class="el-icon-box"></i>退货管理</template>
<el-menu-item index="/sellbacklist"><i class="el-icon-switch-button"></i>退货列表</el-menu-item>
<el-menu-item index="/sellback"><i class="el-icon-box"></i>设置退货原因</el-menu-item>
  </el-submenu>
  </el-submenu>
  <el-submenu index="3">
    	<template slot="title"><i class="el-icon-more"></i>产品管理</template>
      <el-menu-item index="/shopList" >商铺列表</el-menu-item>
        <el-submenu index="3-1">
          <template slot="title">商品管理</template>
      <el-menu-item index="/product">商品列表</el-menu-item>
        </el-submenu>
  </el-submenu>
					<el-submenu index="4">
			<template slot="title"><i  class="el-icon-sell"></i>添加数据</template>
      <el-menu-item index="/addShop"><i class="el-icon-s-home"></i>添加商铺</el-menu-item>
      <el-menu-item index="/productAdd"><i class="el-icon-s-goods"></i>添加商品</el-menu-item>
    </el-submenu>
    	<el-submenu index="5">
					  <template slot="title"><i  class="el-icon-s-marketing"></i>图表</template>
      <el-menu-item index="/round"><i  class="el-icon-location"></i>用户分布</el-menu-item>
    </el-submenu>
					<el-submenu index="6">
					  <template slot="title"><i class="el-icon-setting"></i>设置</template>
     <el-menu-item index="myselfInfo">个人信息</el-menu-item>
       </el-submenu>
				<el-submenu index="7">
						<template slot="title"><i class="el-icon-warning"></i>说明</template>
						<el-menu-item index="explain">说明</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>  
			<el-col class="main" :span="20" >
        <HeaderNav></HeaderNav>
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>
<script>
import HeaderNav from "../components//HeaderNav.vue";
export default {
  data() {
    return {
			    zhanghao: '',
			adminZS:false,
			vipZS:false,
      active: "/",
    };
  },
  mounted() {
		 this.user = JSON.parse(localStorage.getItem("limbo"))
                this.zhanghao = this.user.username
    if (this.zhanghao == "admin") {
      this.adminZS = true;
    }else{
			this.vipZS = true;
		}
  },
  computed: {
    defaultActive: function () {
      return this.$route.path.replace("/", "");
    },
  },
  components: { HeaderNav },
};
</script>
<style lang="less" >
@import "../style/mixin.less";
.manage_page {
}
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
.left-menu {
  height: 100vh;
}
.left-con{
  height: 100%;
  overflow-y: auto;
  top: 0;
  bottom: 0;
  left: 0;
  width: 220px; // transition: width 10s;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
}}
.main {
  height: 100%;
  overflow-y: auto;
  top: 0;
  bottom: 0;
  left: 0;
  width: 220px; // transition: width 10s;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
