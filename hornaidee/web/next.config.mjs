/** @type {import('next').NextConfig} */
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
};

export default nextConfig;
