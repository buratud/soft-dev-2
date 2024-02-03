const BASE_DOMAIN_WITH_PROTOCOL = process.env.BASE_DOMAIN_WITH_PROTOCOL;
const BASE_SERVER_PATH = process.env.BASE_SERVER_PATH || '/api/markets';
const BASE_WEB_PATH = process.env.BASE_WEB_PATH || '/markets';
exports.PORT = process.env.PORT || 5000;
exports.SUPABASE_URL = process.env.SUPABASE_URL;
exports.SUPABASE_KEY = process.env.SUPABASE_KEY;
exports.BASE_SERVER_PATH = BASE_SERVER_PATH;