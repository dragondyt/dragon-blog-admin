import service from "@/utils/request";
import {Channel, Page} from "@/types";

export const getChannelPage = async (params: any) => {
    return service<Page<Channel>>({
        url: '/v1/channels/page',
        method: 'get',
        params
    })
}