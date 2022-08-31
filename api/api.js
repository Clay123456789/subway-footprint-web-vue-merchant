import http from './http.js'
import {ElMessage} from "element-plus";

// // 获取验证码，这个函数指的是使用GET请求请求目标服务器的

// export function getCaptcha() {
//     return http.get("/captcha")
// }  
// // 验证用户名\密码，这里指的是使用POST方法请求Login接口，并携带params对象作为参数。
// export function verifyUserNameAPI(params) {
//     return http.post("/login", params)
// }
// https://thelittlestar.cn:8088/award/getAward?aid=2222
export function getUserTreasure(params){
    return http.post_q("/treasure/getUserTreasure",params)
}

export function getAward(params) {
    return http.post_q("/award/getAward", params)
}

export function addAward(params) {
    return http.post("award/addAward",params)
}

export function getAllAwards(params) {
    ElMessage.success("111")
    return http.post("/award/getAllAwards",params)
}

export function login(params){
    return http.post("/merchant/login",params)
}

export function changePassword(params){
    return http.post("/merchant/changePassword",params)
}
export function getMerchant(params){
    return http.post("/merchant/getMerchant",params)
}
export function getCode(params){
    return http.post("/merchant/sendRegistEmail",params)
}
export function modifyMerc(params){
    return http.post("/merchant/updateMerchant",params)
}
export function uploadImage(params){
    return http.post("/merchant/updateMerchant",params)
}
export function submitImg(params){
    return http.post_q("merchant/submitAuthentication",params)
}
export function regist(params){
    return http.post("/merchant/regist",params)
}