import {defineStore} from "pinia";
import {SettingState} from "@/types";

import {store} from "@/store";

export const useSettingStore = defineStore({
    id: 'app-setting',
    state: (): SettingState => ({
        fixed: false,
        menuSetting: {

        },
        navTheme: {

        },
        navMode:'',
        fixedHeader: true
    }),
    actions: {}
})

// Need to be used outside the setup
export function useUserSettingWithOut() {
    return useSettingStore(store);
}