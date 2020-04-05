<template>
  <div class="login">
    <div class="left"></div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt>
      
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less'>
.login{
  display: flex;
  justify-content: space-around;  //主轴
  align-items: center; //侧轴
  height:788px;
  background:linear-gradient(225deg,rgba(20,147,250,1),rgba(1,198,250,1));
  .left{
    width:478px;
    height:550px;
    background:rgba(245,245,245,1);
  }
}
</style>