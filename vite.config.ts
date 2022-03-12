import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue";
import * as path from "path"
// @ts-ignore
import viteCompression from "vite-plugin-compression"

export default defineConfig({
  base: "./",
  plugins: [
    vue(),
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
      "@": path.resolve("./", "src"),
    },
  },
  //启动服务配置
  server: {
    host: "0.0.0.0",
    port: 8000,
    open: true,
    https: false,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8400",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
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
});
