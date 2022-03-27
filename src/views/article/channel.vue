<template>
  <n-data-table
      remote
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
import {h, onMounted, reactive, ref, VNode} from "vue";
import {Article, Channel, Columns} from "@/types";
import {delArticle, getPage} from "@/api/article";
import {NButton, NSpace, NTag, NTime, useDialog} from "naive-ui";
import {useRouter} from "vue-router";
import {getChannelPage} from "@/api/article/channel";

const router = useRouter();
const pagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  prefix({itemCount}: any) {
    return `总数量： ${itemCount}.`
  }
})

function deleteArticle(id: string) {
  delArticle(id).then(() => {
    initData()
  })
  console.log("删除")
}

function editArticle(id: string) {
  router.push({name: 'editArticle', params: {id}})
}

function publishArticle(id: string) {

}

const columns: Columns<Channel> = [
  {
    title: '渠道名',
    key: 'name'
  },
  {
    title: '渠道描述',
    key: 'description'
  },
  {
    title: '授权类型',
    key: 'type'
  },
  {
    title: '过期时间',
    key: 'expiresIn'
  },
  {
    title: '操作',
    key: 'action',
    render(row: Channel) {
      return h(NSpace, {}, () => [
        h(NButton, {
          textColor: 'black',
          onClick: () => publishArticle(row.id)
        }, {
          default: () => '刷新授权'
        }),
        h(NButton, {
          type: 'success',
          textColor: 'black',
          onClick: () => editArticle(row.id)
        }, {
          default: () => '重新授权'
        }),
        h(NButton, {
          type: 'error',
          textColor: 'black',
          onClick: () => deleteArticle(row.id)
        }, {
          default: () => '删除授权'
        }),
      ])
    }
  }
]
const data = ref<Array<Channel>>([])
const loading = ref(false)

function rowKey(rowData: Channel) {
  return rowData.id
}

function handleSorterChange() {

}

function handlePageChange() {

}

function handleFiltersChange() {

}

function initData() {
  getChannelPage({}).then(d => {
    data.value = d.content
    pagination.page = d.size
    pagination.pageSize = d.totalElements
    pagination.pageCount = d.totalPages
  })
}

onMounted(() => {
  initData()
})
</script>