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
import {MenuOption, NIcon, NMenu} from 'naive-ui'
import {Component, computed, h, onMounted, reactive, ref, unref} from "vue";
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
defineEmits<{
  (e: 'update:collapsed', num: number): void
}>()
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, {default: () => h(icon)})
}

const menus: MenuOption[] = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(BookIcon),
    disabled: true
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon(PersonIcon)
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(WineIcon),
        children: [
          {
            label: '威士忌',
            key: 'whisky'
          }
        ]
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich'
          }
        ]
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]
const headerMenuSelectKey = ref();
const currentRoute = useRoute();
const router = useRouter();
const selectedKeys = ref<string>(currentRoute.name as string);
const matched = currentRoute.matched;
const getOpenKeys = matched && matched.length ? matched.map((item) => item.name) : [];
const openKeys = reactive([])
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
function menuExpanded(openKeys: string[]) {

}

onMounted(() => {
  updateMenu();
});
</script>

<style scoped>

</style>