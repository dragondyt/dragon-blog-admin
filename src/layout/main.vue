<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition :name="getTransitionName" mode="out-in" appear>
        <keep-alive v-if="keepAliveComponents" :include="keepAliveComponents">
          <component :is="Component" :key="route.fullPath"/>
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath"/>
      </transition>
    </template>
  </RouterView>
</template>

<script lang="ts" setup>
import {computed, unref} from "vue";
import {useSettingStore} from "@/store/modules/system";
import {useRouterStore} from "@/store/modules/router";

const props = withDefaults(defineProps<{
  notNeedKey?: boolean
  animate?: boolean
}>(), {
  notNeedKey: false,
  animate: true
})
const {isPageAnimate, pageAnimateType} = useSettingStore()
const getTransitionName = computed(() => {
  return unref(isPageAnimate) ? unref(pageAnimateType) : '';
});

const routerStore = useRouterStore();
// 需要缓存的路由组件
const keepAliveComponents = computed(() => routerStore.keepAliveRouters);
</script>

<style scoped>

</style>