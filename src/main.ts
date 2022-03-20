import {createApp} from "vue";
import App from "./App.vue";
// 通用样式
import "./index.css";
// 通用字体
import 'vfonts/Lato.css';
// 等宽字体
import 'vfonts/FiraCode.css';
import router from "@/router";
import './permission'
import {
    // create naive ui
    create,
    // component
    NButton,
    NForm,
    NFormItem,
    NInput,
    NIcon,
    NMessageProvider,
    NLayout,
    NLayoutSider,
    NMenu,
    NLayoutHeader,
    NLayoutContent,
    NBackTop,
    NCard,
    NGrid,
    NGi,
    NTree,
    NRadioGroup,
    NRadio,
    NAlert,
    NSpin,
    NSpace,
    NDropdown,
    NBreadcrumb,
    NBreadcrumbItem,
    NTooltip,
    NAvatar,
    NModal,
    NDynamicTags,
    NCheckbox,
    NDataTable, NDialogProvider, NEmpty,
} from 'naive-ui'
import {setupStore} from "@/store";

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

const naive = create({
    components: [NButton, NForm, NFormItem, NInput, NMessageProvider, NIcon,
        NLayout, NLayoutSider, NLayoutHeader, NLayoutContent, NBackTop,
        NMenu, NCard, NGrid, NGi, NTree, NRadioGroup, NRadio, NAlert,NDialogProvider,NEmpty, NSpin, NSpace,NCheckbox,NDataTable, NDropdown, NBreadcrumb, NModal,NDynamicTags, NBreadcrumbItem, NTooltip, NAvatar]
})
const app = createApp(App);
setupStore(app)
app
    .use(VueMarkdownEditor)
    .use(naive)
    .use(router)
    .mount("#app");
