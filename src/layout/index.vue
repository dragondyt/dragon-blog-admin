<template>
  <n-layout class="flex flex-row flex-auto" :position="fixedMenu" has-sider>
    <n-layout-sider
        class="min-h-screen !relative z-[13] transition-all"
        show-trigger="bar"
        @collapse="collapsed = true"
        :position="fixedMenu"
        @expand="collapsed = false"
        :collapsed="collapsed"
        :width="leftMenuWidth"
        collapse-mode="width"
        :collapsed-width="64"
        :native-scrollbar="false">
      <Logo :collapsed="collapsed"/>
      <aside-menu v-model:collapsed="collapsed"/>
    </n-layout-sider>
    <n-layout>
      <n-layout-header  :position="fixedHeader">
        <nav-bar v-model:collapsed="collapsed" inverted/>
      </n-layout-header>
      <n-layout-content class="flex-auto min-h-screen">
       <div class="mx-2.5 mb-2.5 pt-16">
         <tags-view/>
         <div class="">
           <router-view/>
         </div>
       </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import AsideMenu from "./componets/asideMenu.vue";
import Logo from "@/layout/componets/logo.vue";
import {computed, ref} from "vue";
import TagsView from "@/layout/componets/tagsView.vue";
import NavBar from "@/layout/componets/navBar.vue";
const collapsed = ref<boolean>(false);
const fixedMenu = 'absolute'
const fixedHeader = 'absolute'
const leftMenuWidth = computed(() => {
  return collapsed.value ? 64 : 200;
});
</script>

<style scoped>
.n-layout-header.n-layout-header--absolute-positioned {
  z-index: 11;
}
</style>