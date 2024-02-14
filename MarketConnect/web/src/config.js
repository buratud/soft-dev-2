const REACT_APP_BASE_DOMAIN_WITH_PROTOCOL = process.env.REACT_APP_BASE_DOMAIN_WITH_PROTOCOL;
const REACT_APP_BASE_WEB_DOMAIN_WITH_PROTOCOL = REACT_APP_BASE_DOMAIN_WITH_PROTOCOL || 'http://localhost:3001';
const REACT_APP_BASE_API_DOMAIN_WITH_PROTOCOL = REACT_APP_BASE_DOMAIN_WITH_PROTOCOL || 'http://localhost:4001';
export const REACT_APP_BASE_WEB_PATH = process.env.REACT_APP_BASE_WEB_PATH || '';
export const REACT_APP_BASE_SERVER_PATH = process.env.REACT_APP_BASE_SERVER_PATH || '';
export const REACT_APP_BASE_WEB_URL = `${REACT_APP_BASE_WEB_DOMAIN_WITH_PROTOCOL}${REACT_APP_BASE_WEB_PATH}`;
export const REACT_APP_BASE_API_URL = `${REACT_APP_BASE_API_DOMAIN_WITH_PROTOCOL}${REACT_APP_BASE_SERVER_PATH}`;
export const REACT_APP_SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
export const REACT_APP_SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
export const REACT_APP_MAIN_URL = process.env.REACT_APP_MAIN_URL || 'http://localhost:3000';

//อันเก่าโว้ย
// export const baseApiUrl = 'http://localhost:5200';
// export const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// export const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
// export const baseWebUrl = 'http://localhost:3000';
