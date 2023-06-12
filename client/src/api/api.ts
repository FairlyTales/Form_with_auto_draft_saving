import PocketBase from 'pocketbase';

const api = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export default api;
