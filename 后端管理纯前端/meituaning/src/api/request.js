var url = 'http://localhost:5000/api/'

// 添加为你优选
let preferurl = `${url}banner/prefer/`

// 商家添加商品
let dishesurl = `${url}banner/dishes/`

// 拉取商品分类
let getshopcalssurl = `${url}forshop/getshopcalss`

// 添加商品分类
let shopcalssurl = `${url}banner/shopcalss`

// 删除商品分类
let deleshopcalssurl = `${url}banner/deleshopcalss`

// 修改商品
let updatapreferurl = `${url}banner/updataprefer/`

// 提交商家设置
let shopossurl = `${url}banner/oss/`

//请求成功显示商家信息{商家设置}
let shopsuccurl = `${url}forshop/shop`

// 登录
let loginurl = `${url}banner/login`

// 商家订单
let merchantorderurl = `${url}forshop/merchantorder`

// 拉取为你优选
let getpreferurl = `${url}forshop/getprefer`

// 为你优选删除商品
let delepreferurl = `${url}banner/deleprefer`

// 菜品管理
let getdishesurl = `${url}forshop/getdishes`

// 菜品管理{删除商品}
let deledishesurl = `${url}banner/deledishes`


export{preferurl,dishesurl,getshopcalssurl,shopcalssurl,deleshopcalssurl,updatapreferurl,
shopossurl,shopsuccurl,loginurl,merchantorderurl,getpreferurl,delepreferurl,
getdishesurl,deledishesurl}
