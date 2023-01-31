/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly CAPI_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
