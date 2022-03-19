<template>
  <n-space vertical>
    <v-md-editor v-model="model.content" @save="showModal=!showModal" @change="change" height="600px"></v-md-editor>
    <n-modal v-model:show="showModal"
             :mask-closable="false">
      <n-card
          style="width: 600px"
          title="保存文章"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
      >
        <n-form ref="formRef" :model="model">
          <n-form-item path="age" label="标题">
            <n-input v-model:value="model.title" placeholder="请输入文章标题" @keydown.enter.prevent/>
          </n-form-item>
          <n-form-item path="tags" label="标签">
            <n-dynamic-tags v-model:value="model.tags"/>
          </n-form-item>
          <n-form-item path="sticky" :show-label="false">
            <n-checkbox v-model:checked="model.sticky">
              置顶
            </n-checkbox>
          </n-form-item>
          <n-space justify="end">
            <n-button @click="showModal=false">取消</n-button>
            <n-button @click="save" type="success" dashed>
              保存
            </n-button>
          </n-space>
        </n-form>
      </n-card>
    </n-modal>
  </n-space>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import {saveArticle} from "@/api/models/article";
import {Post} from "@/types";
import * as CRC32 from 'crc-32'

const showModal = ref(false)
const loading = ref(false)
const model = ref<Post>({
  sticky: false,
  title: ''
})

function change(text: string, html: string) {
  console.debug("改变")
}

function save() {
  loading.value = true
  model.value.id = (CRC32.str(model.value.title) >>> 0).toString(16)
  saveArticle(model.value)
      .then(() => {
        showModal.value = false
      })
      .catch(() => loading.value = false)
}
</script>