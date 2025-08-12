/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    browser: true,
    es6: true,
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  async headers() {
    return [
      {
        // Serve apple-app-site-association with correct headers
        source: '/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        // Serve assetlinks.json with correct headers
        source: '/.well-known/assetlinks.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/apple-app-site-association',
        destination: '/apple-app-site-association',
      },
    ];
  },
};

module.exports = nextConfig;