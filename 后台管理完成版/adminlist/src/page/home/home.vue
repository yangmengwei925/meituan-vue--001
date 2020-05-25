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
        <img :src="homeData.logo" />
        <div class="home-title">{{homeData.shop}}</div>
      </div>
      <div class="home-list">
        <div class="home-title">起送金额:{{homeData.delivering}}元</div>
      </div>
      <div class="home-list">
        <div class="home-title">配送金额:{{homeData.physical}}元</div>
      </div>
      <div class="home-list">
        <div class="home-title">人均价格:{{homeData.capita}}元</div>
      </div>
      <div class="home-list">
        <div class="home-title">商品类型:{{homeData.types}}</div>
      </div>
      <div class="home-list">
        <div class="home-title">配送时间:{{homeData.times}}</div>
      </div>
      <div class="home-list">
        <div class="home-title">配送时长:{{homeData.duration}}分钟</div>
      </div>
      <div class="home-list">
        <div class="home-title">商家地址:{{homeData.address}}</div>
      </div>
    </div>

    <!-- 引入登录提示模态框 -->
    <motal ref="mon"></motal>
  </div>
</template>

<script>
  // 引入登录提示模态组件
  import motal from '../../tips/login.vue'
  import { mapState } from 'vuex';
  import {home} from '../../api/api.js'
  // 请求地址
  import {shopossurl,shopsuccurl} from '../../api/request.js'
  export default{
    components:{
    	motal
    },
    data() {
      return {
        openid:'5dfcf328da83f620e4077103',
        homemen:true,
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
              let list = [
                {"openid": this.opendata.opening},
                {"shop": this.shop},
                {"file": this.files},
                {"delivering": this.delivering},
                {"physical": this.physical},
                {"capita": this.capita},
                {"types": this.types},
                {"times": this.times},
                {"duration": this.duration},
                {"address": this.address}
              ]

              let  uploading = await new this.myreferto(list).appfrom()

              home(uploading,shopossurl)
              .then((res)=>{
                console.log(res)
                new this.myreferto(list).men()
                if(res.data.msg == 'SUCCESS'){
                 this.homeSucc(res.data.data.openid)
                  new this.mytitle(this.$message,'success','提交成功').funtitle()
                }else{
                  new this.mytitle(this.$message,'warning',res.data.msg).funtitle()
                }

              })
              .catch((err)=>{
                new this.myreferto(list).men()
                new this.mytitle(this.$message,'info','提交失败').funtitle()
              })
            },

        //请求成功显示商家信息
         homeSucc(ids){
           let id = {
             "openid":ids
           }
           home(id,shopsuccurl)
           .then((res)=>{
             console.log(res)
             if(res.data.msg == 'SUCCESS'){
               console.log('123')
               this.homeData = res.data.data[0]
               this.homemen = false
             }else{
               this.homemen = true
             }
           })
           .catch((err)=>{
             console.log(err)
           })
         },

     },

     // 进入页面请求数据
     mounted() {
       console.log(this.opendata.opening)
       let ids = '5dfcf328da83f620e4077103'
       this.homeSucc(this.opendata.opening)
       // this.homeSucc(ids)
       // if(this.opendata.opening == null){
       //    this.$nextTick(()=>{
       //    	this.$refs.mon.init()
       //    })
       // }else{
       //   this.homeSucc(this.opendata.opening)
       // }
     },

     computed:{
     		...mapState(['opendata'])
     	},


  }
</script>

<style scoped="scoped">
  @import '../../../style/pubiss.css';
  @import '../../../style/table.css';
  .home-list-homemen img{margin-bottom: 20px; width: 150px; height: 150px;
  border-radius: 10px;}
</style>
