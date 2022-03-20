import {createRouter, createWebHashHistory} from 'vue-router'
export const Layout = () => import('@/layout/index.vue')
const routes = [{
    path: '/',
    redirect: '/login'
},
    {
        path: '/init',
        name: 'Init',
        component: () => import('@/views/init/index.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/redirect',
        name: 'Redirect',
        component: Layout,
        meta: {
            title: 'Redirect',
            hideBreadcrumb: true,
        },
        children: [
            {
                path: '/redirect/:path(.*)',
                name: 'RedirectOther',
                component: () => import('@/views/redirect/index.vue'),
                meta: {
                    title: 'Redirect',
                    hideBreadcrumb: true,
                },
            },
        ],
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router