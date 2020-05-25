//上传图片和其他类型的数据到数据
let {uploadimg} = require('../oss/oss.js')
let {log} = console
class uploading{
	constructor(ctx,obj,image,Perfer) {
	    // 上传图片到数据库是个异步，等到图片上传到阿里云返回
		// 链接来再一并上传到数据库
		this.ctx = ctx
		this.obj = obj
		this.image = image
		// 操作哪个对象模型
		this.Perfer = Perfer
	}
	
	async resultdata(){
		// 1等到图片上传到阿里云返回链接
		let upimg = await this.upimgFun()
		this.obj[this.image] = upimg
		// 2存储到集合
		try{
			let optidata = await this.optiData(this.obj)
			this.pull('SUCCESS',optidata,201)
			// log('正确')
		}catch(e){
			this.pull('上传失败',[],500)
			// log('失败')
		}
	}
	
	// 上传图片到阿里云
	upimgFun(){
		return new Promise((resolve,reject)=>{
			uploadimg(this.ctx.req.file.path)
			.then((res)=>{
				resolve(res)
			})
			.catch((err)=>{
				reject(err)
			})
		})
	}
	
	// 存储到集合
	optiData(obje){
		return new Promise((resolve,reject)=>{
			new this.Perfer(obje)
			// 存储到数据库
			.save()
			.then((res)=>{
				resolve(res)
			})
			.catch((err)=>{
				reject(err)
			})
		})
	}
	
	// 响应
	pull(msg,data,code){
		this.ctx.body = {
			msg:msg,
			data:data
		}
		this.ctx.status = code
	}
}

// 更改为你优选
class modify extends uploading{
	constructor(ctx,obj,image,Perfer,ids) {
	    super(ctx,obj,image,Perfer)
		this.ids = ids
	}
	
	// 修改了图片
	async preference(){
		// 等待图片上传到阿里云oss
		let upimg = await this.upimgFun()
		log('商家修改的新图片地址' + upimg)
		try{
			let toupdata = await this.toupdata(upimg)
			this.pull('SUCCESS',[],201)
		}catch(e){
			this.pull('修改失败',[],500)
		}
	}
	
	// 更新集合里的数据
	toupdata(upimg){
		return new Promise((resolve,reject)=>{
			this.obj[this.image] = upimg
			this.Perfer.findByIdAndUpdate({_id:this.ids},this.obj,
			(err,res)=>{
				if(err){
					reject(err)
					this.pull('修改失败',[],500)
				}else{
					resolve(res)
					this.pull('SUCCESS',[],201)
				}
			})
			
		})
	}
	
}


// 上传商品数据到集合
class variety extends uploading{
	constructor(ctx,obj,image,Perfer) {
	    super(ctx,obj,image,Perfer)
	}
	
	async varietyupta(){
		let upimg = await this.upimgFun()
		this.obj.objdis[this.image] = upimg
		try{
			let optidata = await this.optiData(this.obj)
			this.pull('SUCCESS',optidata,201)
		}catch(e){
			this.pull('上传失败',[],500)
		}
		
	}
}




module.exports = {uploading,modify,variety}