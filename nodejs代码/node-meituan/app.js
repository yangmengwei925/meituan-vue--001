const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
var bodyParser = require('koa-bodyparser');
// 路由:()直接实例化
const router = require('koa-router')()
const mongoose = require('mongoose')
// 解决跨域
const cors = require('koa-cors');
// 解决增删改查出现的警告
mongoose.set('useFindAndModify', false)
// 引入数据库
const mburl = require('./config/base.js').mburl
// 全局异常处理
const abnormal = require('./config/abnormal.js')

app.use(cors());
app.use(json());
app.use(bodyParser());
app.use(abnormal)



// 连接阿里云数据库
mongoose.connect(mburl, {
  // 因为mongoose放弃使用一些指令，导致会出现警告
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then((res)=>{
	console.log('数据库连接成功')
})
.catch((err)=>{
	console.log('数据库连接失败')
})
 
 
 // 引入optimiz文件里的路由
 const banner = require('./routes/backend/optimiz')
 // 引入fordden文件里的路由
 const forshop = require('./routes/foreend/foroptimiz.js')
 // 微信登录
 const wxuser = require('./routes/wxuser/wxuser.js')
 // 微信支付
 const wxpay = require('./routes/wxpay/wxpay.js')
 // 评论
 const message = require('./routes/aimessage/aimessage.js')
 
 // 注册路由中间价
 // 配置上传商品的接口
 router.use('/api/banner',banner)
 // 配置查询商品的接口
 router.use('/api/forshop',forshop)
 // 配置小程序端微信用户登录接口
 router.use('/api/wxuser',wxuser)
 // 配置小程序端微信维护
 router.use('/api/wxpay',wxpay)
 // 配置小程序端评论 
 router.use('/api/message',message)
 
// 启动路由
app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3000);  //服务启动端口：不能跟其他程序造成端口冲突
console.log('启动成功美团')