<template>
  <div class="ordering">
      <!-- logo -->
      <div class="home-list" v-bind="upImg">
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
  import {home} from '../../api/api.js'
  // 请求地址
  import {updatapreferurl} from '../../api/request.js'
  export default{
    data() {
      return {
        title:'',
        lable:'',
        fileimg:'',
        files:'',
        ids:'',
        upfile:''
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
       async btNs(){
          console.log('提交')
          let list = [
            {"file": this.upfile},
            {"ids": this.ids},
            {"title": this.title},
            {"lable": this.lable}
          ]
          
          let  uploading = await new this.myreferto(list).appfrom()

          home(uploading,updatapreferurl)
          .then((res)=>{
            new this.myreferto(list).men()
            console.log(res)
            if(res.data.msg == 'SUCCESS'){
              new this.mytitle(this.$message,'success','修改成功').funtitle()
            }else{
              new this.mytitle(this.$message,'warning',res.data.msg).funtitle()
            }
          })
          .catch((err)=>{
            new this.myreferto(list).men()
            new this.mytitle(this.$message,'info','修改失败').funtitle()
          })
        },

     },

     // 进入页面请求数据
     mounted() {
       // 接收修改传过来的值
       console.log(this.$route.params)
       let dataedit = this.$route.params.datas
       this.fileimg = dataedit.image
       this.title = dataedit.title
       this.lable = dataedit.lable
       this.ids = dataedit._id
     },

     // 计算
     computed:{
       upImg(){
         // 如果图片地址更换
         if(this.files != ''){
            // 用户更换了图片
            console.log('已更换')
            this.upfile = this.files
         }else{
            this.upfile = this.fileimg
            console.log(this.upfile)
         }
       }
     }


  }
</script>

<style scoped="scoped">
  @import '../../../style/pubiss.css';
  @import '../../../style/table.css';
</style>
