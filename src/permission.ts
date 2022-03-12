import router from '@/router'
import {useUserStoreWithOut} from "@/store/modules/user";
import {useRouterStore, useRouterStoreWithOut} from "@/store/modules/router";

let asyncRouterFlag = 0
const whiteList = ['/login', 'Init']

const getRouter = async (userStore: any) => {
    const routerStore = useRouterStoreWithOut()
    await routerStore.setAsyncRouter()
    await userStore.getUserInfo()
    const asyncRouters = routerStore.asyncRouters
    asyncRouters.forEach(asyncRouter => {
        router.addRoute(asyncRouter)
    })
}

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStoreWithOut()
    const token = userStore.token
    console.debug(to.path)
    if (whiteList.indexOf(to.path) > -1) {
        next();
        return
    } else {
        // 不在白名单中并且已经登陆的时候
        if (token) {
            // 添加flag防止多次获取动态路由和栈溢出
            if (!asyncRouterFlag && whiteList.indexOf(from.path) < 0) {
                asyncRouterFlag++
                await getRouter(userStore)
                next({...to, replace: true})
            } else {
                if (to.matched.length) {
                    next()
                } else {
                    next({path: '/layout/404'})
                }
            }
        }
        // 不在白名单中并且未登陆的时候
        if (!token) {
            next({
                name: 'Login',
                query: {
                    redirect: document.location.hash
                }
            })
        }
    }
})