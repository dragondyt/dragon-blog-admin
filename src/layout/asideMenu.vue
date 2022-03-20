<template>
  <NMenu
      :options="menus"
      :inverted="inverted"
      :mode="mode"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="20"
      :indent="24"
      :expanded-keys="openKeys"
      :value="getSelectedKeys"
      @update:value="clickMenuItem"
      @update:expanded-keys="menuExpanded"
  />
</template>

<script lang="ts" setup>
import {MenuOption, NMenu} from 'naive-ui'
import {computed, onMounted, reactive, ref, unref, watch} from "vue";
import {useSettingStore} from "@/store/modules/system";
import {useRoute, useRouter} from "vue-router";
import {useRouterStore} from "@/store/modules/router";

const props = withDefaults(defineProps<{
  mode?: "horizontal" | "vertical",
  collapsed?: boolean
  location?: string
}>(), {
  mode: 'vertical',
  location: 'left'
});
const emit = defineEmits<{
  (e: 'update:collapsed', collapsed: boolean): void
}>()
const routerStore = useRouterStore();
// @ts-ignore
const menus: MenuOption[] = routerStore.routerList
const headerMenuSelectKey = ref();
const currentRoute = useRoute();
const router = useRouter();
const selectedKeys = ref<string>(currentRoute.name as string);
const matched = currentRoute.matched;
const openKeys = ref()
const inverted = computed(() => {
  return ['dark', 'header-dark'].includes(useSettingStore().navTheme);
});
const {navMode} = useSettingStore();
const getSelectedKeys = computed(() => {
  let location = props.location;
  return location === 'left' || (location === 'header' && unref(navMode) === 'horizontal')
      ? unref(selectedKeys)
      : unref(headerMenuSelectKey);
});

// 监听分割菜单
watch(
    () => useSettingStore().menuSetting.mixMenu,
    () => {
      updateMenu();
      if (props.collapsed) {
        emit('update:collapsed', !props.collapsed);
      }
    }
);

watch(
    () => currentRoute.fullPath,
    () => {
      updateMenu();
      const matched = currentRoute.matched;
      openKeys.value = matched.map((item) => item.name);
      const activeMenu: string = (currentRoute.meta?.activeMenu as string) || '';
      selectedKeys.value = activeMenu ? (activeMenu as string) : (currentRoute.name as string);
    }
);

function updateMenu() {

}

function clickMenuItem(key: string) {
  if (/http(s)?:/.test(key)) {
    window.open(key);
  } else {
    router.push({name: key});
  }
}

//展开菜单
function menuExpanded(data: string[]) {
  if (!data) return;
  const latestOpenKey = data.find((key) => data.indexOf(key) === -1);
  const isExistChildren = findChildrenLen(latestOpenKey as string);
  openKeys.value = isExistChildren ? (latestOpenKey ? [latestOpenKey] : []) : data;
}

//查找是否存在子路由
function findChildrenLen(key: string) {
  if (!key) return false;
  const subRouteChildren: string[] = [];
  for (const {children, key} of unref(menus)) {
    if (children && children.length) {
      subRouteChildren.push(key as string);
    }
  }
  return subRouteChildren.includes(key);
}


onMounted(() => {
  updateMenu();
});
</script>

<style scoped>

</style>