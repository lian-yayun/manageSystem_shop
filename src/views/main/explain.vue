<template>
  <div class="fillcontain">
    <head-top></head-top>
    <p class="explain_text">商城后台管理系统</p>
    <p class="explain_text">第一次注册的用户自动成为管理员</p>
    <p class="explain_text">超级管理员有注销会员，注销普通管理员，删除订单特权</p>
  </div>
</template>
<script>
// import headTop from '../components/headTop'
export default {
  components: {
    // headTop,
  },
};
</script>

<style lang="less">
@import "../../style//mixin.less";
.explain_text {
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  color: #333;
}
</style>
