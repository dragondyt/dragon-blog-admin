<template>
  <n-menu
      :mode="mode"
      :options="menus"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="20"
      :indent="24"
      @update:value="clickMenuItem"
  />
</template>

<script lang="ts" setup>

import useStore from "@/store";
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";
import {generatorMenu} from "@/utils/menu";
import {MenuOption} from "naive-ui";

defineEmits<{
  (e: 'onUpdate:collapsed', collapsed: boolean): void
}>()

withDefaults(defineProps<{
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
const menus = computed(() => {
  return generatorMenu(permission.routes)
})

function clickMenuItem(key: string, item: MenuOption) {
  if (/http(s)?:/.test(key)) {
    window.open(key);
  } else {
    router.push({name: key});
  }
}

</script>

<style scoped>

</style>