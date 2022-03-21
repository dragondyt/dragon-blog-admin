<template>
  <div class="w-full px-0 py-[6px] flex transition-all duration-200">
   <div class="h-8 py-[6px] min-w-full max-w-full px-0">
     <Draggable :list="visitedViews" animation="300" item-key="fullPath" class="flex">
       <template #item="{ element }">
         <div
             :id="`tag${element.fullPath.split('/').join('\/')}`"
             class="tabs-card-scroll-item"
         >
           <span>{{ element.meta.title }}</span>
           <n-icon
               size="14"
           >
             <CloseOutlined />
           </n-icon>
         </div>
       </template>
     </Draggable>
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
const { tagsView, permission } = useStore();
const visitedViews = computed<any>(() => tagsView.visitedViews);
const affixTags = ref([]);
const routes = computed<any>(() => permission.routes);
const route = useRoute();
onMounted(()=>{
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
        meta: { ...route.meta },
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