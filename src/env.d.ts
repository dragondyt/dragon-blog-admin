/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}


interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_BASE_API: string
  readonly VITE_CLI_PORT: number
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
