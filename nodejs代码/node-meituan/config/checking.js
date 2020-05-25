// 参数检验
// 空校验
// 数字类型校验
// undefined校验
// 空格校验
// 手机号码
// 密码
const result = require('./resultdata.js')

class checkings{
	constructor(ctx,...obj) {
		console.log(obj)
		this.ctx = ctx
		this.obj = obj
	}
	
	// 检验前端开发者参数错误，为underfind
	Errunder(){
		console.log(this.obj.indexOf(undefined))
		let bvc = this.obj.indexOf(undefined)
		if(bvc != -1){
			throw new result('参数填写错误',400)
		}
	}
	
	// 校验用户填写为空
	Parameter(list){
		let bvc = this.obj.indexOf('')
		if(bvc != -1){
			throw new result(list[bvc],202)
		}
	}
	
	// 校验空格符号
	Blank(list){
		let vbn = this.obj.filter(item=>{
			return item.split(" ").join("").length === 0
		})
		let bvc = this.obj.indexOf(vbn[0])
		if(bvc != -1){
			throw new result(list[bvc],202)
		}
	}
	
	// 校验图片未上传
	Checimg(){
		if(this.ctx.req.file === undefined){
			throw new result('请上传图片',202)
		}
	}
	
	// 校验参数为数字类型
	Checnumber(list,numarr=0){
		if(numarr != 0){
			var numbering = numarr
		}else{
			var numbering = this.obj
		}
		let vbn = numbering.filter(item=>{
			return isNaN(item)
		})
		let bvc = numbering.indexOf(vbn[0])
		if(bvc != -1){
			throw new result(list[bvc],202)
		}
	}
	
	// 校验手机号码
	Phone(mobile){
		let phone = /^1[3456789]\d{9}$/
		if(!phone.test(this.obj[0])){
			throw new result(mobile,202)
		}
	}
	
	// 密码验证：6-20位数字和字母的组合
	Password(pass){
		let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
		if(!reg.test(this.obj[1])){
			throw new result(pass,202)
		}
	}
	
}

// 注册
class chregister extends checkings{
	chregisterFun(){
		super.Errunder()
		super.Phone('请填写正确的手机号码')
		super.Password('密码必须由6-20位数字和字母的组合')
	}
}

// 登录
class chlogin extends checkings{
	chloginFun(){
		let arr = ['请填写手机号码','请填写密码']
		super.Errunder()
		super.Parameter(arr)
		super.Blank(arr)
	}
}

// 为你优选
class chprefer extends checkings{
	chpreferFun(){
		let arr =['请填写商品标题','请填写商品描述']
		super.Checimg()
		super.Errunder()
		super.Parameter(arr)
		super.Blank(arr)
	}
}

// 删除为你优选 || 删除当前商家的商品分类 || 删除当前商家的商品数据
class chdeleprefer extends checkings{
	chdelepreferFun(){
		super.Errunder()
		super.Parameter(['id不能为空'])
		super.Blank(['id不能为空'])
	}
}

// 更改为你优选
class chupdataprefer extends checkings{
	chupdatapreferFun(){
		let arr =['请填写商品标题','请填写商品描述','id不能为空']
		super.Errunder()
		super.Parameter(arr)
		super.Blank(arr)
	}
}

// 商家设置的个人信息
class choss extends checkings{
	chossFun(numarr){
		let arr = ['商家标识不能为空','请填写商家名称','请填写起送金额','请填写配送金额','请填写人均价格','请填写商品类型','请填写配送时间','请填写配送时长','请填写商家地址',]
		let list = ['起送金额必须填写数字','配送金额必须填写数字','人均价格必须填写数字']
		super.Errunder()
		super.Checimg()
		super.Parameter(arr)
		super.Blank(arr)
		super.Checnumber(list,numarr)
	}
}

// 商家上传的商品的分类
class chshopcalss extends checkings{
	chshopcalssFun(){
		let arr = ['商家标识不能为空','请填写商品分类']
		super.Errunder()
		super.Parameter(arr)
		super.Blank(arr)
	}
}

// 上传商品
class chdishes extends checkings{
	chdishesFun(numarr){
		let arr = ['商家标识不能为空','请填写商品分类','请填写商品名称','请填写商品特色','请填写商品划线价','请填写商品优惠价']
		let list = ['商品划线价必须填写数字','商品优惠价必须填写数字']
		super.Errunder()
		super.Checimg()
		super.Parameter(arr)
		super.Blank(arr)
		super.Checnumber(list,numarr)
	}
}

// 小程序端综合排序，{单个条件排序} || 小程序端搜索接口 || 小程序提交评论
class chstarting extends checkings{
	chstartingFun(arr){
		super.Errunder()
		super.Parameter(arr)
		super.Blank(arr)
	}
}

// 微信支付
class chwxpaying extends checkings{
	chwxpayingFun(){
		let arr = [
		'请填写商品标题',
		'请截取一个7位数的商品id',
		'商家logo不能为空',
		'支付的价格不能为空',
		'商家唯一标识不能为空',
		'商品的详细数据不能为空',
		'下单用户的详细信息不能为空',
		'下单用户的openid不能为空'
		]
		super.Errunder()
		super.Parameter(arr)
		super.Blank(arr)
	}
}

module.exports = {
	chregister,
	chlogin,
	chprefer,
	chdeleprefer,
	chupdataprefer,
	choss,
	chshopcalss,
	chdishes,
	chstarting,
	chwxpaying
}