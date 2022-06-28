
const isDevelopment = process.env.NODE_ENV === 'development';
export const url = isDevelopment ? 'http://127.0.0.1:8000' : 'https://believers-sword-app.herokuapp.com'