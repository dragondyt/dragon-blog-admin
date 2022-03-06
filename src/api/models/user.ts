import service from '@/utils/request';
import {RequestParams} from "@/api";
import {UserState} from "@/types";


export const login = (data: RequestParams) => {
    return service<UserState>({
        url: '/user/v1/login',
        method: 'post',
        data: data
    })
}