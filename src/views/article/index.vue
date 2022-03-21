<template>
  <div>
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
  </div>
</template>

<script lang="ts" setup>
import {h, onMounted, reactive, ref} from "vue";
import {Article} from "@/types";
import {delArticle, getPage} from "@/api/article";
import {NButton, NSpace, NTag, NTime, useDialog} from "naive-ui";
import {useRouter} from "vue-router";

export interface Columns {

}

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

function editArticle(id: string | undefined) {
  router.push({name: 'editArticle', params: {id}})
}

function previewArticle(id: string | undefined) {

}

const columns: Array<Columns> = [
  {
    title: 'ID',
    key: 'id',
    sorter: true,
    sortOrder: false
  }, {
    title: '标题',
    key: 'title',
  },
  {
    title: '标签',
    key: 'tags',
    render(row: Article) {
      if (row.tags === undefined) {
        return h('span')
      }
      return row.tags.map((tagKey: string) => {
        return h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'info'
            },
            {
              default: () => tagKey
            }
        )
      })
    }
  },
  {
    title: '创建时间',
    key: 'createdDateTime',
    render(row: Article) {
      return h(NTime, {
        time: new Date(row.createdDateTime as string)
      })
    }
  },
  {
    title: '操作',
    key: 'action',
    render(row: Article) {
      return h(NSpace, {}, () => [
        h(NButton, {
          textColor: 'black',
          onClick: () => previewArticle(row.id)
        }, {
          default: () => '预览'
        }),
        h(NButton, {
          type: 'success',
          textColor: 'black',
          onClick: () => editArticle(row.id)
        }, {
          default: () => '编辑'
        }),
        h(NButton, {
          type: 'error',
          textColor: 'black',
          onClick: () => deleteArticle(row.id)
        }, {
          default: () => '删除'
        }),


      ])
    }
  }
]
const data = ref<Array<Article>>([])
const loading = ref(false)

function rowKey(rowData: any) {
  return rowData.title
}

function handleSorterChange() {

}

function handlePageChange() {

}

function handleFiltersChange() {

}

function initData() {
  getPage({}).then(d => {
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