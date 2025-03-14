/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3001',
  // This ensures that assets are loaded from the correct URL in development
  basePath: '',
};

export default nextConfig;
