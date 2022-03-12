import {defineStore} from "pinia";
import {SettingState} from "@/types";

import {store} from "@/store";

export const useSettingStore = defineStore({
    id: 'app-setting',
    state: (): SettingState => ({
        fixed: false
    }),
    actions: {}
})

// Need to be used outside the setup
export function useUserSettingWithOut() {
    return useSettingStore(store);
}