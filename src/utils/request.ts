import axios, { AxiosRequestConfig } from "axios" // 引入axios
import { emitter } from "@/utils/bus"
import { useUserStoreWithOut } from "@/store/modules/user"
import { useMessage } from "naive-ui"

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 99999,
})

interface BaseResponse<T = any> {
  message: string;
  status: number;
  timestamp: number;
  data: T;
}

let acitveAxios = 0
let timer: any
const showLoading = () => {
  acitveAxios++
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    if (acitveAxios > 0) {
      emitter.emit("showLoading")
    }
  }, 400)
};
const closeLoading = () => {
  acitveAxios--
  if (acitveAxios <= 0) {
    clearTimeout(timer)
    emitter.emit("closeLoading")
  }
}

interface MyAxiosRequestConfig extends AxiosRequestConfig {
  donNotShowLoading?: boolean;
}

instance.interceptors.request.use(
  (config: MyAxiosRequestConfig) => {
    if (!config.donNotShowLoading) {
      showLoading()
    }
    const userStore = useUserStoreWithOut()
    config.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userStore.token}`,
      "x-user-id": userStore.userInfo.ID,
      "Accept-Language": userStore.language, // added by mohame hassan to allow store selected language for multilanguage support.
      ...config.headers,
    }
    return config
  },
  (error) => {
    closeLoading();
    console.log(error)
    return error
  }
)

instance.interceptors.response.use(
  (response) => {
    const userStore = useUserStoreWithOut()
    closeLoading()
    if (response.headers["new-token"]) {
      userStore.setToken(response.headers["new-token"])
    }
    return response;
  },
  (error) => {
    closeLoading()
    console.log(error)
    return error
  }
)

const service = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await instance.request<BaseResponse<T>>(config)
    data.status === 100
      ? console.log(data.message) // 成功消息提示
      : console.error(data.message) // 失败消息提示
    return data.data
  } catch (err: any) {
    const message = err.message || "请求失败"
    console.error(message) // 失败消息提示
    return null as any
  }
}

export default service;
