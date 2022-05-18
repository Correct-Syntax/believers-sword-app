const isDevelopment = process.env.VUE_APP_DEV ? process.env.VUE_APP_DEV == 'true' : false;
export const url = isDevelopment ? 'http://localhost:8000' : 'https://believers-sword-app.herokuapp.com'