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
        <n-form ref="formRef" :model="model" :rules="rules">
          <n-form-item path="title" label="标题">
            <n-input v-model:value="model.title" placeholder="请输入文章标题" @keydown.enter.prevent/>
          </n-form-item>
          <n-form-item path="tags" label="标签">
            <n-dynamic-tags v-model:value="model.tags"/>
          </n-form-item>
          <n-input
              v-model:value="model.description"
              type="textarea"
              placeholder="基本的 Textarea"
          />
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
import {onMounted, ref} from "vue";
import {getArticle, saveArticle} from "@/api/models/article";
import {Post} from "@/types";
import * as CRC32 from 'crc-32'
import {FormInst, FormRules, useMessage} from "naive-ui";
import {useRoute} from "vue-router";

const formRef = ref<FormInst | null>()
const message = useMessage()

const showModal = ref(false)
const loading = ref(false)
const model = ref<Post>({
  sticky: false,
  title: '',
  id: ''
})

const rules: FormRules = {
  title: [
    {
      required: true,
      message: '请输入标题'
    }
  ],
}

function change(text: string, html: string) {
  console.debug("改变")
}

function save() {
  formRef.value?.validate((errors => {
    if (!errors) {
      loading.value = true
      model.value.id = (CRC32.str(model.value.title) >>> 0).toString(16)
      saveArticle(model.value)
          .then(() => {
            showModal.value = false
            message.success('成功')
          })
          .catch(() => {
            message.error('失败')
          })
    } else {
      message.error('失败')
      console.log('errors', errors)
    }
  }))

}

const route = useRoute();
onMounted(() => {
  getArticle(route.params.id as string).then(a => {
    model.value = a
  })
})

</script>