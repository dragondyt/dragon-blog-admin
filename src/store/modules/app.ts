import {defineStore} from "pinia";
import {store} from "@/store";
import {AppState} from "@/types";

export const useAppStore = defineStore({
    id: 'app',
    state: (): AppState => ({
        tabsList: []
    }),
    actions: {
        initTabs(routes: any) {
            // 初始化标签页
            this.tabsList = routes;
        },
    }
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
    return useAppStore(store);
}