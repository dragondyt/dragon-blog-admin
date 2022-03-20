import service from "@/utils/request";
import {UserState} from "@/types";

export const getOauth2Token = async (type: string, code: string) => {
    return service<UserState>({
        url: `/v1/oauth2/${type}?code=${code}`,
        method: 'get',
    })
}