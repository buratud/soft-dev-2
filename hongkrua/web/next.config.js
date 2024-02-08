/** @type {import('next').NextConfig} */
const { NEXT_PUBLIC_BASE_WEB_PATH } = require('./config.js');
const nextConfig = {
    basePath: NEXT_PUBLIC_BASE_WEB_PATH,
}

module.exports = nextConfig
