declare namespace NodeJS {
  interface ProcessEnv {
    readonly XAI_API_KEY: string;
    readonly TURSO_CONNECTION_URL: string;
    readonly TURSO_AUTH_TOKEN: string;
  }
}
