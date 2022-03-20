import router from '@/router'
import {useUserStoreWithOut} from "@/store/modules/user";
import {useRouterStoreWithOut} from "@/store/modules/router";
import { getOauth2Token} from "@/api/models/oauth2";

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

const getQueryString = (name: string, search?: string): string | null => {
    search = search || window.location.search.substr(1) || window.location.hash.split("?")[1];
    if (!search) {
        return null
    }
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = search.match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

router.beforeEach(async (to, from, next) => {
    const type = getQueryString('type');
    const code = getQueryString('code');
    if (type!==null&&code!=null){
        getOauth2Token(type,code).then()
    }
    const userStore = useUserStoreWithOut()
    const token = userStore.token
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