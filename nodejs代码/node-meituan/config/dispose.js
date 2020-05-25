const {
    WXPay,
    WXPayUtil,
    WXPayConstants
 } = require('wx-js-utils');
 
 const appId = '你的appid'
 const mchId = '你的商户号'
 const key = '你的商户k'
 const timeout = 10000; // 毫秒
 const sign_type = WXPayConstants.SIGN_TYPE_MD5
 
 const wxpay = new WXPay({
     appId,
     mchId,
     key,
     timeout,
     signType: sign_type,  // 使用 HMAC-SHA256 签名，也可以选择  WXPayConstants.SIGN_TYPE_MD5，小程序默认是 WXPayConstants.SIGN_TYPE_MD
     useSandbox: false   // 不使用沙箱环境
 });
 
 // 实时通讯
 const options = {
     hostname: '你的实时通讯地址',
     path: '/publish',
     method: 'POST',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
     }
   };
   
   const appkey = '你的appkey';
 
 
 module.exports = {wxpay,key,appId,sign_type,WXPayUtil,options,appkey}