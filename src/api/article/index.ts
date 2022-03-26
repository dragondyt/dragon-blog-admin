import service from "@/utils/request";
import {Article} from "@/types";
import {UnwrapRef} from "vue";
import {AxiosPromise} from "axios";
import {Page} from "@/types/common";

export const saveArticle = async (article: UnwrapRef<Article>) => {
    return service({
        url: '/v1/articles',
        method: 'post',
        data: article
    })
}
export const getPage = async (params: any) => {
    return service<Page<Article>>({
        url: '/v1/articles/page',
        method: 'get',
        params
    })
}
export const delArticle = async (id: string) => {
    return service({
        url: `/v1/articles/${id}`,
        method: 'delete',
    })
}

export const getArticle = async (id: string) => {
    return service({
        url: `/v1/articles/${id}`,
        method: 'get',
    })
}
