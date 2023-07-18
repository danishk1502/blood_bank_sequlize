declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT?: number;
        PASSWORD:string;
      }
    }
  }
  
  export {}