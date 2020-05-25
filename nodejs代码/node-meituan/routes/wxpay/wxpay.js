// 路由:()直接实例化
const router = require('koa-router')()
const {log} = console

// http模块
const http = require('http')
// 校验
const {chwxpaying,chstarting} = require('../../config/checking.js')
// 响应接收
const initdata = require('../../config/init.js')
// 数据模型
const Wxpay = require('../../models/wxpay.js')
// 导入微信支付
const {wxpay,key,appId,sign_type,WXPayUtil,options,appkey} = require('../../config/dispose.js')
// ip
const ip = require('ip')
// 时间
const datetime = require('silly-datetime');


router.post('/wxpaying',async ctx=>{
	// type=placeOrder:统一下单
	// type=paysucc:查询是否支付成功
	// type=myorder：查询该用户的订单
	
	let bodys = ctx.request.body
	// log(bodys.type)
	if(bodys.type == 'placeOrder'){
		let{
			commod,//商品标题或描述
			ide,//前端选取一个商品的_id用来做商户订单号的随机数生成
			logo,//商家logo
			payment,//支付的价格
			merchantid,//商家唯一标识
			arrinfo,//商品的详细数据
			peopleobj,//下单用户的详细信息
			useropenid,//下单用户的openid
			} = bodys
		// 参数校验
		new chwxpaying(ctx,commod,ide,logo,payment,merchantid,arrinfo,peopleobj,useropenid).chwxpayingFun()
		//商户订单号：随机字符串（32）
		let out_trade_no = ide + '_' + Date.now()
		// 处理支付金额
		let pricedata = payment * 100
		// 浮点数
		let pricemony = parseFloat((pricedata).toFixed(10))
		// 时间戳
		let time_stamp = '' + Math.ceil(Date.now() / 1000)
		// 用户的商品数据和下单用户信息
		let Paymentinfor ={
			arrinfo,
			peopleobj
		}
		
		
		// 统一下单所需要的参数
		var reqObj = {
		  body: commod,//商品描述
		  out_trade_no,//商户订单号
		  total_fee: pricemony,//标价金额
		  spbill_create_ip: ip.address() || '127.0.0.1',//终端IP
		  notify_url: 'http://www.qq.com',//通知地址
		  trade_type: 'JSAPI',//交易类型
		  openid:useropenid,
		  timeStamp:time_stamp
		};
		
		// 1.统一下单
		let {return_code,result_code,nonce_str,sign,prepay_id,return_msg}= await wxpay.unifiedOrder(reqObj)
		if(return_code && result_code == 'SUCCESS'){
			log('统一下单成功')
		//2.再次签名
		 let sign = await signFun(nonce_str,prepay_id)
		 log('再次签名的结果')
		 // log(sign)
		 try{
			 // 3.存储要支付的订单要数据库集合
			 let orderdata = await wxpayFun(nonce_str,prepay_id,sign)
			 log('存储到集合的数据')
			 // log(orderdata)
			 let {out_trade_no,time_stamp,nonceStr,prepayId,payauto} = orderdata.wxorder
			 let payData = {
				 out_trade_no,
				 time_stamp,
				 nonceStr,
				 prepayId,
				 payauto,
				 _id:orderdata._id
			 }
			 new initdata(ctx,'SUCCESS',payData,200).listing()
		 }catch(err){
			 new initdata(ctx).tips('发起支付失败',500)
		 }
		}else{
			new initdata(ctx).tips(return_msg,400)
		}
		
		
		// 再次签名
		function signFun(nonce_str,prepay_id){
			return new Promise((resolve,reject)=>{
				const sign = WXPayUtil.generateSignature({
				    appId: appId,
				    nonceStr: nonce_str,
				    package: `prepay_id=${prepay_id}`,
				    signType: 'MD5',
				    timeStamp: time_stamp // 时间戳
				}, key);
				resolve(sign)
				reject('err')
			})
		}
		
		// 存储要支付的订单到数据库集合
		function wxpayFun(nonceStr,prepayId,payauto){
			return new Promise((resolve,reject)=>{
				let orderData = {
					timeing:datetime.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
					nonceStr,
					prepayId,
					payauto,
					out_trade_no,
					time_stamp,
					sign_type,
					Paymentinfor,
					body:commod,
					logo,
					total_fee:payment
				}
				const newOrder = new Wxpay({
					wxorder:orderData,
					_openid:useropenid,
					_merchantid:merchantid,
					status:0,//0:未支付；1：已支付
				})
				newOrder
				.save()
				.then((res)=>{
					resolve(res)
				})
				.catch((err)=>{
					reject(err)
				})
			})
}
	}else if(bodys.type == 'paysucc'){
		// 查询是否支付成功:前端只用传商户订单号即可
		const {out_trade_no,id,merchantid} = bodys
		// 参数校验
		new chstarting(ctx,out_trade_no,id,merchantid).chstartingFun(['请填写商户订单号','请填写该订单的唯一标识_id','请填写商家唯一标识'])
		const return_code = await wxpay.orderQuery({out_trade_no})
		if(return_code.trade_state === 'SUCCESS'){
			// 更改集合里status为1
			let wxpaycode = await wxpayCode()
			log(wxpaycode)
			if(wxpaycode === 'SUCCESS'){
				new initdata(ctx,'SUCCESS',wxpaycode,200).listing()
				// 用户支付成功，有新订单给到指定商家提醒
				let neworder = await neworDer()
			}
			function wxpayCode(){
				return new Promise((resolve,reject)=>{
					Wxpay.findByIdAndUpdate({_id:id},{status:1},(err,ret)=>{
						if(err){
							reject(err)
						}else{
							resolve('SUCCESS')
						}
					})
				})
			}
		
			// 实时通讯
			function neworDer(){
				return new Promise((resolve,reject)=>{
					// 测试实时通讯
					const channel = merchantid;
					const content = '我是由服务器端主动发消息给前端的';
					const queryParams = 'appkey='+appkey+'&channel='+channel+'&content='+content;
					var req = http.request(options, (res) => {
					    res.setEncoding('utf8');
					    res.on('data', (result) => {
					      resolve(result)
					    });
					  });
					
					  req.on('error', (e) => {
					    reject(e)
					  });
					
					  req.write(queryParams);
					  req.end();
				})
			}
		}
	}else if(bodys.type == 'myorder'){
		let{openid} = bodys
		// 参数校验
		new chstarting(ctx,openid).chstartingFun(['请填写用户openid'])
		let myorder = await Wxpay.find({_openid:openid})
		log(myorder)
		new initdata(ctx,'SUCCESS',myorder,200).listing()
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})


module.exports = router.routes()