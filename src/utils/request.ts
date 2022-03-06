import axios, {AxiosRequestConfig} from 'axios' // 引入axios
const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 99999
})

interface BaseResponse<T = any> {
    message: string
    status: number
    timestamp: number
    data: T;
}

const service = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
    try {
        const {data} = await instance.request<BaseResponse<T>>(config)
        data.status === 100
            ? console.log(data.message) // 成功消息提示
            : console.error(data.message) // 失败消息提示
        return data.data
    } catch (err: any) {
        const message = err.message || '请求失败'
        console.error(message) // 失败消息提示
        return null as any
    }
}

export default service;