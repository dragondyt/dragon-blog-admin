<template>
  <n-form ref="formRef" :model="loginForm" :rules="rules">
    <n-form-item path="username" label="用户名">
      <n-input v-model:value="loginForm.username" @keydown.enter.prevent/>
    </n-form-item>
    <n-form-item path="password" label="密码">
      <n-input
          v-model:value="loginForm.password"
          type="password"
          :input-props="{autocomplete: 'off'}"
          @keydown.enter.prevent
      />
    </n-form-item>
    <n-row :gutter="[0, 24]">
      <n-col :span="24">
        <div class="flex justify-end">
          <n-button
              :disabled="loginForm.username === null"
              round
              type="primary"
              @click="handleLogin"
          >
            验证
          </n-button>
        </div>
      </n-col>
    </n-row>
  </n-form>
</template>

<script lang="ts" setup>
import {FormInst, FormRules, useMessage} from "naive-ui";
import {reactive, ref, toRefs} from "vue";
import {LoginFormData} from "@/types";
import {useRouter} from "vue-router";
import useStore from "@/store";

const message = useMessage();
const router = useRouter();
const { user } = useStore();
const formRef = ref<FormInst | null>(null)
const rules: FormRules = {}
const state = reactive({
  loginForm: {
    username: "admin",
    password: "123456",
    code: "",
    uuid: "",
  } as LoginFormData,
  loading: false,
  redirect: '',
  otherQuery: {}
})
const {loginForm} = toRefs(state)

function handleLogin(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      state.loading = true;
      user.login(state.loginForm)
          .then(() => {
            router.push({ path: state.redirect || "/", query: state.otherQuery });
            state.loading = false;
          })
          .catch(() => {
            state.loading = false;
          });
    } else {
      console.log(errors)
      message.error('验证失败')
    }
  })
}
</script>

<style scoped>

</style>