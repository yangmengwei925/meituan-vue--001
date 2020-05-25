<template>
  <div class="ordering">

  <!-- 当前已有分类 -->
  <div class="home-list">
    <div class="home-title">当前已有商品分类</div>
    <!-- if没有数据 -->
    <div class="classify-lable" v-if="!noclass">当前没有分类</div>
    <!-- 分类显示 -->
    <div class="classify-lable" v-if="noclass">
      <el-tag
      class="eltab"
        v-for="(item,index) in items"
        :key="index"
        type="warning"
        effect="dark"
        closable
        @close="handleClose(item._id)">
        {{ item.classdata }}
      </el-tag>
    </div>
  </div>

    <!-- 商品名称 -->
    <div class="home-list">
      <div class="home-title">添加商品分类</div>
      <div class="home-search">
       <el-input v-model="input" placeholder="比如甜食,麻辣,每添加一个点确定"></el-input>
       <el-row class="home-btning">
         <el-button type="primary" @click="addIing()">确定</el-button>
       </el-row>
      </div>
    </div>

  </div>
</template>

<script>
  export default{
    data() {
      return {
        noclass:true,
        input: '',
        items:[],
        id:'5dfcf328da83f620e4077103'
      }
    },
    methods:{
      // 添加
      addIing(){
        if(this.input != ''){
          this.homeData()
        }
      },

      // 提交数据
      homeData(){
        
      },

     

      // 删除商品分类
      handleClose(tag){
        let id = {
          "ids":tag,
        }
        
      },


    },

    
  }
</script>

<style scoped="scoped">
  @import '../../../style/pubiss.css';
  @import '../../../style/table.css';
  .home-search{display: flex;}
  .home-btning{margin-left: 10px;}
  .classify-lable{margin-top: 20px;}
  .eltab{margin: 5px;}
</style>
