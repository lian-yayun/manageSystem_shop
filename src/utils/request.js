import axios from "axios"
import qs from "querystring"
import store from "../store"


/**
 * 处理失败的方法
 * status:状态码
 * info:信息
 */
const errorHandle = (status,info) =>{
    switch(status){
        case 400:
            console.log("语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。")
            break;
        case 401:
            // token:令牌
            console.log("服务器认证失败")
            break;
        case 403:
            console.log("服务器已经理解请求，但是拒绝执行它");
            break;
        case 404:
            console.log("请检查网络请求地址")
            break;
        case 500:
            console.log("服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器的程序码出错时出现。")
            break;
        case 502:
            console.log("作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应。")
            break;
        default:
            console.log(info)
            break;
    }
}



/**
 * 创建axios实例对象
 */

const instance = axios.create({
    // 公共配置
    timeout:5000
})

/**
 * 处理拦截器
 */

 /**
  * 请求拦截
  */
instance.interceptors.request.use(
    config => {
        if(config.method === "post"){
            config.data = qs.stringify(config.data)
        }
        // if(store.state.login.user.token){
        //     config.headers.authorization = store.state.login.user.token
        // }
        return config
    },
    error => Promise.reject(error)
)

/**
 * 响应拦截
 */
instance.interceptors.response.use(
    // 完成了
    response => response.status === 200 ? Promise.resolve(response) : Promise.reject(response),
    error => {
        const { response } = error;
        errorHandle(response.status,response.info);
    }
)


export default instance