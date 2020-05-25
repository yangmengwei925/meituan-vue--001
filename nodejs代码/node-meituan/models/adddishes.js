const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Shopdishes = new Schema({
	openid:{
		type:String,
		required:true
	},
	optidata:{
		type:String,
		required:true
	},
	objdis:{
		input:{
			type:String,
			required:true
		},
		tags:{
			type:[String],
			required:true
		},
		Price:{
			type:Number,
			required:true
		},
		Discount:{
			type:Number,
			required:true
		},
		image:{
			type:String,
			required:true
		}
	}
},
	{
	versionKey:false
	}
)

module.exports = Dishesclass = mongoose.model('dishes',Shopdishes)