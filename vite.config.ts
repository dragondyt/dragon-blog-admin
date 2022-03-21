import {ConfigEnv, loadEnv, UserConfig} from "vite"
import vue from "@vitejs/plugin-vue";
import * as path from "path"
import viteCompression from "vite-plugin-compression"
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
export default ({mode}: ConfigEnv): UserConfig => {
    // 获取 .env 环境配置文件
    const env = loadEnv(mode, process.cwd())
    return {
        base: "./",
        plugins: [
            vue(),
            Components({
                resolvers: [NaiveUiResolver()]
            }),
            viteCompression({
                verbose: true,
                disable: false,
                threshold: 10240,
                algorithm: "gzip",
                ext: ".gz",
            }),
        ],
        resolve: {
            alias: {
                "@": path.resolve("./src"),  // @ 代替 src
            }
        },
        //启动服务配置
        // 本地反向代理解决浏览器跨域限制
        server: {
            host: "0.0.0.0",
            port: Number(env.VITE_APP_PORT),
            open: true, // 运行自动打开浏览器
            https:false,
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    target: 'http://localhost:8400',
                    changeOrigin: true,
                    rewrite: path => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
                }
            }
        },
        // 生产环境打包配置
        //去除 console debugger
        build: {
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
        },
    }
}
