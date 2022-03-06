import {createApp} from "vue";
import App from "./App.vue";
// 通用样式
import "./index.css";
// 通用字体
import 'vfonts/Lato.css';
// 等宽字体
import 'vfonts/FiraCode.css';
import router from "@/router";
import {
    // create naive ui
    create,
    // component
    NButton,
    NForm,
    NFormItem,
    NInput,
    NMessageProvider,
} from 'naive-ui'
import {setupStore} from "@/store";

const naive = create({
    components: [NButton, NForm, NFormItem, NInput, NMessageProvider]
})
const app = createApp(App);
setupStore(app)
app
    .use(naive)
    .use(router)
    .mount("#app");
