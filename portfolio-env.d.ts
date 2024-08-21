declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'staging' | 'production';
    FEATURE_FLAG_HOST: string;
    FEATURE_FLAG_CLIENT_KEY: string;
  }
}
