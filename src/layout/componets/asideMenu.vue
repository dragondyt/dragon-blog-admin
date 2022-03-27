<template>
  <n-menu
      :options="menus"
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

import useStore from "@/store";
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, reactive, ref, toRefs, unref, watch} from "vue";
import {generatorMenu} from "@/utils/menu";
import {MenuOption} from "naive-ui";

defineEmits<{
  (e: 'onUpdate:collapsed', collapsed: boolean): void
}>()

const props = withDefaults(defineProps<{
  collapsed: boolean
  mode?: string
  location?: string
}>(), {
  collapsed: false,
  mode: 'left',
  location: 'vertical'
})
const {permission, setting, app} = useStore();

const route = useRoute()
const router = useRouter();
const menus = ref<any[]>([]);
// 获取当前打开的子菜单
const matched = route.matched;
const selectedKeys = ref<string>(route.name as string);
const headerMenuSelectKey = ref<string>('');
const state = reactive({
  openKeys: matched && matched.length ? matched.map((item) => item.name) : []
})

const getSelectedKeys = computed(() => {
  let location = props.location;
  return unref(selectedKeys);
});

function clickMenuItem(key: string, item: MenuOption) {
  if (/http(s)?:/.test(key)) {
    window.open(key);
  } else {
    router.push({name: key});
  }
}

//展开菜单
function menuExpanded(openKeys: string[]) {
  if (!openKeys) return;
  const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1);
  const isExistChildren = findChildrenLen(latestOpenKey as string);
  state.openKeys = isExistChildren ? (latestOpenKey ? [latestOpenKey] : []) : openKeys;
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

function updateMenu() {
  menus.value = generatorMenu(permission.routes)
}

// 跟随页面路由变化，切换菜单选中状态
watch(
    () => route.fullPath,
    () => {
      updateMenu();
      const matched = route.matched;
      state.openKeys = matched.map((item) => item.name);
      const activeMenu: string = (route.meta?.activeMenu as string) || '';
      selectedKeys.value = activeMenu ? (activeMenu as string) : (route.name as string);
    }
);
const {openKeys} = toRefs(state)
onMounted(() => {
  updateMenu()
})
</script>

<style scoped>

</style>