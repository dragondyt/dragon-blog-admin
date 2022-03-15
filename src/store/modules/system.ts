import {defineStore} from "pinia";
import {SettingState} from "@/types";

import {store} from "@/store";
import {ref} from "vue";

export const useSettingStore = defineStore({
    id: 'app-setting',
    state: (): SettingState => ({
        fixed: false,
        menuSetting: {
            //最小宽度
            minMenuWidth: 64,
            //菜单宽度
            menuWidth: 200,
            //固定菜单
            fixed: true,
            //分割菜单
            mixMenu: ref(false),
        },
        //导航模式 vertical 左侧菜单模式 horizontal 顶部菜单模式
        navMode: 'vertical',
        //导航风格 dark 暗色侧边栏 light 白色侧边栏 header-dark 暗色顶栏
        navTheme: 'dark',
        fixedHeader: false,
        //多标签
        multiTabsSetting: {
            //背景色
            bgColor: '#fff',
            //是否显示
            show: true,
            //固定多标签
            fixed: true,
        },
        headerSetting: {
            //背景色
            bgColor: '#fff',
            //固定顶部
            fixed: true,
            //显示重载按钮
            isReload: true,
        },
        crumbsSetting: {
            //是否显示
            show: true,
            //显示图标
            showIcon: false,
        },
        //是否开启路由动画
        isPageAnimate: true,
        //路由动画类型
        pageAnimateType: 'zoom-fade',
    }),
    actions: {}
})

// Need to be used outside the setup
export function useUserSettingWithOut() {
    return useSettingStore(store);
}