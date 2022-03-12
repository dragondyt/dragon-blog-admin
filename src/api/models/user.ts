import service from '@/utils/request';
import {RequestParams} from "@/api";
import {UserState} from "@/types";


export const login = (data: RequestParams) => {
    return service<UserState>({
        url: '/v1/auth/login',
        method: 'post',
        data: data
    })
}
export const getUserInfo = async () => {
    return service<UserState>({
        url: '/v1/users/me',
        method: 'get',
    })
}