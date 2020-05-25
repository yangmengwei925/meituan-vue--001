<template>
  <div class="ordering">
      <!-- 表格布局 -->
      <div class="var-table" v-if="noety">
        <!-- 标题 -->
        <div class="var-title">
          <div v-for="(item,index) in tableData" :key="index">{{item}}</div>
        </div>
        <!-- 内容 -->
          <div v-for="(item,index) in neworder" :key="index">
            <div class="var-content" v-for="(itemdata,index) in item.arrinfo" :key="index">
            <div>{{item.timeing}}</div>
            <div>{{itemdata.input}}</div>
            <div>{{itemdata.amount}}</div>
            <div class="var-content-name">
              <span>{{item.peopleobj.name}}</span>
              <span>{{item.peopleobj.address}}</span>
              <span>{{item.peopleobj.iphone}}</span>
            </div>
            <div>交易成功</div>
            <div>{{itemdata.Totalprice}}</div>
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
  import { mapState } from 'vuex';
  import {getdata,home} from '../../api/api.js'
  // 请求地址
  import {merchantorderurl} from '../../api/request.js'
  // 中转
  import Utils from '../../api/util.js'
  export default {
        name:'preferen',
        data() {
          return {
            noety:true,
            tableData: ['交易时间','商品','订单数','收货客户','状态','交易金额'],
            neworder:[],
            id:'5dfcf328da83f620e4077103',
            contarr:[
              {
                'time':'2018-09-08',
                'title':'青椒肉丝',
                'lable':12,
                'name':'昆明市官渡区',
                'code':'交易成功',
                'price':13
              },
              {
                'time':'2018-09-08',
                'title':'烧茄子',
                'lable':12,
                'name':'昆明市官渡区',
                'code':'交易成功',
                'price':13
              }
            ]
          }
        },

		methods:{
        // 有新订单提醒被调用
        newOrder(){
          Utils.$on('news', (msg)=> {
                console.log('有新订单，点击被触发');
                this.orderFun()
          })
        },

        orderFun(){
          let data = {
            "merchantid":this.opendata.opening,
          }
          home(data,merchantorderurl)
          .then((res)=>{
            console.log(res)
            // 新订单提醒，点击订单管理刷新页面成功，传值给index页面，取消红点提醒
            Utils.$emit('neworder',0);
            if(res.data.msg == '没有订单数据'){
              this.noety = false
            }else{
              this.noety = true
              // 筛选需要的数据
              var newOrder = res.data.data.map((item)=>{
              	let timeing = item.wxorder.timeing
                let arrinfo = item.wxorder.Paymentinfor.arrinfo
                let peopleobj = item.wxorder.Paymentinfor.peopleobj
                return{
                  timeing,
                  arrinfo,
                  peopleobj
                }
              })
              console.log(newOrder)
              this.neworder = newOrder
            }

          })
          .catch((err)=>{
            console.log(err)
          })
        },
        

		},

    mounted() {
      this.orderFun()
      this.newOrder()
    },



    computed:{
    		...mapState(['opendata'])
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
