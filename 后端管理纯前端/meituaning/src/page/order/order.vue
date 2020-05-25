<template>
  <div class="ordering">
      <!-- 表格布局 -->
      <div class="var-table" v-if="noety">
        <!-- 标题 -->
        <div class="var-title">
          <div v-for="(item,index) in tableData" :key="index">{{item}}</div>
        </div>
        <!-- 内容 -->
          <div >
            <div class="var-content">
            <div>2020-10-01</div>
            <div>炒饭</div>
            <div>2</div>
            <div class="var-content-name">
              <span>马云</span>
              <span>阿里巴巴</span>
              <span>15287927756</span>
            </div>
            <div>交易成功</div>
            <div>209</div>
            </div>
          </div>

      </div>

      <!-- 没有数据 -->
      <div class="nodatas" v-if="!noety">
        你还没有订单
      </div>

  </div>
</template>

<script>
  export default {
        name:'preferen',
        data() {
          return {
            noety:true,
            tableData: ['交易时间','商品','订单数','收货客户','状态','交易金额'],
            neworder:[],
            
          }
        },

		methods:{
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
  height: 80px;
  border-bottom: 1px solid #ebebeb;}
  .var-content-name span{display: block; padding: 3px 0;}
  .var-content div{width: 200px; text-align: center;}
  .var-content img{width: 40px; height: 40px; border-radius: 5px;}
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
