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
var formdata  = new FormData()
  import { mapState } from 'vuex';
  import {home} from '../../api/api.js'
  // 请求接口
  import {preferurl} from '../../api/request.js'

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
        async btNs(){
          let list = [
            {"file": this.files},
            {"title": this.title},
            {"lable": this.lable}
          ]

         let  uploading = await new this.myreferto(list).appfrom()

         await home(uploading,preferurl)
          .then((res)=>{
            console.log(uploading.getAll('file'))
           new this.myreferto(list).men()
            console.log(res)
            if(res.data.msg === 'SUCCESS'){
                new this.mytitle(this.$message,'success','上传成功').funtitle()
                this.title = ''
                this.lable = ''
                this.files = ''
                this.fileimg = ''
            }else{ 
              new this.mytitle(this.$message,'warning',res.data.msg).funtitle()
            }

          })
          .catch((err)=>{
           new this.myreferto(list).men()
            console.log(err)
            new this.mytitle(this.$message,'info','上传失败').funtitle()
          })
        },


     },


     computed:{
     		...mapState(['opendata'])
     	},

  }
</script>

<style scoped="scoped">
  @import '../../../style/pubiss.css';
  @import '../../../style/table.css';
</style>
