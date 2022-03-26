/**
 * 获取路由列表
 */
import request from "@/utils/request";
import {RouteRecordRaw} from "vue-router";

export function listRoutes() {
    return request<Array<RouteRecordRaw>>({
        url: '/v1/menus/route',
        method: 'get'
    })
}