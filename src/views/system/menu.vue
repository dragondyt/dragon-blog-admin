<template>
  <div>
    <div>
      <n-card :bordered="false" title="菜单权限管理"/>
    </div>
    <n-grid class="mt-4" cols="1 s:1 m:1 l:3 xl:3 2xl:3" responsive="screen" :x-gap="12">
      <n-gi span="1">
        <n-card :segmented="{ content: 'hard' }" :bordered="false" size="small">
          <template #header>
            <n-space>
              <n-dropdown trigger="hover" @select="selectAddMenu" :options="addMenuOptions">
                <n-button type="info" ghost icon-placement="right">
                  添加菜单
                  <template #icon>
                    <div class="flex items-center">
                      <n-icon size="14">
                        <DownOutlined/>
                      </n-icon>
                    </div>
                  </template>
                </n-button>
              </n-dropdown>
              <n-button type="info" ghost icon-placement="left" @click="packHandle">
                全部{{ expandedKeys.length ? '收起' : '展开' }}
                <template #icon>
                  <div class="flex items-center">
                    <n-icon size="14">
                      <AlignLeftOutlined/>
                    </n-icon>
                  </div>
                </template>
              </n-button>
            </n-space>
          </template>

          <div class="w-full menu">
            <n-input type="input" v-model:value="pattern" placeholder="输入菜单名称搜索">
              <template #suffix>
                <n-icon size="18" class="cursor-pointer">
                  <SearchOutlined/>
                </n-icon>
              </template>
            </n-input>
            <div class="py-3 menu-list">
              <template v-if="loading">
                <div class="flex items-center justify-center py-4">
                  <n-spin size="medium"/>
                </div>
              </template>
              <template v-else>
                <n-tree
                    block-line
                    cascade
                    checkable
                    :virtual-scroll="true"
                    :pattern="pattern"
                    :data="treeData"
                    :expandedKeys="expandedKeys"
                    style="max-height: 650px; overflow: hidden"
                    @update:selected-keys="selectedTree"
                    @update:expanded-keys="onExpandedKeys"
                />
              </template>
            </div>
          </div>
        </n-card>
      </n-gi>
      <n-gi span="2">
        <n-card :segmented="{ content: 'hard' }" :bordered="false" size="small">
          <template #header>
            <n-space>
              <n-icon size="18">
                <FormOutlined/>
              </n-icon>
              <span>编辑菜单{{ treeItemTitle ? `：${treeItemTitle}` : '' }}</span>
            </n-space>
          </template>
          <n-alert type="info" closable> 从菜单列表选择一项后，进行编辑</n-alert>
          <n-form
              :model="formParams"
              :rules="rules"
              ref="formRef"
              label-placement="left"
              :label-width="100"
              v-if="isEditMenu"
              class="py-4"
          >
            <n-form-item label="类型" path="type">
              <span>{{ formParams.type === 1 ? '侧边栏菜单' : '' }}</span>
            </n-form-item>
            <n-form-item label="标题" path="label">
              <n-input placeholder="请输入标题" v-model:value="formParams.label"/>
            </n-form-item>
            <n-form-item label="副标题" path="subtitle">
              <n-input placeholder="请输入副标题" v-model:value="formParams.subtitle"/>
            </n-form-item>
            <n-form-item label="路径" path="path">
              <n-input placeholder="请输入路径" v-model:value="formParams.path"/>
            </n-form-item>
            <n-form-item label="打开方式" path="openType">
              <n-radio-group v-model:value="formParams.openType" name="openType">
                <n-space>
                  <n-radio :value="1">当前窗口</n-radio>
                  <n-radio :value="2">新窗口</n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
            <n-form-item label="菜单权限" path="auth">
              <n-input placeholder="请输入权限，多个权限用，分割" v-model:value="formParams.auth"/>
            </n-form-item>
            <n-form-item path="auth" style="margin-left: 100px">
              <n-space>
                <n-button type="primary" :loading="subLoading" @click="formSubmit"
                >保存修改
                </n-button
                >
                <n-button @click="handleReset">重置</n-button>
              </n-space>
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
import {DownOutlined, AlignLeftOutlined, SearchOutlined, FormOutlined} from '@vicons/antd';
import {computed, onMounted, ref} from "vue";
import {getMenuList} from "@/api/models/menu";

const expandedKeys = []
const treeData = ref([])
const rules = []
const pattern = ''
const loading = ref(true)
const subLoading = false
const isEditMenu = false
const treeItemTitle = ''
const formParams = {}
let treeItemKey = ref([]);

const isAddSon = computed(() => {
  return !treeItemKey.value.length;
});
const addMenuOptions = ref([
  {
    label: '添加顶级菜单',
    key: 'home',
    disabled: false,
  },
  {
    label: '添加子菜单',
    key: 'son',
    disabled: isAddSon,
  },
]);

function selectAddMenu() {

}


function packHandle() {

}

function selectedTree() {

}

function onExpandedKeys() {

}

function formSubmit() {

}

function handleReset() {

}

onMounted(async () => {
  const treeMenuList = await getMenuList();
  treeData.value = treeMenuList as any;
  loading.value = false;
})
</script>
