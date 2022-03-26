import {defineStore} from "pinia";
import {PermissionState} from "@/types";
import {RouteRecordRaw} from "vue-router";
import {constantRoutes} from '@/router'
import {listRoutes} from "@/api/system/menu";

const modules = import.meta.glob("../../views/**/**.vue");
import * as icons from '@vicons/antd';
import {h} from "vue";
import {NIcon} from "naive-ui";

export const Layout = () => import( '@/layout/index.vue')

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
    if (route.meta && route.meta.roles) {
        if (roles.includes('ROOT')) {
            return true
        }
        return roles.some(role => {
            if (route.meta?.roles !== undefined) {
                return (route.meta.roles as string[]).includes(role);
            }
        })
    }
    return false
}

/**
 * render 图标
 * */
export function renderIcon(icon: any) {
    return () => h(NIcon, null, {default: () => h(icon)});
}

export const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
    const res: RouteRecordRaw[] = []
    routes.forEach(route => {
        const tmp = {...route} as any
        if (tmp.meta && tmp.meta.icon) {
            tmp.meta.icon = renderIcon(icons['DashboardOutlined'])
        }
        if (hasPermission(roles, tmp)) {
            if (tmp.component == 'Layout') {
                tmp.component = Layout
            } else {
                const component = modules[`../../views/${tmp.component}.vue`] as any;
                if (component) {
                    tmp.component = modules[`../../views/${tmp.component}.vue`];
                } else {
                    tmp.component = modules[`../../views/error-page/404.vue`];
                }
            }
            res.push(tmp)

            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
        }
    })
    return res
}

const usePermissionStore = defineStore({
    id: "permission",
    state: (): PermissionState => ({
        routes: [],
        addRoutes: []
    }),
    actions: {
        setRoutes(routes: RouteRecordRaw[]) {
            this.addRoutes = routes
            this.routes = constantRoutes.concat(routes)
        },
        generateRoutes(roles: Array<string>) {
            return new Promise((resolve, reject) => {
                listRoutes().then(asyncRoutes => {
                    let accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
                    this.setRoutes(accessedRoutes)
                    resolve(accessedRoutes)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
})
export default usePermissionStore