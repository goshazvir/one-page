export const apiSimulator = {
  post: (endpoint: string, data: unknown): void => {
    console.log(`POST http://api${endpoint}`, data);
  },

  get: (endpoint: string): void => {
    console.log(`GET http://api${endpoint}`);
  },

  put: (endpoint: string, data: unknown): void => {
    console.log(`PUT http://api${endpoint}`, data);
  },

  delete: (endpoint: string): void => {
    console.log(`DELETE http://api${endpoint}`);
  },
};
