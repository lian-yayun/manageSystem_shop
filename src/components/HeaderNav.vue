<template>

 <div class="header_container">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index" :to="item.url">{{item.name}}</el-breadcrumb-item>
		</el-breadcrumb>
<div class="user">
	 <span class="user-name">{{ user.username }}</span>
      <el-button @click="logoutHandle" style="font-weight: bold;">退出</el-button>
</div>
 </div>
</el-breadcrumb>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed:{
		 ...mapState("login", ["user"]),
	},
	methods: {
		   ...mapMutations("login", ["setUser"]),
    logoutHandle() {
      this.setUser({});
      localStorage.removeItem("limbo");
      this.$router.push("/login");
    },
	},
}
</script>
<style lang="less">
	@import '../style/mixin';
	.user {
  float: right !important;
  margin-right: 20px !important;
  line-height: 60px !important;
  .user-name {
    color: rgb(235, 208, 208);
		
    margin-right: 10px;
    font-size: 15px;
    border: 2px solid rgb(238, 200, 200);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: inline-block;
		margin-bottom: -15px;
    line-height: 40px;
    overflow: hidden;
  }}
	.header_container{
		// background-color: #d8dde6;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }

</style>
