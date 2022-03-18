<template>
  <div>
    <v-md-editor v-model="model.content" @save="showModal=!showModal" @change="change" height="600px"></v-md-editor>
    <n-modal v-model:show="showModal"
             positive-text="保存"
             negative-text="取消"
             @positive-click="onPositiveClick"
             @negative-click="onNegativeClick">
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
        </n-form>
      </n-card>
    </n-modal>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue";

export interface Post {
  title?: string
  tags?: string[]
  sticky: boolean
}

const showModal = ref(false)
const text = ref('')
const model = ref<Post>({
  sticky: false
})

function onPositiveClick() {

}

function onNegativeClick() {

}

function change(text: string, html: string) {
  console.debug("改变")
}
</script>