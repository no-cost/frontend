/// <reference types="vite/client" />

// re-export missing type from vue-turnstile (upstream bug), so TS is happy
declare module 'vue-turnstile' {
  export interface VueTurnstileData {
    resetTimeout?: ReturnType<typeof setTimeout>
    widgetId?: string
  }
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_TURNSTILE_SITE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
