<template>
  <div class="ordering">
      <!-- logo -->
      <div class="home-list">
        <div class="home-title">上传商品图片</div>
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
      <!-- 标题 -->
      <div class="home-list">
        <div class="home-title">商品标题</div>
         <el-input v-model="title" placeholder="请输入商品标题"></el-input>
      </div>
      <!-- 描述 -->
      <div class="home-list">
        <div class="home-title">商品描述</div>
         <el-input v-model="lable" placeholder="请输入商品描述"></el-input>
      </div>

      <!-- 提交 -->
      <div class="home-list">
        <el-row>
          <el-button type="success" @click="btNs()">提交</el-button>
        </el-row>
      </div>

  </div>
</template>

<script>
 
  export default{
    data() {
      return {
        title:'',
        lable:'',
        fileimg:'',
        files:''
      }
    },
     methods: {
       // 上传图片
        successing(file, fileList){
          this.fileimg = file.url
          console.log(file)
          console.log(fileList)
          this.files = file.raw
        },

        // 提交
         btNs(){
          
        },


     },


  }
</script>

<style scoped="scoped">
  @import '../../../style/pubiss.css';
  @import '../../../style/table.css';
</style>
