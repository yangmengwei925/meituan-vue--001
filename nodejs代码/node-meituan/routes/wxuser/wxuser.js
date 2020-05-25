// 路由:()直接实例化
const router = require('koa-router')()
const request = require('request')
const qs = require('querystring')
const {log} = console

// 校验
const {chstarting} = require('../../config/checking.js')
// 响应接收
const initdata = require('../../config/init.js')
// 用户的数据模型
const Wxuser = require('../../models/wxuser.js')

router.post('/wxlogin',async ctx=>{
	log(123)
	let {nickName,avatarUrl,code} = ctx.request.body
	// 参数校验
	new chstarting(ctx,nickName,avatarUrl,code).chstartingFun(['请填写用户昵称','请填写用户头像','请填写code'])
	
	// url请求拼接
	const param = qs.stringify({
		appid:'wx404e88f75f32c85b',
		secret:'0402d0b4b834bf9449b2477115a2e25f',
		js_code:code,
		grant_type:'authorization_code'
	})
	
	let url = 'https://api.weixin.qq.com/sns/jscode2session?' + param
	
	// 获取openid
	try{
		const login = await wxloGin()
		let codes = JSON.parse(login)
		if(codes.errcode){
			new initdata(ctx).tips('登录失败',400)
		}
		// 查询时候已经登录过，如果数据库已经有该用户的信息，则不必再次存储，直接返回
		// 用户信息给前端，否则存储用户信息
		try{
			const userid = await userId(codes.openid)
			log(userid)
			if(userid.length === 0){
				// 没有改用户信息，存储到数据库集合
				try{
					let wxuser = await wxUser(codes.openid)
					new initdata(ctx,'SUCCESS',wxuser,200).listing()
				}catch(err){
					new initdata(ctx).tips('登录失败',500)
				}
			}else{
				// 数据库已经存在该用户信息
				new initdata(ctx,'SUCCESS',userid[0],200).listing()
			}
		}catch(err){
			new initdata(ctx).tips('登录失败',500)	
		}
	}catch(e){
		new initdata(ctx).tips('登录失败',500)
	}
	
	// 获取openid
	function wxloGin(){
		return new Promise((resolve,reject)=>{
			request(url,  (error, response, body)=> {
				if(!error && response.statusCode == 200){
					resolve(body)
				}else{
					reject(error)
				}
			})
		})
	}
	
	// 查询用户信息数据库集合
	function userId(openid){
		return new Promise((resolve,reject)=>{
			Wxuser.find({openid},(err,ret)=>{
				if(err){
					reject(err)
				}else{
					resolve(ret)
				}
			})
		})
	}
	
	// 存储用户信息到集合
	function wxUser(openid){
		return new Promise((resolve,reject)=>{
			const user = new Wxuser({
				nickName,
				avatarUrl,
				openid
			})
			user
			.save()
			.then((res)=>{
				resolve(res)
			})
			.catch((err)=>{
				reject(err)
			})
		})
		
	}
	
	
})

module.exports = router.routes()