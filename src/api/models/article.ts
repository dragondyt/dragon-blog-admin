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