const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShopSchema = new Schema({
	openid:{
		type:String,
		required:true
	},
	classdata:{
		type:String,
		required:true
	}
},
	{
	versionKey:false
	}
)

module.exports = Shopclass = mongoose.model('categories',ShopSchema)