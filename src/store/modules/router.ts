import {defineStore} from "pinia";
import {store} from "@/store";
import {RouterState} from "@/types";
import {RouteRecordRaw} from "vue-router";
import {asyncMenu} from "@/api/models/menu";
import {asyncRouterHandle} from "@/utils/asyncRouter";

const routerListArr: any = []
const keepAliveRoutersArr: any = []

const formatRouter = (routes: Array<RouteRecordRaw>, routeMap: any) => {
    routes && routes.forEach((item: any) => {
        if ((!item.children || item.children.every((ch: any) => ch.hidden)) && item.name !== '404' && !item.hidden) {
            routerListArr.push({label: item.meta.title, value: item.name})
        }
        item.meta.btns = item.btns
        item.meta.hidden = item.hidden
        routeMap[item.name] = item
        if (item.children && item.children.length > 0) {
            formatRouter(item.children, routeMap)
        }
    })
}

const KeepAliveFilter = (routes: any) => {
    routes && routes.forEach((item: any) => {
        // 子菜单中有 keep-alive 的，父菜单也必须 keep-alive，否则无效。这里将子菜单中有 keep-alive 的父菜单也加入。
        if ((item.children && item.children.some((ch: any) => ch.meta.keepAlive) || item.meta.keepAlive)) {
            item.component && item.component().then((val: any) => {
                keepAliveRoutersArr.push(val.default.name)
            })
        }
        if (item.children && item.children.length > 0) {
            KeepAliveFilter(item.children)
        }
    })
}

export const useRouterStore = defineStore({
    id: 'app-router',
    state: (): RouterState => ({
        asyncRouters: [],
        routeMap: ({}),
        routerList: [],
        keepAliveRouters: []
    }),
    actions: {
        async setAsyncRouter() {
            const baseRouter: Array<RouteRecordRaw> = [{
                path: '/layout',
                name: 'layout',
                // @ts-ignore
                component: 'views/layout/index.vue',
                meta: {
                    title: '底层layout'
                },
                children: []
            }]
            const asyncRouter = await asyncMenu()
            asyncRouter.push({
                path: '404',
                name: '404',
                hidden: true,
                meta: {
                    title: '迷路了*。*',
                    closeTab: true,
                },
                // @ts-ignore
                component: 'views/error/index.vue'
            }, {
                path: 'reload',
                name: 'Reload',
                hidden: true,
                meta: {
                    title: '',
                    closeTab: true,
                },
                // @ts-ignore
                component: 'views/error/reload.vue'
            })
            formatRouter(asyncRouter, this.routeMap)
            baseRouter[0].children = asyncRouter
            baseRouter.push({
                path: '/:catchAll(.*)',
                redirect: '/layout/404'
            })
            asyncRouterHandle(baseRouter)
            KeepAliveFilter(asyncRouter)
            this.asyncRouters = baseRouter
            this.routerList = routerListArr
            this.keepAliveRouters = keepAliveRoutersArr
            return true
        }

    }
})

// Need to be used outside the setup
export function useRouterStoreWithOut() {
    return useRouterStore(store);
}