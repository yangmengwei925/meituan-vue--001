// 路由:()直接实例化
const router = require('koa-router')()
const {log} = console

// 校验
const {chstarting} = require('../../config/checking.js')

// 响应接收
const initdata = require('../../config/init.js')

// 为你优选模型
const Perfer = require('../../models/preferen')
// 商家设置
const Business = require('../../models/optimizdata.js')
// 商家订单
const Wxpay = require('../../models/wxpay.js')
// 商品分类
const Shopclass = require('../../models/classifica.js')
// 商品数据
const Dishesclass = require('../../models/adddishes.js')

// 拉取为你优选数据
router.get('/getprefer',async ctx=>{
	let listdata = await Perfer.find()
	if(listdata.length === 0){
		new initdata(ctx,'没有数据',listdata,200).listing()
	}else{
		new initdata(ctx,'SUCCESS',listdata,200).listing()
	}
})

// 商家的个人信息
router.post('/shop',async ctx=>{
	const openid = ctx.request.body.openid
	// 校验
	new chstarting(ctx,openid).chstartingFun(['商家唯一标识不能为空'])
	
	let listdata = await Business.find({openid})
	// log(listdata)
	if(listdata.length === 0){
		new initdata(ctx,'没有商家数据',listdata,200).listing()
	}else{
		new initdata(ctx,'SUCCESS',listdata,200).listing()
	}
	
})

// 小程序端所有商家的数据
router.get('/wxshop',async ctx=>{
	let listdata = await Business.find()
	if(listdata.length === 0){
		new initdata(ctx,'没有数据',listdata,200).listing()
	}else{
		new initdata(ctx,'SUCCESS',listdata,200).listing()
	}
})

// 获取当前商家的商品分类
router.post('/getshopcalss',async ctx=>{
	let openid = ctx.request.body.openid
	// 校验
	new chstarting(ctx,openid).chstartingFun(['商家唯一标识不能为空'])
	
	const listdata = await Shopclass.find({openid})
	if(listdata.length === 0){
		new initdata(ctx,'没有商品分类',listdata,200).listing()
	}else{
		new initdata(ctx,'SUCCESS',listdata,200).listing()
	}
})

// 获取当前商家的商品数据
router.post('/getdishes',async ctx=>{
	let {openid} = ctx.request.body
	// 校验
	new chstarting(ctx,openid).chstartingFun(['商家唯一标识不能为空'])
	
	const listdata = await Dishesclass.find({openid})
	if(listdata.length === 0){
		new initdata(ctx,'没有商品数据',listdata,200).listing()
	}else{
		new initdata(ctx,'SUCCESS',listdata,200).listing()
	}
	
})

// 小程序端综合排序，{单个条件排序}
router.post('/starting', async ctx=>{
	// nums:{1:升序;-1:降序},
	// screen:对哪个字段进行操作
	let {screen,nums} = ctx.request.body
	// 校验
	new chstarting(ctx,screen,nums).chstartingFun(['必填参数不能为空','必填参数不能为空'])

	let pams = {}
	pams[screen] = Number(nums)
	
	// 排序
	let listdata = await Business.find({}).sort(pams)
	if(listdata.length === 0){
		new initdata(ctx,'没有商品数据',listdata,200).listing()
	}else{
		new initdata(ctx,'SUCCESS',listdata,200).listing()
	}
	
	
})


// 小程序端多条件查询，排序
router.post('/multiple',async ctx=>{
	// lte:小于等于
	// gt：大于
	// gte：大于等于
	// ne：不等于
	// $lt:小于
	// {$lte:40,$get:20}:大于等于20小于等于40
	let {duration,deliver,physi,capita} = ctx.request.body
	
	let pamsing = {}
	// 配送最快
	if(duration){
		pamsing[duration] = 1
	}else{
		pamsing['_id'] = 1
	}
	
	let finding = {}
	// 人均价
	if(capita){
		finding['capita'] = capita
	}
	
	// 0元起送
	if(deliver){
		finding['delivering'] = 0
	}
	
	// 免配送费
	if(physi){
		finding['physical'] = 0
	}
	

	// 查询排序
	let listdata = await Business.find(finding).sort(pamsing)
	if(listdata.length === 0){
		new initdata(ctx,'没有商品数据',listdata,200).listing()
	}else{
		new initdata(ctx,'SUCCESS',listdata,200).listing()
	}
})


// 小程序端搜索接口
router.post('/search', async ctx=>{
	let {searchdata} = ctx.request.body
	// 校验
	new chstarting(ctx,searchdata).chstartingFun(['搜索词不能为空'])
	
	let types = {}
	types['types'] = {$regex:searchdata}
	
	let listdata = await Business.find(types)
	if(listdata.length === 0){
		new initdata(ctx,'没有商品数据',listdata,200).listing()
	}else{
		new initdata(ctx,'SUCCESS',listdata,200).listing()
	}
})

// 商家的订单
router.post('/merchantorder',async ctx=>{
	let {merchantid} = ctx.request.body
	// 校验
	new chstarting(ctx,merchantid).chstartingFun(['商家标识不能为空'])
	
	let listdata = await Wxpay.find({_merchantid:merchantid})
	if(listdata.length === 0){
		new initdata(ctx,'没有订单数据',listdata,200).listing()
	}else{
		new initdata(ctx,'SUCCESS',listdata,200).listing()
	}
	
})





module.exports = router.routes()