import service from "@/utils/request";
import {Menu} from "@/types";

export const asyncMenu = () => {
    return service<Array<Menu>>({
        url: '/v1/menus',
        method: 'get'
    })
}