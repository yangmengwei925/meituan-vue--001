const mongoose = require('mongoose')
const Schema = mongoose.Schema


// 微信支付：用户的订单集合字段
const PaySchema = new Schema({
	// 注册对象模型
	wxorder:{
		type:{},
		require:true
	},
	status:{
		type:Number,
		require:true
	},
	//用户的唯一标识openid
	_openid:{
		type:String,
		require:true
	},
	// 商家唯一标识
	_merchantid:{
		type:String,
		require:true
	}
},
	{
		versionKey:false
	}
)

module.exports = Wxpay = mongoose.model('ordering',PaySchema)