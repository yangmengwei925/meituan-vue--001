<template>
  <div class="ordering">

    <div v-if="homemen">
      <div class="home-list">
        <div class="home-title">设置店铺名</div>
         <el-input v-model="shop" placeholder="请设置你的店铺名称"></el-input>
      </div>
      <!-- logo -->
      <div class="home-list">
        <div class="home-title">上传logo</div>
        <el-upload
          action="#"
          :show-file-list="false"
          list-type="picture-card"
            :auto-upload="false"
          :on-change="successing"
          >
            <img v-if="fileimg" :src="fileimg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <!-- 起送金额 -->
      <div class="home-list">
        <div class="home-title">起送金额(单位元)</div>
         <el-input v-model="delivering" placeholder="请输入起送金额"></el-input>
      </div>
      <!-- 起送金额 -->
      <div class="home-list">
        <div class="home-title">配送金额(单位元)</div>
         <el-input v-model="physical" placeholder="请输入配送金额"></el-input>
      </div>
      <!-- 人均价格 -->
      <div class="home-list">
        <div class="home-title">人均价格(单位元)</div>
         <el-input v-model="capita" placeholder="请输入人均价格"></el-input>
      </div>
      <!-- 人均价格 -->
      <div class="home-list">
        <div class="home-title">商品类型</div>
         <el-input v-model="types" placeholder="请输入商品类型"></el-input>
      </div>
      <!-- 人均价格 -->
      <div class="home-list">
        <div class="home-title">配送时间</div>
         <el-input v-model="times" placeholder="请输入配送时间"></el-input>
      </div>
      <!-- 配送时长 -->
      <div class="home-list">
        <div class="home-title">配送时长(单位分钟)</div>
         <el-input v-model="duration" placeholder="请输入配送时长"></el-input>
      </div>
      <!-- 人均价格 -->
      <div class="home-list">
        <div class="home-title">商家地址</div>
         <el-input v-model="address" placeholder="请输入商家地址"></el-input>
      </div>

      <!-- 提交 -->
      <div class="home-list">
        <el-row>
          <el-button type="success" @click="btNs()">提交</el-button>
        </el-row>
      </div>
    </div>

    <!-- 已设置的商家 -->
    <div v-if="!homemen">
      <div class="home-list home-list-homemen">
        <img src="../../images/beijing.jpg" />
        <div class="home-title">美团外卖</div>
      </div>
      <div class="home-list">
        <div class="home-title">起送金额:12元</div>
      </div>
      <div class="home-list">
        <div class="home-title">配送金额:23元</div>
      </div>
      <div class="home-list">
        <div class="home-title">人均价格:2元</div>
      </div>
      <div class="home-list">
        <div class="home-title">商品类型:2</div>
      </div>
      <div class="home-list">
        <div class="home-title">配送时间:2-9</div>
      </div>
      <div class="home-list">
        <div class="home-title">配送时长:20分钟</div>
      </div>
      <div class="home-list">
        <div class="home-title">商家地址:昆明市</div>
      </div>
    </div>

  </div>
</template>

<script>
  
  export default{
    
    data() {
      return {
        openid:'',
        homemen:false,
        homeData:{},
        shop:'',
        delivering:'',
        physical:'',
        capita:'',
        types:'',
        times:'',
        duration:'',
        address:'',
        dialogVisible: false,
        disabled: false,
        fileimg:'',
        files:''
      }
    },
     methods: {
            successing(file, fileList){
              this.fileimg = file.url
              console.log(file)
              console.log(fileList)
              this.files = file.raw
            },
            // 提交
          async  btNs(){
              console.log('提交')
             
            },

       
         

     },

     // 进入页面请求数据
     mounted() {
       
     },

     


  }
</script>

<style scoped="scoped">
  @import '../../../style/pubiss.css';
  @import '../../../style/table.css';
  .home-list-homemen img{margin-bottom: 20px; width: 150px; height: 150px;
  border-radius: 10px;}
</style>
