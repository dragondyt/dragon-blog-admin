import {RouteLocationRaw, RouteRecordRaw} from "vue-router";
import {MenuOption} from "naive-ui";

export interface UserState {
    userInfo: any;
    token: string;
    roleList: any;
    sessionTimeout?: boolean;
    lastUpdateTime: number;

    [key: string]: any
}

export type Menu = RouteRecordRaw & {
    component: string
}

export interface ModelType {
    username: string | null
    password: string | null
}

export interface RouterState {
    asyncRouters: Array<RouteRecordRaw>
    routeMap: ({})
    routerList: MenuOption[]
    keepAliveRouters: any
}
export interface SettingState {
    fixed: boolean
    menuSetting: any
    navTheme: any
    navMode: any
    fixedHeader: any
    headerSetting: any
    crumbsSetting: any
    isPageAnimate: any
    pageAnimateType: any
    multiTabsSetting: any
}