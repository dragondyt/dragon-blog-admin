import { createRouter, createWebHashHistory } from 'vue-router'

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
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router