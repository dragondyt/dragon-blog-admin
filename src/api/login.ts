import { Captcha, LoginFormData, LoginResponseData } from "@/types";
import request from "@/utils/request";
import { AxiosPromise } from "axios";

/**
 * 登录
 * @param data
 */
export function login(data: LoginFormData) {
    return request<LoginResponseData>({
        url: '/v1/oauth/token',
        method: 'post',
        data: data,
        headers: {
            'Authorization': 'Basic bWFsbC1hZG1pbi13ZWI6MTIzNDU2' // 客户端信息Base64明文：mall-admin-web:123456
        }
    })
}

/**
 * 注销
 */
export function logout() {
    return request({
        url: '/v1/oauth/logout',
        method: 'delete'
    })
}

/**
 * 获取图片验证码
 */
export function getCaptcha(): AxiosPromise<Captcha> {
    return request({
        url: '/captcha?t=' + (new Date()).getTime().toString(),
        method: 'get'
    })
}