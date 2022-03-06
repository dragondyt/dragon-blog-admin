import {RouteLocationRaw, RouteRecordRaw} from "vue-router";

export interface UserState {
    userInfo: any;
    token: string;
    roleList: any;
    sessionTimeout?: boolean;
    lastUpdateTime: number;
}

export interface ModelType {
    age: string | null
    password: string | null
    reenteredPassword: string | null
}

export interface RouterState{
    asyncRouters: Array<RouteRecordRaw>
}