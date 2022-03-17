<template>
  <v-md-editor v-model="text" height="600px"></v-md-editor>
</template>
<script lang="ts" setup>
import {ref} from "vue";

const text = ref('')
</script>