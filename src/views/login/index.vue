<template>
  <div class="flex flex-col overflow-auto h-screen">
    <div class="mx-auto my-0 w-[384px] py-8 flex-1">
      <div>
        <n-form ref="formRef" :model="model" :rules="rules">
          <n-form-item path="username">
            <n-input v-model:value="model.username" @keydown.enter.prevent placeholder="请输入用户名">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <PersonOutline/>
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
                v-model:value="model.password"
                placeholder="请输入密码"
                type="password"
                @keyup.enter="submitForm"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline/>
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item>
            <n-button @click="submitForm">登录
            </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {FormInst, FormItemRule, FormRules, useMessage} from "naive-ui";
import {useUserStore} from "@/store/modules/user";
import {ModelType} from "@/types";
import {PersonOutline, LockClosedOutline, LogoGithub, LogoFacebook} from '@vicons/ionicons5';

const model = ref<ModelType>({
  username: null,
  password: null,
})

const rules: FormRules = {
  username: [
    {
      required: true,
      message: "请输入用户名",
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
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      message.loading('登录中...');
      await useUserStore().loginIn(model.value);
      message.destroyAll();
      message.success('登录成功，即将进入系统');
    } else {
      message.error('请正确填写登录信息');
    }
  })
}

</script>