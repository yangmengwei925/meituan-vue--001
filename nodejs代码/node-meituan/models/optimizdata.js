const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BusinessSchema = new Schema({
	openid:{//商家唯一标识
		type:String,
		required:true
	},
	shop:{//商家店名
		type:String,
		required:true
	},
	logo:{//logo
		type:String,
		required:true
	},
	delivering:{//起送金额
		type:Number,
		required:true
	},
	physical:{//配送金额
		type:Number,
		required:true
	},
	capita:{//人均价格
		type:Number,
		required:true
	},
	types:{//商品类型
		type:String,
		required:true
	},
	times:{//配送时间
		type:String,
		required:true
	},
	duration:{//配送时长
		type:String,
		required:true
	},
	address:{//商家地址
		type:String,
		required:true
	}
},
	{
		versionKey:false
	}
)

module.exports = Business = mongoose.model('businessmeituan',BusinessSchema)