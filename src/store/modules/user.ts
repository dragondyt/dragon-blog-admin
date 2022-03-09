import {defineStore} from "pinia";
import {store} from "@/store";
import {ModelType, UserState} from "@/types";
import {login} from "@/api/models/user";
import {useRouterStore} from "@/store/modules/router";
import router from '@/router'

export const useUserStore = defineStore({
    id: 'app-user',
    state: (): UserState => ({
        // user info
        userInfo: {},
        // token
        token: '',
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

        setToken(val: string) {
            this.token = val
        },
        async loginIn(loginInfo: ModelType) {
            const user = await login(loginInfo)
            console.log(user)
            this.setUserInfo(user.userInfo)
            this.setToken(user.token)
            const routerStore = useRouterStore()
            await routerStore.setAsyncRouter()
            const asyncRouters = routerStore.asyncRouters
            asyncRouters.forEach(asyncRouter => {
                router.addRoute(asyncRouter)
            })
            router.push({name: 'dashboard'})
            return true
        }
    }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
    return useUserStore(store);
}