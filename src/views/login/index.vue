<template>
  <div class="w-[420px] p-6">
    <n-form ref="formRef" :model="model" :rules="rules">
      <n-form-item path="username" label="用户名">
        <n-input v-model:value="model.username" @keyup.enter="submitForm"/>
      </n-form-item>
      <n-form-item path="password" label="密码">
        <n-input
            v-model:value="model.password"
            type="password"
            @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item>
        <n-button @click="submitForm">登录
        </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {FormInst, FormItemRule, FormRules, useMessage} from "naive-ui";
import {useUserStore} from "@/store/modules/user";
import {ModelType} from "@/types";
const model = ref<ModelType>({
  username: null,
  password: null,
})

const rules: FormRules = {
  age: [
    {
      required: true,
      message:"请输入用户名",
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ],
}
const formRef = ref<FormInst | null>();
const message = useMessage();
const submitForm = (e: MouseEvent) => {
  e.preventDefault()
  const messageReactive = message.loading('Verifying', {
    duration: 0
  })
  formRef.value?.validate((errors) => {
    if (!errors) {
      useUserStore().loginIn(model.value);
    } else {
      message.error('请正确填写登录信息');
    }
    messageReactive.destroy();
  })
}
</script>