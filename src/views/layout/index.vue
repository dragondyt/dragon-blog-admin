<template>
  <n-layout class="layout" :position="fixedMenu" has-sider>
    <n-layout-sider

    >

    </n-layout-sider>
    <RouterView>
      <template #default="{ Component, route }">
        <transition mode="out-in" appear>
          <keep-alive v-if="keepAliveComponents" :include="keepAliveComponents">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component v-else :is="Component" :key="route.fullPath" />
        </transition>
      </template>
    </RouterView>
  </n-layout>
</template>
<script lang="ts" setup>
import {computed, unref} from "vue";
import {useSettingStore} from "@/store/modules/system";
const settingStore = useSettingStore();
const fixedMenu = computed(() => {
  const { fixed } = settingStore;
  return fixed ? 'absolute' : 'static';
});
const keepAliveComponents:Array<string> = []

</script>