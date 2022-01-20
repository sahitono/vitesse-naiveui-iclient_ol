/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PMP_APP_TITLE: string
  readonly PMP_AUTH_SERVER_URL: string
  readonly PMP_ISERVER_URL: string
  readonly PMP_GRID_DATA_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
