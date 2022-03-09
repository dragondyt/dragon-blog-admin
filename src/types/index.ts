import {RouteLocationRaw, RouteRecordRaw} from "vue-router";

export interface UserState {
    userInfo: any;
    token: string;
    roleList: any;
    sessionTimeout?: boolean;
    lastUpdateTime: number;

    [key: string]: any
}

export type Menu = RouteRecordRaw

export interface ModelType {
    username: string | null
    password: string | null
}

export interface RouterState {
    asyncRouters: Array<RouteRecordRaw>
    routeMap: ({})
    routerList: any
    keepAliveRouters: any
}