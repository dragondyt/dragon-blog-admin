<template>
  <n-layout class="flex flex-row flex-auto" :position="fixedMenu" has-sider>
    <n-layout-sider
        class="h-screen relative z-[13] transition-all ease-in-out"
        v-if="isMixMenuNoneSub && (navMode === 'vertical' || navMode === 'horizontal-mix')"
        show-trigger="bar"
        @collapse="collapsed = true"
        :position="fixedMenu"
        @expand="collapsed = false"
        :collapsed="collapsed"
        collapse-mode="width"
        :collapsed-width="64"
        :width="leftMenuWidth"
        :native-scrollbar="false"
        :inverted="inverted"
    >
      <Logo :collapsed="collapsed"/>
      <AsideMenu v-model:collapsed="collapsed" location="left"/>
    </n-layout-sider>
    <n-layout :inverted="inverted">
      <n-layout-header :inverted="getHeaderInverted" :position="fixedHeader">
        <Header v-model:collapsed="collapsed" :inverted="inverted"/>
      </n-layout-header>
      <n-layout-content class="flex-grow flex-shrink basis-auto max-h-screen" style="background: #f5f7f9"
      >
        <div class="px-[10px] pb-[10px] relative pt-16"
             :class="{
        'pt-16': fixedMulti,
        'pt-0': fixedHeader === 'static',
        }">
          <TabsView v-if="isMultiTabs" v-model:collapsed="collapsed"/>
          <div :class="{
              'pt-[44px]': fixedMulti,
              'pt-0': !isMultiTabs,
              'mt-3': !isMultiTabs,
            }">
            <Main/>
          </div>
        </div>
      </n-layout-content>
      <n-back-top :right="100"/>
    </n-layout>
  </n-layout>
</template>
<script lang="ts" setup>
import {computed, ref, unref} from "vue";
import {useSettingStore} from "@/store/modules/system";
import Main from "@/views/layout/main.vue";
import Logo from "@/views/layout/logo.vue";
import AsideMenu from "@/views/layout/asideMenu.vue";
import Header from "@/views/layout/header.vue";
import TabsView from "@/views/layout/tabsView.vue";

const settingStore = useSettingStore();
const fixedMenu = computed(() => {
  const {fixed} = settingStore;
  return fixed ? 'absolute' : 'static';
});
const fixedMulti = computed(() => {
  return unref(settingStore.multiTabsSetting).fixed;
});
const fixedHeader = computed(() => {
  const {fixed} = unref(settingStore.fixedHeader);
  return fixed ? 'absolute' : 'static';
});
const collapsed = ref<boolean>(false);

const isMixMenuNoneSub = true
const leftMenuWidth = computed(() => {
  const {minMenuWidth, menuWidth} = unref(settingStore.menuSetting);
  return collapsed.value ? minMenuWidth : menuWidth;
});
const {navMode} = settingStore

const inverted = computed(() => {
  return ['dark', 'header-dark'].includes(unref(settingStore.navTheme));
});
const getHeaderInverted = computed(() => {
  const navTheme = unref(settingStore.navTheme);
  return ['light', 'header-dark'].includes(navTheme) ? unref(inverted) : !unref(inverted);
});
const isMultiTabs = computed(() => {
  return unref(settingStore.multiTabsSetting).show;
});const getDarkTheme = false
</script>