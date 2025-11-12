declare namespace NodeJS {
  interface ProcessEnv {
    readonly XAI_API_KEY: string;
    readonly TURSO_CONNECTION_URL: string;
    readonly TURSO_AUTH_TOKEN: string;
    readonly BETTER_AUTH_SECRET: string;
    readonly NEXT_PUBLIC_BETTER_AUTH_URL: string;
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
  }
}
