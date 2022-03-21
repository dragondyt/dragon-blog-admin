import router from "@/router";
import useStore from "@/store";

// 白名单
const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, form, next) => {
    const { user, permission } = useStore()
    const hasToken = user.token
    if (hasToken) {
        // 如果登录成功，跳转到首页
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            const hasGetUserInfo = user.roles.length > 0
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    await user.getUserInfo()
                    const roles = user.roles
                    const accessRoutes: any = await permission.generateRoutes(roles)
                    accessRoutes.forEach((route: any) => {
                        router.addRoute(route)
                    })
                    next({ ...to, replace: true })
                } catch (error) {
                    // remove token and go to login page to re-login
                    await user.resetToken()
                    console.error(error as any || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                }
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})

router.afterEach(() => {
})
