import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import useStore from "@/store";

const Layout = () => import( '@/layout/index.vue')

export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: {hidden: true}
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                name: 'Dashboard',
                meta: {title: 'dashboard', icon: 'dashboard', affix: true}
            }
        ]
    },
    {
        path: '/article',
        name: 'ArticleManagement',
        component: Layout,
        redirect: '/list',
        meta: {title: '文章管理', icon: 'DashboardOutlined'},
        children: [
             {
                path: 'add',
                name: 'addArticle',
                component: () => import('@/views/article/add.vue'),
                meta: {title: '新增', icon: 'DashboardOutlined'}
            },
            {
                path: 'list',
                name: 'ArticleList',
                component: () => import('@/views/article/index.vue'),
                meta: {title: '文章列表', icon: 'DashboardOutlined'}
            }
            , {
                path: 'channel',
                name: 'ChannelManagement',
                component: () => import('@/views/article/channel.vue'),
                meta: {title: '渠道管理', icon: 'DashboardOutlined'}
            }
            , {
                path: ':id',
                name: 'editArticle',
                component: () => import('@/views/article/add.vue'),
                meta: {hidden: true}
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
    // 刷新时，滚动条位置还原
    scrollBehavior: () => ({left: 0, top: 0})
})

// 重置路由
export function resetRouter() {
    const {permission} = useStore()
    permission.routes.forEach((route) => {
        const name = route.name
        if (name && router.hasRoute(name)) {
            router.removeRoute(name)
        }
    })
}

export default router