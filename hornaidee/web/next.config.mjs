/** @type {import('next').NextConfig} */
import { NEXT_PUBLIC_BASE_WEB_PATH } from './config.js';

const nextConfig = {
    // Allow host to use images from this server (When dev on local)
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com',
            port: '',
            pathname: '/**',
          },
        ],
    },
    basePath: NEXT_PUBLIC_BASE_WEB_PATH
};

export default nextConfig;
