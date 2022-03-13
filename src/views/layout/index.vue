<template>
  <n-layout class="layout" :position="fixedMenu" has-sider>
    <n-layout-sider>
      <Logo :collapsed="collapsed"/>
      <AsideMenu :collapsed="collapsed"/>
    </n-layout-sider>
    <n-layout :inverted="inverted">
      <n-layout-header :inverted="getHeaderInverted" :position="fixedHeader">
        <Header :collapsed="collapsed" :inverted="inverted"/>
      </n-layout-header>
      <n-layout-content>
        <Main/>
      </n-layout-content>
      <n-back-top :right="100"/>
    </n-layout>
  </n-layout>
</template>
<script lang="ts" setup>
import {computed, unref} from "vue";
import {useSettingStore} from "@/store/modules/system";
import Main from "@/views/layout/main.vue";
import Logo from "@/views/layout/logo.vue";
import AsideMenu from "@/views/layout/asideMenu.vue";
import Header from "@/views/layout/header.vue";

const settingStore = useSettingStore();
const fixedMenu = computed(() => {
  const {fixed} = settingStore;
  return fixed ? 'absolute' : 'static';
});
const fixedHeader = computed(() => {
  const {fixed} = unref(settingStore.fixedHeader);
  return fixed ? 'absolute' : 'static';
});
const collapsed = false
const inverted = computed(() => {
  return ['dark', 'header-dark'].includes(unref(settingStore.navTheme));
});
const getHeaderInverted = computed(() => {
  const navTheme = unref(settingStore.navTheme);
  return ['light', 'header-dark'].includes(navTheme) ? unref(inverted) : !unref(inverted);
});
</script>