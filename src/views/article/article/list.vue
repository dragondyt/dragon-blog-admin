<template>
  <n-data-table
    :remote="true"
    ref="table"
    :columns="columns"
    :data="data"
    :loading="loading"
    :pagination="pagination"
    :row-key="rowKey"
    @update:sorter="handleSorterChange"
    @update:filters="handleFiltersChange"
    @update:page="handlePageChange"
  />
</template>

<script lang="ts" setup>
  import { h, onMounted, reactive, ref, VNodeChild } from 'vue';
  import { Article } from '@/types';
  import { delArticle, getPage } from '@/api/article';
  import { NButton, NSpace, NTag, NTime } from 'naive-ui';
  import { useRouter } from 'vue-router';

  export interface Columns<T> {
    title: string;
    key: string;
    render?: (rowData: T, rowIndex: number) => VNodeChild;
  }

  const router = useRouter();
  const pagination = reactive({
    page: 1,
    pageCount: 1,
    pageSize: 10,
    prefix({ itemCount }: any) {
      return `总数量： ${itemCount}.`;
    },
  });

  function deleteArticle(id: string) {
    delArticle(id).then(() => {
      initData();
    });
    console.log('删除');
  }

  function editArticle(id: string) {
    router.push({ name: 'article_edit', params: { id } });
  }

  function publishArticle(id: string) {
    console.debug(id);
  }

  const columns: Array<Columns<Article>> = [
    {
      title: '标题',
      key: 'title',
    },
    {
      title: '标签',
      key: 'tags',
      render(row: Article) {
        if (row.tags === undefined) {
          return h('span');
        }
        return row.tags.map((tagKey: string) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px',
              },
              type: 'info',
            },
            {
              default: () => tagKey,
            }
          );
        });
      },
    },
    {
      title: '创建时间',
      key: 'createdDateTime',
      render(row: Article) {
        return h(NTime, {
          time: new Date(row.createdDateTime as string),
        });
      },
    },
    {
      title: '操作',
      key: 'action',
      render(row: Article) {
        return h(NSpace, {}, () => [
          h(
            NButton,
            {
              textColor: 'black',
              onClick: () => publishArticle(row.id),
            },
            {
              default: () => '发布',
            }
          ),
          h(
            NButton,
            {
              type: 'success',
              textColor: 'black',
              onClick: () => editArticle(row.id),
            },
            {
              default: () => '编辑',
            }
          ),
          h(
            NButton,
            {
              type: 'error',
              textColor: 'black',
              onClick: () => deleteArticle(row.id),
            },
            {
              default: () => '删除',
            }
          ),
        ]);
      },
    },
  ];
  const data = ref<Array<Article>>([]);
  const loading = ref(false);

  function rowKey(rowData: Article) {
    return rowData.id;
  }

  function handleSorterChange() {}

  function handlePageChange() {}

  function handleFiltersChange() {}

  function initData() {
    getPage({}).then((d) => {
      data.value = d.content;
      pagination.page = d.size;
      pagination.pageSize = d.totalElements;
      pagination.pageCount = d.totalPages;
    });
  }

  onMounted(() => {
    initData();
  });
</script>
