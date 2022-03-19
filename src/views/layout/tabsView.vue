<template>
  <div
      class="w-full px-0 py-[6px] flex transition-all ease-in-out t"
      :class="{
      'fixed z-[5] py-[6px] pl-[10px] pr-[19px] left-[200px]': multiTabsSetting.fixed,
      'top-0': isMultiHeaderFixed,
      'tabs-view-default-background': getDarkTheme === false,
      'tabs-view-dark-background': getDarkTheme === true,
    }"
      :style="getChangeStyle"
  >
    <div class="h-8 flex min-w-full max-w-full">
      <div ref="navWrap" class="flex-grow flex-shrink overflow-hidden relative"
           :class="{ 'overflow-hidden py-0 px-8': scrollable }">
        <span
            class="w-8 text-center absolute cursor-pointer leading-8 "
            :class="{ 'hidden': !scrollable }"
            @click="scrollPrev"
        >
          <n-icon size="16" color="#515a6e">
            <LeftOutlined/>
          </n-icon>
        </span>
        <span
            class="w-8 text-center absolute cursor-pointer leading-8"
            :class="{ 'hidden': !scrollable }"
            @click="scrollNext"
        >
          <n-icon size="16" color="#515a6e">
            <RightOutlined/>
          </n-icon>
        </span>
        <div ref="navScroll" class="whitespace-nowrap overflow-hidden">
          <Draggable :list="tabsList" animation="300" item-key="fullPath" class="flex">
            <template #item="{ element }">
              <div
                  :id="`tag${element.fullPath.split('/').join('\/')}`"
                  class="h-8 pt-[6px] pb-[4px] px-4 rounded-[3px] mr-[6px] cursor-pointer inline-block relative flex-grow-0 flex-shrink-0 basis-auto"
                  :class="{ 'active-item': activeKey === element.path }"
                  @click.stop="goPage(element)"
                  @contextmenu="handleContextMenu($event, element)"
              >
                <span class="float-left align-middle">{{ element.meta.title }}</span>
                <n-icon
                    class="h-[22px] w-[21px] mr-[-6px] relative align-middle text-center"
                    size="14"
                    @click.stop="closeTabItem(element)"
                    v-if="element.path !== baseHome"
                >
                  <CloseOutlined/>
                </n-icon>
              </div>
            </template>
          </Draggable>
        </div>
      </div>
      <div class="min-w-8 w-8 h-8 leading-8 text-center rounded-[2px] cursor-pointer">
        <n-dropdown
            trigger="hover"
            @select="closeHandleSelect"
            placement="bottom-end"
            :options="TabsMenuOptions"
        >
          <div class="h-full flex items-center justify-center">
            <n-icon size="16" color="#515a6e">
              <DownOutlined/>
            </n-icon>
          </div>
        </n-dropdown>
      </div>
      <n-dropdown
          :show="showDropdown"
          :x="dropdownX"
          :y="dropdownY"
          @clickoutside="onClickOutside"
          placement="bottom-start"
          @select="closeHandleSelect"
          :options="TabsMenuOptions"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import {useSettingStore} from "@/store/modules/system";
import {
  DownOutlined,
  ReloadOutlined,
  CloseOutlined,
  ColumnWidthOutlined,
  MinusOutlined,
  LeftOutlined,
  RightOutlined,
} from '@vicons/antd';

import Draggable from 'vuedraggable'
import {computed, reactive, ref, unref} from "vue";
import {RouteLocationNormalizedLoaded, useRoute, useRouter} from "vue-router";
import {useAppStore} from "@/store/modules/app";
import {RouteItem} from "@/types";
import {renderIcon} from "@/utils/asyncRouter";
import Cookies from 'js-cookie'
import {useMessage} from "naive-ui";

const props = defineProps<{
  collapsed: boolean
}>()
const isMultiHeaderFixed = ref(false)
const scrollable = ref(false)
const showDropdown = ref(false)
const isCurrent = ref(false);
const settingStore = useSettingStore()
const navScroll: any = ref(null);
const {multiTabsSetting, navMode, menuSetting} = settingStore

const isMixMenuNoneSub = computed(() => {
  const mixMenu = settingStore.menuSetting.mixMenu;
  const currentRoute = useRoute();
  if (unref(navMode) != 'horizontal-mix') return true;
  return !(unref(navMode) === 'horizontal-mix' && mixMenu && currentRoute.meta.isRoot);
});

//动态组装样式 菜单缩进
const getChangeStyle = computed(() => {
  const {collapsed} = props;
  const {minMenuWidth, menuWidth}: any = unref(menuSetting);
  const {fixed}: any = unref(multiTabsSetting);
  let lenNum =
      navMode === 'horizontal' || !isMixMenuNoneSub.value
          ? '0px'
          : collapsed
              ? `${minMenuWidth}px`
              : `${menuWidth}px`;
  return {
    left: lenNum,
    width: `calc(100% - ${!fixed ? '0px' : lenNum})`,
  };
});
const getDarkTheme = false


// 获取简易的路由对象
const getSimpleRoute = (route: RouteLocationNormalizedLoaded): RouteItem => {
  const {fullPath, hash, meta, name, params, path, query} = route;
  return {fullPath, hash, meta, name, params, path, query};
};
const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
let cacheRoutes: RouteItem[] = [];
const simpleRoute = getSimpleRoute(route);
try {
  const routesStr = Cookies.get("tabs");
  cacheRoutes = routesStr ? JSON.parse(routesStr) : [simpleRoute];
} catch (e) {
  cacheRoutes = [simpleRoute];
}

// 将最新的路由信息同步到 localStorage 中
const routes = router.getRoutes();
cacheRoutes.forEach((cacheRoute) => {
  const route = routes.find((route) => route.path === cacheRoute.path);
  if (route) {
    cacheRoute.meta = route.meta || cacheRoute.meta;
    cacheRoute.name = (route.name || cacheRoute.name) as string;
  }
});

// 初始化标签页
appStore.initTabs(cacheRoutes);
// 标签页列表
const tabsList = computed(() => appStore.tabsList);
//tags 右侧下拉菜单
const TabsMenuOptions = computed(() => {
  const isDisabled = unref(tabsList).length <= 1;
  return [
    {
      label: '刷新当前',
      key: '1',
      icon: renderIcon(ReloadOutlined),
    },
    {
      label: `关闭当前`,
      key: '2',
      disabled: unref(isCurrent) || isDisabled,
      icon: renderIcon(CloseOutlined),
    },
    {
      label: '关闭其他',
      key: '3',
      disabled: isDisabled,
      icon: renderIcon(ColumnWidthOutlined),
    },
    {
      label: '关闭全部',
      key: '4',
      disabled: isDisabled,
      icon: renderIcon(MinusOutlined),
    },
  ];
});

const activeKey = ref(route.fullPath)
const baseHome = ''
const dropdownX = 0
const dropdownY = 0
const message = useMessage()


function goPage(e: RouteItem) {
  const {fullPath} = e;
  if (fullPath === route.fullPath) return;
  activeKey.value = fullPath;
  router.push({path: fullPath});
}

function handleContextMenu($event: any, element: RouteItem) {

}

// 关闭当前页面
const removeTab = (route: RouteItem) => {
  if (tabsList.value.length === 1) {
    return message.warning('这已经是最后一页，不能再关闭了！');
  }
}

function closeTabItem(e: RouteItem) {
  const {fullPath} = e;
  const routeInfo = tabsList.value.find((item) => item.fullPath == fullPath) as RouteItem;
  removeTab(routeInfo);
}

function closeHandleSelect() {

}

function onClickOutside() {

}

/**
 * @param value 要滚动到的位置
 * @param amplitude 每次滚动的长度
 */
function scrollTo(value: number, amplitude: number): number {
  const currentScroll = navScroll.value.scrollLeft;
  const scrollWidth =
      (amplitude > 0 && currentScroll + amplitude >= value) ||
      (amplitude < 0 && currentScroll + amplitude <= value)
          ? value
          : currentScroll + amplitude;
  navScroll.value && navScroll.value.scrollTo(scrollWidth, 0);
  if (scrollWidth === value) return 0;
  return window.requestAnimationFrame(() => scrollTo(value, amplitude));
}

function scrollPrev() {
  const containerWidth = navScroll.value.offsetWidth;
  const currentScroll = navScroll.value.scrollLeft;

  if (!currentScroll) return;
  const scrollLeft = currentScroll > containerWidth ? currentScroll - containerWidth : 0;
  scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
}

function scrollNext() {
  const containerWidth = navScroll.value.offsetWidth;
  const navWidth = navScroll.value.scrollWidth;
  const currentScroll = navScroll.value.scrollLeft;

  if (navWidth - currentScroll <= containerWidth) return;
  const scrollLeft =
      navWidth - currentScroll > containerWidth * 2
          ? currentScroll + containerWidth
          : navWidth - containerWidth;
  scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
}
</script>
<style scoped>
.tabs-view-default-background {
  background: #f5f7f9;
}

.tabs-view-dark-background {
  background: #101014;
}

</style>