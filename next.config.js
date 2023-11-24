/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://www.datocms-assets.com/:path*',
          },
        ]
    },
};

module.exports = nextConfig;
