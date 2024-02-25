import {withSentryConfig} from '@sentry/nextjs';
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

export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

// Suppresses source map uploading logs during build
silent: true,
org: "soft-dev-2",
project: "dorms-web",
url: "https://linux-vm-southeastasia-3.southeastasia.cloudapp.azure.com"
}, {
// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Transpiles SDK to be compatible with IE11 (increases bundle size)
transpileClientSDK: true,

// Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors.
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});