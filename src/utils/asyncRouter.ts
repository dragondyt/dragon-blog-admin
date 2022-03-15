import {RouteRecordRaw} from "vue-router";
import { DashboardOutlined } from '@vicons/antd';
import {NIcon} from "naive-ui";
import {h, VNode} from "vue";

const modules = import.meta.glob('../views/**/*.vue')

export const asyncRouterHandle = (asyncRouter: Array<RouteRecordRaw>) => {
    asyncRouter.forEach(item => {
        if (item.component) {
            item.component = dynamicImport(modules, item.component)
        } else {
            delete item['component']
        }
        if (item.children) {
            asyncRouterHandle(item.children)
        }
    })
}

function dynamicImport(
    dynamicViewsModules: any,
    component: any
) {
    const keys = Object.keys(dynamicViewsModules)
    const matchKeys = keys.filter((key) => {
        const k = key.replace('../', '')
        return k === component
    })
    const matchKey = matchKeys[0]

    return dynamicViewsModules[matchKey]
}

/**
 * render 图标
 * */
export function renderIcon(icon:any) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

//前端路由图标映射表
export const constantRouterIcon = {
    DashboardOutlined: renderIcon(DashboardOutlined),
};
