import {createApp} from "vue";
import App from './App.vue'
import router from "@/router";
import { createPinia } from "pinia"
import '@/permission'
import './index.css'
// @ts-ignore
import Prism from 'prismjs';
// @ts-ignore
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
// @ts-ignore
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});
const app = createApp(App)
// 注册全局组件
app
    .use(createPinia())
    .use(VueMarkdownEditor)
    .use(router)
    .mount('#app')
