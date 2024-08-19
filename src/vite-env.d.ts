/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_KEY_COOKIE_SESSION: string
  readonly VITE_APP_BACKEND: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}