<template>
  <div class="flex justify-center items-center whitespace-nowrap overflow-hidden h-16">
    <img src="~@/assets/logo.png" alt="" class="h-8 w-auto" :class="{ 'mr-2': !collapsed }"/>
    <h2 v-show="!collapsed" class="mb-0">NaiveUiAdmin</h2>
  </div>
</template>

<script lang="ts" setup>
const {collapsed} = defineProps<{
  collapsed: boolean
}>()
</script>

<style scoped>

</style>