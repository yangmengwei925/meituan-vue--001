const mongoose = require('mongoose')
const Schema = mongoose.Schema


// 评论
const Comment = new Schema({
	// 注册对象模型
	openid:{
		type:String,
		require:true
	},
	merchantid:{
		type:String,
		require:true
	},
	classmessage:{
		type:String,
		require:true
	},
	messagedata:{
		type:{},
		require:true
	},
	
},
	{
		versionKey:false
	}
)

module.exports = Commentclass = mongoose.model('commentdata',Comment)