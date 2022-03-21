import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {localStorage} from "@/utils/storage";
import useStore from "@/store";
import {BaseResponse} from "@/types/common";

// 创建 axios 实例
const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 50000,
    headers: {'Content-Type': 'application/json;charset=utf-8'}
})

// 请求拦截器
instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (!config.headers) {
            throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
        }
        const {user} = useStore()
        if (user.token) {
            config.headers = {
                "Authorization": `${localStorage.get('token')}`,
            }
        }
        return config
    }, (error) => {
        return Promise.reject(error);
    }
)

// 响应拦截器
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        const {status, message} = response.data;
        if (status === 100) {
            return response.data;
        } else {
            console.error({
                message: message || '系统出错',
                type: 'error'
            })
            return Promise.reject(new Error(message || 'Error'))
        }
    },
    (error) => {
        const {status, message} = error.response.data
        if (status === 100) {  // token 过期
            localStorage.clear(); // 清除浏览器全部缓存
            window.location.href = '/'; // 跳转登录页
            console.error('当前页面已失效，请重新登录', '提示', {})
        } else {
            console.error({
                message: message || '系统出错',
                type: 'error'
            })
        }
        return Promise.reject(new Error(message || 'Error'))
    }
);


const service = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
    try {
        const {data} = await instance.request<T>(config)
        return data
    } catch (err: any) {
        const message = err.message || "请求失败"
        console.error(message) // 失败消息提示
        return null as any
    }
}

// 导出 axios 实例
export default service