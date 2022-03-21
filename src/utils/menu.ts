import * as  icons from '@vicons/antd'
import {renderIcon} from "@/store/modules/permission";

/**
 * 递归组装菜单格式
 */
export function generatorMenu(routerMap: Array<any>) {
    console.log("生成")
    return filterRouter(routerMap).map((item) => {
        const currentMenu = {
            ...item,
            ...item.meta,
            label: item.meta?.title,
            key: item.name,
            // @ts-ignore
            icon: renderIcon(icons[item.meta?.icon]),
        };
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
            // Recursion
            currentMenu.children = generatorMenu(item.children);
        }
        return currentMenu;
    });
}

/**
 * 排除Router
 * */
export function filterRouter(routerMap: Array<any>) {
    return routerMap.filter((item) => {
        return (
            (item.meta?.hidden || false) != true && !['/:path(.*)*', '/', '/redirect', '/login'].includes(item.path)
        );
    });
}