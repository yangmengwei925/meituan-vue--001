// 提示
const Titles = class{
  constructor(message,info,msg) {
      this.info = info
      this.msg = msg
      this.message = message

  }

 funtitle(){
      this.message({
        type: this.info,
        message: this.msg,
        duration:1500
      })
  }
}

export default  Titles
