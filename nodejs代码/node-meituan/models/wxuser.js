const mongoose = require('mongoose')
const Schema = mongoose.Schema


// 实例化数据模板:微信登录功能字段
const WxSchema = new Schema({
	// 注册对象模型
	nickName:{
		type:String,
		require:true
	},
	avatarUrl:{
		type:String,
		require:true
	},
	//用户的唯一标识openid
	openid:{
		type:String,
		require:true
	}
},
	{
		versionKey:false
	}
)

module.exports = Wxuser = mongoose.model('wxuser',WxSchema)