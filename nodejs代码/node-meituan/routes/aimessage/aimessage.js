// 路由:()直接实例化
const router = require('koa-router')()
const {log} = console

// 时间
const datetime = require('silly-datetime');
// 校验
const {chstarting} = require('../../config/checking.js')
// 引入baiduai.js文件
const {options,client} = require('../../config/baiduai.js')
// 中间件捕获异常
const result = require('../../config/resultdata.js')
// 响应接收
const initdata = require('../../config/init.js')
// 模型
const Commentclass = require('../../models/comment.js')

// 小程序提交评论
router.post('/comment',async ctx=>{
	let{messages,avatarUrl,nickName,openid,merchantid} = ctx.request.body
	// 参数校验
	let vb = new chstarting(ctx,messages,avatarUrl,nickName,openid,merchantid)
	vb.chstartingFun(
	['评论内容不能为空','用户头像不能为空',
	'用户昵称不能为空','openid不能为空',
	'商家唯一标识不能为空'
	])
	const messageobj = {
		usermess:messages,
		time:datetime.format(new Date(), 'YYYY-MM-DD'),
		avatarUrl,
		nickName
	}
	
	try{//.then  .chacth
		let aimessage = await client.commentTag(messages, options)
		// log(aimessage)
		if(aimessage.items.length === 0){
			// 没有抽取到观点
			var classif = ''
		}else{
			// 存储到数据库集合
			let aione = aimessage.items[0]
			let [prop,adj] = [aione.prop,aione.adj]
			var classif = prop + adj
			
		}
	}catch(e){
		throw new result('评论失败',500)
		// new initdata(ctx).tips('评论失败',500)
	}
	try{
		// 存储到集合
		const messagedata = await new Commentclass({openid,merchantid,classmessage:classif,messagedata:messageobj}).save()
		new initdata(ctx).listing()
	}catch(e){
		throw new result('评论失败',500)
	}
	
})

// 获取指定商家商品下的评论
router.post('/discuss',async ctx=>{
	let {merchantid,classmessage} = ctx.request.body
	// 参数校验
	new chstarting(ctx,merchantid).chstartingFun(['商家唯一标识不能为空'])

	//  判断对象长度
	let arrleng = Object.keys(ctx.request.body).length
	// log(arrleng)
	let types = {}
	if(arrleng === 1){
		types['merchantid'] = merchantid
	}else{
		// 参数校验
		new chstarting(ctx,merchantid,classmessage).chstartingFun(['商家唯一标识不能为空','抽取观点不能为空'])
		
		types['merchantid'] = merchantid
		types['classmessage'] = classmessage
	}
	
	let listdata = await Commentclass.find(types)
	if(listdata.length === 0){
		new initdata(ctx,'没有评论',listdata,200).listing()
	}else{
		new initdata(ctx,'SUCCESS',listdata,200).listing()
	}
})


module.exports = router.routes()