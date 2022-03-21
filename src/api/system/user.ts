import request from "@/utils/request";
import {User} from "@/types";

export function getUserInfo() {
    return request<User>({
        url: '/v1/users/me',
        method: 'get'
    })
}