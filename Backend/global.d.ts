declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string;
        DB_URI: string;
        JWT_SECRET: string;
      }
    }
  }
  
  export {};
  