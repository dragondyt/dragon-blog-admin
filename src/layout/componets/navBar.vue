<template>
  <div class="flex justify-between items-center p-0 w-full transition-all duration-200 z-[11] h-16"
       style="box-shadow: 0 1px 4px rgb(0 21 41 / 8%);">
    <!--顶部菜单-->
    <!--左侧菜单-->
    <div class="flex items-center">
      <!-- 菜单收起 -->
      <div
          class="ml-1 inline-block w-16 h-16 text-center cursor-pointer transition-all duration-200 w-auto py-0 px-3"
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
          class="mr-1 inline-block w-16 h-16 text-center cursor-pointer transition-all duration-200 w-auto py-0 px-3"
          @click="() => emit('onUpdate:collapsed', !collapsed)"
      >
        <n-icon size="18">
          <ReloadOutlined/>
        </n-icon>
      </div>
      <!-- 面包屑 -->
      <n-breadcrumb >
        <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
          <n-breadcrumb-item>
            <n-dropdown
                v-if="routeItem.children.length"
                :options="routeItem.children"
            >
              <span class="link-text">
                <component
                    v-if="routeItem.meta.icon"
                    :is="routeItem.meta.icon"
                />
                {{ routeItem.meta.title }}
              </span>
            </n-dropdown>
            <span class="link-text" v-else>
              <component
                  v-if=" routeItem.meta.icon"
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
          class="inline-block w-16 h-16 text-center cursor-pointer transition-all duration-200 w-auto py-0 px-3"
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
      <div
          class="inline-block w-16 h-16 text-center cursor-pointer transition-all duration-200 w-auto py-0 px-3">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component :is="fullscreenIcon"/>
            </n-icon>
          </template>
          <span>全屏</span>
        </n-tooltip>
      </div>
      <!-- 个人中心 -->
      <div
          class="inline-block w-16 h-16 text-center cursor-pointer transition-all duration-200 w-auto py-0 px-3">
        <n-dropdown trigger="hover" @select="avatarSelect" :options="avatarOptions">
          <div class="flex items-center h-16">
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
      <div
          class="inline-block w-16 h-16 text-center cursor-pointer transition-all duration-200 w-auto py-0 px-3">
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
import {computed} from "vue";
import {RouteLocationMatched, useRoute, useRouter} from "vue-router";
import {
  SettingOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  PoweroffOutlined,
  GithubOutlined,
  LockOutlined,
  ReloadOutlined,
  LogoutOutlined,
  UserOutlined,
  CheckOutlined,
} from '@vicons/antd';
import AsideMenu from "@/layout/componets/asideMenu.vue";

const route = useRoute();
const router = useRouter();

defineProps<{
  collapsed: boolean
  inverted: boolean
}>()

const emit = defineEmits<{
  (e: 'onUpdate:collapsed', collapsed: boolean): void
}>()
const generator: any = (routerMap: Array<RouteLocationMatched>) => {
  return routerMap.map((item) => {
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
    icon: SearchOutlined,
    tips: '搜索',
  },
  {
    icon: GithubOutlined,
    tips: 'github',
    eventObject: {
      click: () => window.open('https://github.com/jekip/naive-ui-admin'),
    },
  },
  {
    icon: LockOutlined,
    tips: '锁屏',
    eventObject: {
      // click: () => useLockscreen.setLock(true),
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
const username = ""
const fullscreenIcon = "FullscreenOutlined"
//头像下拉菜单
const avatarSelect = (key: number) => {
  switch (key) {
    case 1:
      router.push({name: 'Setting'});
      break;
    case 2:
      // doLogout();
      break;
  }
};
</script>

<style scoped>

</style>