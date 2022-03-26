<template>
  <div class="w-full px-0 py-[6px] flex transition-all duration-200">
    <div class="h-8 flex min-w-full max-w-full">
      <div class="flex-grow flex-shrink overflow-hidden relative">
        <div ref="navScroll" class="whitespace-nowrap overflow-hidden">
          <Draggable :list="visitedViews" animation="300" item-key="fullPath" class="flex">
            <template #item="{ element }">
              <div
                  :id="`tag${element.fullPath.split('/').join('\/')}`"
                  :style="{
               color: activeKey === element.path?'#2d8cf0':getBaseColor,
               background: getCardColor,
             }"
                  class="h-8 pt-[6px] px-4 pb-[4px] rounded-[3px] mr-[6px] cursor-pointer inline-block relative flex-shrink-0 flex-grow-0 basis-auto"
              >
                <span class="float-left align-middle">{{ element.meta.title }}</span>
                <n-icon
                    class="h-[22px] w-[21px] -mr-[6px] relative align-middle text-center"
                    style="color: #808695"
                    size="14"
                >
                  <CloseOutlined class="!inline-block !h-[21px]"/>
                </n-icon>
              </div>
            </template>
          </Draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useStore from "@/store";
import Draggable from 'vuedraggable';
import path from "path-browserify";
import {
  DownOutlined,
  ReloadOutlined,
  CloseOutlined,
  ColumnWidthOutlined,
  MinusOutlined,
  LeftOutlined,
  RightOutlined,
} from '@vicons/antd';
import {computed, getCurrentInstance, nextTick, onMounted, ref, watch} from "vue";
import {RouteRecordRaw, useRoute} from "vue-router";
import {TagView} from "@/types";
import {useThemeVars} from "naive-ui";

const {tagsView, permission} = useStore();
const visitedViews = computed<any>(() => tagsView.visitedViews);
const affixTags = ref([]);
const routes = computed<any>(() => permission.routes);
const route = useRoute();
const activeKey = computed(() => route.fullPath)


const themeVars = useThemeVars();

const getCardColor = computed(() => {
  return themeVars.value.cardColor;
});

const getBaseColor = computed(() => {
  return themeVars.value.textColor1;
});
onMounted(() => {
  initTags()
})

watch(route, () => {
  addTags();
  moveToCurrentTag();
});

function filterAffixTags(routes: RouteRecordRaw[], basePath = "/") {
  let tags: TagView[] = [];

  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path);
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: {...route.meta},
      });
    }

    if (route.children) {
      const childTags = filterAffixTags(route.children, route.path);
      if (childTags.length >= 1) {
        tags = tags.concat(childTags);
      }
    }
  });
  return tags;
}

function moveToCurrentTag() {
  const tags = getCurrentInstance()?.refs.tag as any[];
  nextTick(() => {
    if (tags === null || tags === undefined || !Array.isArray(tags)) {
      return;
    }
    for (const tag of tags) {
      if ((tag.to as TagView).path === route.path) {
        // when query is different then update
        if ((tag.to as TagView).fullPath !== route.fullPath) {
          tagsView.updateVisitedView(route);
        }
      }
    }
  });
}

function initTags() {
  const res = filterAffixTags(routes.value) as [];
  affixTags.value = res;
  for (const tag of res) {
    // Must have tag name
    if ((tag as TagView).name) {
      tagsView.addVisitedView(tag);
    }
  }
}

function addTags() {
  if (route.name) {
    tagsView.addView(route);
  }
  return false;
}
</script>

<style scoped>

</style>