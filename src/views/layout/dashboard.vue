<template>
  <v-md-editor v-model="text"></v-md-editor>
</template>
<script lang="ts" setup>
import {ref} from "vue";

const text = ref('')
</script>