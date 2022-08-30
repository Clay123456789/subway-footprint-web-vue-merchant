import axios from "axios"
import { ElMessage } from 'element-plus'


const service = axios.create({
    baseURL: 'https://thelittlestar.cn:8088',
    timeout: 3000,
    /*也可以不设置Content-Type，影响是在你发送请求时
    Vue会先发送OPTIONS包探测路由是否存在，需要后端也做设置响应OPTIONS
    方法，否则会报跨域错误；我这里用的Beego2，路由里不响应OPTIONS方法，
    所以我在这块设置Content-Type*/
    headers: {
        'Content-Type': 'multipart/form-data',
    }
})

service.interceptors.response.use(response => {
    const code = response.data.code || 200
    if (code === 200) {
        return response.data.data
    }

    let msg = response.data.code + " " + response.data.msg
    ElMessage.error(msg)

    return Promise.reject('上传图片失败：' + msg)
})

service.interceptors.request.use(req => {
    // 请求拦截处理
    //添加token
    if (localStorage.token) { //判断token是否存在
        ElMessage.success(JSON.parse(localStorage.getItem('token')))
        var token = JSON.parse(localStorage.getItem('token'))
        req.headers.token = token;  //将token设置成请求头
    }
    return req;
}, err => {
    console.log('在发送请求时发生错误，错误为', err);
    //这里不能直接放回err,需要按照官方说明返回一个Promise
    return Promise.reject(err);
})
/**
 * 上传图片
 * @param {File} file 图片文件
 * @param {RefImpl} progress 上传进度
 * @returns promise
 */
function uploadImage(file) {
    let formData = new FormData();
    formData.append("files", file)
    return service({
        url: "/file/uploadFiles",
        method: "post",
        data: formData,
    })
}

export { uploadImage }