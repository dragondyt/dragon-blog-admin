import service from "@/utils/request";
import {Post, UserState} from "@/types";
import {UnwrapRef} from "vue";

export const saveArticle = async (article: UnwrapRef<Post>) => {
    return service<UserState>({
        url: '/v1/articles',
        method: 'post',
        data: article
    })
}
export const getPage = async (params: any) => {
    return service<UserState>({
        url: '/v1/articles/page',
        method: 'get',
        params
    })
}
export const delArticle = async (id: string) => {
    return service<UserState>({
        url: `/v1/articles/${id}`,
        method: 'delete',
    })
}

export const getArticle = async (id: string) => {
    return service<Post>({
        url: `/v1/articles/${id}`,
        method: 'get',
    })
}
