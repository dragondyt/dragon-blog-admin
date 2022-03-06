import {defineStore} from "pinia";
import {store} from "@/store";
import {ModelType, RouterState, UserState} from "@/types";
import {login} from "@/api/models/user";

export const useRouterStore = defineStore({
    id: 'app-router',
    state: (): RouterState => ({
        asyncRouters: []
    }),
    actions: {
        async setAsyncRouter(){

        }
    }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
    return useRouterStore(store);
}