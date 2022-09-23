/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BASE_API: string;
  readonly VITE_ASSETS_API: string;
  readonly VITE_ASSETS_ICONS: string;
  readonly VITE_EXCHANGE_RATES: string;
  readonly VITE_API_KEY: string;

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
