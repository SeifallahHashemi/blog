import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    'http://172.21.0.1:3000',
    'http://172.21.0.1',
    'http://localhost:3000',
  ],
  images: {
    remotePatterns: [
      new URL('https://cdn.sanity.io/images/hxwwxqic/production/**'),
    ],
  },
};

export default nextConfig;
