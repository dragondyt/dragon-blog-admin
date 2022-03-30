import { Article } from '@/types';
import { UnwrapRef } from 'vue';
import { Page } from '@/types/common';
import { http } from '@/utils/http/axios';

export const saveArticle = async (article: UnwrapRef<Article>) => {
  return http.request({
    url: '/v1/articles',
    method: 'post',
    data: article,
  });
};
export const getPage = async (params: any) => {
  return http.request<Page<Article>>({
    url: '/v1/articles/page',
    method: 'get',
    params,
  });
};
export const delArticle = async (id: string) => {
  return http.request({
    url: `/v1/articles/${id}`,
    method: 'delete',
  });
};

export const getArticle = async (id: string) => {
  return http.request({
    url: `/v1/articles/${id}`,
    method: 'get',
  });
};
