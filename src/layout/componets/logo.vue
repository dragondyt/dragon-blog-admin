<template>
  <div class="flex items-center justify-center h-16 leading-[4rem] overflow-hidden whitespace-nowrap"
       :class="{ 'mr-2': !collapsed }">
    <img class="w-auto h-8" src="~@/assets/images/logo.webp" alt=""/>
    <h2 class="mb-0" v-show="!collapsed">NaiveUiAdmin</h2></div>
</template>

<script lang="ts" setup>
defineProps<{
  collapsed: boolean
}>()
</script>