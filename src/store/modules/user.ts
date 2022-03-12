import {defineStore} from "pinia";
import {store} from "@/store";
import {ModelType, UserState} from "@/types";
import {getUserInfo, login} from "@/api/models/user";
import {useRouterStore} from "@/store/modules/router";
import router from '@/router'
import {ref} from "vue";

export const useUserStore = defineStore({
    id: 'app-user',
    state: (): UserState => ({
        // user info
        userInfo: {},
        // token
        token: window.localStorage.getItem('token') || '',
        language: 'en',
        // roleList
        roleList: [],
        // Whether the login expired
        sessionTimeout: false,
        // Last fetch time
        lastUpdateTime: 0,
    }),
    actions: {

        setUserInfo(val: any) {
            this.userInfo = val
        },

        async getUserInfo() {
            const userInfo = await getUserInfo()
            this.setUserInfo(userInfo)
            return userInfo
        },

        setToken(val: string) {
            this.token = val
            window.localStorage.setItem('token', val)
        },

        async loginIn(loginInfo: ModelType) {
            const user = await login(loginInfo)
            this.setUserInfo(user.userInfo)
            this.setToken(user.token)
            const routerStore = useRouterStore()
            await routerStore.setAsyncRouter()
            const asyncRouters = routerStore.asyncRouters
            asyncRouters.forEach(asyncRouter => {
                router.addRoute(asyncRouter)
            })
            router.push({name: 'dashboard'})
        }
    }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
    return useUserStore(store);
}