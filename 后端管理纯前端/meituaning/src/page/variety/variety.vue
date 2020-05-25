<template>
  <div class="ordering">
      <!-- 添加菜品 -->
      <div class="btns">
        <el-row class="btns-lable">
        <router-link to="/classify">
             <el-button type="success">添加商品分类</el-button>
        </router-link>
        </el-row>
        <el-row>
        <router-link to="/addto">
             <el-button type="success">添加商品</el-button>
        </router-link>
        </el-row>
      </div>
      <!-- 表格布局 -->
      <div class="var-table" v-if="noety">
        <!-- 标题 -->
        <div class="var-title">
          <div v-for="(item,index) in tableData" :key="index">{{item}}</div>
        </div>
        <!-- 内容 -->
        <div>
          <div class="var-content" v-for="(item,index) in contarr" :key="index">
            <div>{{item.input}}</div>
            <div>{{item.Discount}}</div>
            <div>出售中</div>
            <div>{{item.optidata}}</div>
            <div class="operation">
              <span>编辑</span>
              <span>删除</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 没有数据 -->
      <div class="nodatas" v-if="!noety">
        你还没有发布商品
      </div>
     
  </div>
</template>

<script>
  export default {
        data() {
          return {
            noety:true,
            tableData: ['商品','价格','状态','分类','操作'],
            id:'5dfcf328da83f620e4077103',
            contarr:[
					{
						'input':'炒饭',
						'Discount':20,
						'optidata':'米饭'
					}
				]
          }
        },

		methods:{
		

      // 删除商品
      deLeety(ids,name){
        console.log(ids)
        let msg = '删除' + name + '是否继续?'
          this.$confirm(msg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then((action) => {
            if(action === 'confirm'){
                  console.log('点击了确定')
                 
            }

          }).catch(() => {
            console.log('点击了取消')
            
          });
        },

       
		},

    

      }
</script>

<style scoped="scoped">
  @import '../../../style/pubiss.css';
  a：hover{cursor:pointer}
  .btns{display: flex; justify-content: flex-end;}
  .btns-lable{margin-right: 20px;}
  .var-title{background: #f5f7fa; height: 50px; display: flex; justify-content: space-around;
  align-items: center; font-weight: bold;
  color: #909399;
  }
  .var-title div{width: 200px; text-align: center;}
  .var-table{margin-top: 20px;}
  /* 菜品 */
  .var-content{display: flex; justify-content: space-around; align-items: center;
  height: 50px;
  border-bottom: 1px solid #ebebeb;}
  .var-content div{width: 200px; text-align: center;}
  .operation{display: flex; align-items: center; justify-content: space-around;}
  .operation span:nth-child(1){background-color: #ecf5ff;
  color: #409eff;
  border: 1px solid #d9ecff;
  border-radius: 4px;
  padding: 5px 10px;
  cursor:pointer}
  .operation span:nth-child(2){color: #fff;
    background-color: #f56c6c;
    border-radius: 4px;
    padding: 5px 10px;
    cursor:pointer}
  /* 没有数据 */
  .nodatas{text-align: center;
  padding-top: 100px;
  color: #C0C4CC;}
</style>
