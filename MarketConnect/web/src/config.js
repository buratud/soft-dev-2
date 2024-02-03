const BASE_DOMAIN_WITH_PROTOCOL = process.env.BASE_DOMAIN_WITH_PROTOCOL;
const BASE_SERVER_PATH = process.env.BASE_SERVER_PATH || '/api/markets';
export const BASE_WEB_PATH = process.env.BASE_WEB_PATH || '/markets';
export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
export const BASE_WEB_URL = `${BASE_DOMAIN_WITH_PROTOCOL}${BASE_WEB_PATH}`;
export const BASE_API_URL = `${BASE_DOMAIN_WITH_PROTOCOL}${BASE_SERVER_PATH}`;
