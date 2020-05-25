const mongoose = require('mongoose')
const Schema = mongoose.Schema

// mongodb里面不能称为表，叫做文档或者集合
// 每一个Schema对应mongodb中的一个集合

// 允许Schema的数据类型有哪些:8大类型
// String
// Number
// Data
// Buffer:存储二进制数据,
// Boolean
// Objectid:{_id:'5ea71f88277bf20b2074a5f5'},
// Array:混合型数组,
// Mixed:可以指定任意类型:[]{}'',

// 实例化数据模板:注册功能字段
const NameSchema = new Schema({
	// 注册对象模型
	name:{
		type:String,
		require:true
	},
	password:{
		type:String,
		require:true
	},
	//商家的唯一标识
	openid:{
		type:String,
		require:true
	}
},
	{
		versionKey:false
	}
)

module.exports = Username = mongoose.model('usernamedata',NameSchema)