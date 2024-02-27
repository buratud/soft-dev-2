const NEXT_PUBLIC_BASE_DOMAIN_WITH_PROTOCOL = process.env.NEXT_PUBLIC_BASE_DOMAIN_WITH_PROTOCOL;
const NEXT_PUBLIC_BASE_WEB_DOMAIN_WITH_PROTOCOL = NEXT_PUBLIC_BASE_DOMAIN_WITH_PROTOCOL || 'http://localhost:3003';
const NEXT_PUBLIC_BASE_API_DOMAIN_WITH_PROTOCOL = NEXT_PUBLIC_BASE_DOMAIN_WITH_PROTOCOL || 'http://localhost:4003';
exports.NEXT_PUBLIC_BASE_WEB_PATH = process.env.NEXT_PUBLIC_BASE_WEB_PATH || '';
exports.NEXT_PUBLIC_BASE_SERVER_PATH = process.env.NEXT_PUBLIC_BASE_SERVER_PATH || '';
exports.NEXT_PUBLIC_BASE_WEB_URL = `${NEXT_PUBLIC_BASE_WEB_DOMAIN_WITH_PROTOCOL}${exports.NEXT_PUBLIC_BASE_WEB_PATH}`;
exports.NEXT_PUBLIC_BASE_API_URL = `${NEXT_PUBLIC_BASE_API_DOMAIN_WITH_PROTOCOL}${exports.NEXT_PUBLIC_BASE_SERVER_PATH}`;
exports.NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
exports.NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
exports.NEXT_PUBLIC_MAIN_URL = 'http://localhost:3000';
exports.NEXT_PUBLIC_MAIN_API_URL = 'http://localhost:4000';
