<template>
  <div id="backcont">
  <!-- logo -->
  <div class="meituan-content">
    <div class="logos">
      <img src="../../images/logo.svg" />
    </div>
      <div class="login-cont">
        <div class="meituan-title">美团商家中心</div>
        <div class="meituan-user">
           <img src="../../images/zhanghao.svg" />
           <el-input v-model="name" placeholder="请输入账号"></el-input>
        </div>
        <div class="meituan-user">
          <img src="../../images/mima.svg" />
         <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
        </div>

        <!-- 登录 -->
        <div class="meituan-btn" @click="btNs()">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
 
  export default {
      data() {
        return {
           name: '',
           password:''
        }
      },

      methods:{
        // 登录
        btNs(){
         
        },

      },

      beforeCreate() {
        console.log('登录页')
        let ids = localStorage.getItem("ids")
        if(!ids || ids != 1){
          localStorage.setItem("ids", 1)
        }
      },

    }
</script>

<style>
  #backcont{background-image: url(../../images/beijing.jpg);
  background-attachment: fixed;
      background-repeat: no-repeat;
      background-size: cover;
     -webkit-background-size: cover;
      moz-background-size: cover;
      min-height: 100vh;
      }
  .meituan-content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .login-cont{
        width: 500px;
        height: 300px;
        background: #ffc700;
        border-radius: 5px;
  }

  .logos{width: 80px; height: 80px; margin: 0 auto; padding-bottom: 10px;}
  .logos img{width: 80px; height: 80px;}
  .meituan-title{text-align: center; color: white; font-size: 30px; padding-top: 30px;
  font-family: Arial, Helvetica, sans-serif;}
  .meituan-user{width: 400px; margin: 0 auto; padding-top: 30px; height: 40px;
  display: flex;
  align-items: center;
  }
  .meituan-user img{width: 25px; height: 25px; padding-right: 10px;}
  .meituan-btn{width: 200px; height: 40px; background: #409EFF;
  display: flex; align-items: center; justify-content: center; margin: 30px auto 0 auto;
  border-radius: 5px; font-size: 20px; color: white;
  cursor:pointer}
</style>
