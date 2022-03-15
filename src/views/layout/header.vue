<template>
  <div class="flex justify-between items-center p-0 h-16 w-full  z-[11]"
       style="box-shadow: 0 1px 4px #00152914;transition: all .2s ease-in-out;">
    <!--顶部菜单-->
    <div
        class="flex items-center"
        v-if="navMode === 'horizontal' || (navMode === 'horizontal-mix' && mixMenu)"
    >
      <div class="logo" v-if="navMode === 'horizontal'">
        <img src="~@/assets/logo.png" alt=""/>
        <h2 v-show="!collapsed" class="title">NaiveUiAdmin</h2>
      </div>
      <AsideMenu
          v-model:collapsed="collapsed"
          v-model:location="getMenuLocation"
          :inverted="getInverted"
          mode="horizontal"
      />
    </div>
    <!--左侧菜单-->
    <div class="flex items-center" v-else>
      <!-- 菜单收起 -->
      <div
          class="ml-1 w-auto py-0 px-3 inline-block text-center cursor-pointer transition-all"
          @click="() => $emit('update:collapsed', !collapsed)"
      >
        <n-icon size="18" v-if="collapsed">
          <MenuUnfoldOutlined/>
        </n-icon>
        <n-icon size="18" v-else>
          <MenuFoldOutlined/>
        </n-icon>
      </div>
      <!-- 刷新 -->
      <div
          class="mr-1 ml-1 w-auto py-0 px-3 inline-block text-center cursor-pointer transition-all"
          v-if="headerSetting.isReload"
          @click="reloadPage"
      >
        <n-icon size="18">
          <ReloadOutlined/>
        </n-icon>
      </div>
      <!-- 面包屑 -->
      <n-breadcrumb v-if="crumbsSetting.show">
        <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
          <n-breadcrumb-item>
            <n-dropdown
                v-if="routeItem.children.length"
                :options="routeItem.children"
                @select="dropdownSelect"
            >
              <span class="link-text">
                <component
                    v-if="crumbsSetting.showIcon && routeItem.meta.icon"
                    :is="routeItem.meta.icon"
                />
                {{ routeItem.meta.title }}
              </span>
            </n-dropdown>
            <span class="link-text" v-else>
              <component
                  v-if="crumbsSetting.showIcon && routeItem.meta.icon"
                  :is="routeItem.meta.icon"
              />
              {{ routeItem.meta.title }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <div class="flex items-center mr-[20px]">
      <div
          class="w-auto py-0 px-3 inline-block text-center cursor-pointer transition-all"
          v-for="item in iconList"
          :key="item.icon.name"
      >
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component :is="item.icon" v-on="item.eventObject || {}"/>
            </n-icon>
          </template>
          <span>{{ item.tips }}</span>
        </n-tooltip>
      </div>
      <!--切换全屏-->
      <div class="w-auto py-0 px-3 inline-block text-center cursor-pointer transition-all">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component :is="fullscreenIcon" @click="toggleFullScreen"/>
            </n-icon>
          </template>
          <span>全屏</span>
        </n-tooltip>
      </div>
      <!-- 个人中心 -->
      <div class="w-auto py-0 px-3 inline-block text-center cursor-pointer transition-all">
        <n-dropdown trigger="hover" @select="avatarSelect" :options="avatarOptions">
          <div class="avatar">
            <n-avatar round>
              {{ username }}
              <template #icon>
                <UserOutlined/>
              </template>
            </n-avatar>
          </div>
        </n-dropdown>
      </div>
      <!--设置-->
      <div class="w-auto py-0 px-3 inline-block text-center cursor-pointer transition-all" @click="openSetting">
        <n-tooltip placement="bottom-end">
          <template #trigger>
            <n-icon size="18" style="font-weight: bold">
              <SettingOutlined/>
            </n-icon>
          </template>
          <span>项目配置</span>
        </n-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import AsideMenu from "@/views/layout/asideMenu.vue";
import {computed, unref} from "vue";
import {useSettingStore} from "@/store/modules/system";
import {MenuUnfoldOutlined, MenuFoldOutlined, ReloadOutlined, UserOutlined, SettingOutlined} from '@vicons/antd'
import {useRoute, useRouter} from "vue-router";

const props = defineProps<{
  collapsed: boolean
  inverted: boolean
}>()

defineEmits<{
  (e: 'update:collapsed', collapsed: boolean): void
}>()

const {navMode, navTheme, headerSetting, menuSetting, crumbsSetting} = useSettingStore();
const getInverted = computed(() => {
  return ['light', 'header-dark'].includes(navTheme) ? props.inverted : !props.inverted;
});
const getMenuLocation = computed(() => {
  return 'header';
});
const mixMenu = computed(() => {
  return unref(menuSetting).mixMenu;
});
const fullscreenIcon = 'FullscreenOutlined'
const username = 'admin'
const route = useRoute();
const generator: any = (routerMap: any) => {
  return routerMap.map((item: any) => {
    const currentMenu = {
      ...item,
      label: item.meta.title,
      key: item.name,
      disabled: item.path === '/',
    };
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentMenu.children = generator(item.children, currentMenu);
    }
    return currentMenu;
  });
};

const breadcrumbList = computed(() => {
  return generator(route.matched);
});
// 图标列表
const iconList = [
  {
    icon: 'SearchOutlined',
    tips: '搜索',
    eventObject: {
      click: () => {
      },
    },
  },
  {
    icon: 'GithubOutlined',
    tips: 'github',
    eventObject: {
      click: () => window.open('https://github.com/jekip/naive-ui-admin'),
    },
  },
];
const avatarOptions = [
  {
    label: '个人设置',
    key: 1,
  },
  {
    label: '退出登录',
    key: 2,
  },
];
const router = useRouter();
function reloadPage() {
  router.push({
    path: '/redirect' + unref(route).fullPath,
  });
}

function dropdownSelect() {

}

function toggleFullScreen() {

}

function avatarSelect() {

}

function openSetting() {

}
</script>

<style scoped>

</style>